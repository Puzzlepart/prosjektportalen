Param(
    [Parameter(Mandatory = $true)]
    [string]$Url,
    [Parameter(Mandatory = $true)]
    [int]$IntervalHours,
    [Parameter(Mandatory = $false, HelpMessage = "Use current credentials?")]
    [switch]$CurrentCredentials,
    [Parameter(Mandatory = $false, HelpMessage = "Stored credential from Windows Credential Manager")]
    [string]$GenericCredential
)

if ($CurrentCredentials.IsPresent) {
    Connect-PnPOnline -Url $Url -CurrentCredentials
} elseif ($GenericCredential -ne $null) {
    Connect-PnPOnline -Url $Url -Credentials $GenericCredential
} else {
    Connect-PnPOnline -Url $Url
}
$ProjectList = Get-PnPList -Identity "Prosjektdatoer"
if ($ProjectList -eq $null) {
    New-PnPList -Title "Prosjektdatoer" -Template TasksWithTimelineAndHierarchy -EnableVersioning
    $ProjectList = Get-PnPList -Identity "Prosjektdatoer"
    $titleField = $ProjectList.Fields.GetByInternalNameOrTitle("Title")
    $titleField.Title = "Prosjektnavn"
    $titleField.Update()

    $ProjectUniqiueId = Get-PnPField -Identity "ProjectWebUniqueId"
    $ProjectList.Fields.Add($ProjectUniqiueId)
    $ProjectPhase = Get-PnPField -Identity "GtProjectPhaseChoice"
    $ProjectList.Fields.Add($ProjectPhase)
    
    $DefaultView = $ProjectList.Views.GetByTitle("Alle oppgaver")
    $DefaultView.Title = "Alle prosjekter"
    $DefaultView.ViewFields.RemoveAll()
    $DefaultView.ViewFields.Add("LinkTitle")
    $DefaultView.ViewFields.Add("StartDate")
    $DefaultView.ViewFields.Add("DueDate")
    $DefaultView.ViewFields.Add("GtProjectPhaseChoice")
    $DefaultView.ViewFields.Add("Modified")
    $DefaultView.Update()

    $ProjectList.Update()

    Execute-PnPQuery
}
$DateTimeFromWhenToUpdateProjects = (Get-Date).AddHours(-$IntervalHours).ToUniversalTime()
$DateTimeFromWhenToUpdateProjectsFriendly = $DateTimeFromWhenToUpdateProjects.ToLocalTime().ToString()

Write-Output "Updating webs modified after $DateTimeFromWhenToUpdateProjectsFriendly"
Get-PnPSubWebs | ? {$_.LastItemModifiedDate.ToUniversalTime() -ge $DateTimeFromWhenToUpdateProjects} | % {
    $ProjectWeb = Get-PnPWeb -Identity $_.Id
    $ProjectWebUniqueId = $ProjectWeb.Id
    $ProjectUrl = $ProjectWeb.ServerRelativeUrl
    $ProjectTitle = $ProjectWeb.Title

    Write-Output  "Processing subweb $ProjectTitle"

    $ProjectPage = Get-PnPListItem -List "Områdesider" -Id 3 -Web $ProjectWeb
    $ProjectItem = Get-PnPListItem -List "Prosjektdatoer" -Query "<View><Query><Where><Eq><FieldRef Name='ProjectWebUniqueId'/><Value Type='Text'>$ProjectWebUniqueId</Value></Eq></Where></Query></View>"

    if ($ProjectItem -eq $null) {
        $ProjectItem = Add-PnPListItem -List $ProjectList
        $ProjectItem["ProjectWebUniqueId"] = $ProjectWebUniqueId
    }
    $ProjectItem["Title"] = $ProjectTitle
    $ProjectItem["StartDate"] = $ProjectPage["GtStartDate"]
    $ProjectItem["DueDate"] = $ProjectPage["GtEndDate"]
    if ($ProjectPage["GtProjectPhase"] -ne $null -and $ProjectPage["GtProjectPhase"].Count -eq 1) {
        $PhaseLabel = $ProjectPage["GtProjectPhase"].Label
        $ProjectItem["GtProjectPhaseChoice"] = $PhaseLabel
        $ProjectItem["Title"] = "$ProjectTitle ($PhaseLabel)"
    }
    $ProjectItem.Update()

    Execute-PnPQuery
}
Disconnect-PnPOnline