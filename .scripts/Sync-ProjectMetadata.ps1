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

Connect-PnPOnline $Url

$ProjectList = Get-PnPList -Identity "Prosjekter"
$FieldsToSync = Get-PnPField -List "Prosjekter" | ? {$_.InternalName.IndexOf("Gt") -eq 0}
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
    $ProjectItem = Get-PnPListItem -List "Prosjekter" -Query "<View><Query><Where><Eq><FieldRef Name='ProjectWebUniqueId'/><Value Type='Text'>$ProjectWebUniqueId</Value></Eq></Where></Query></View>"

    if ($ProjectItem -eq $null) {
        $ProjectItem = Add-PnPListItem -List $ProjectList
        $ProjectItem["ProjectWebUniqueId"] = $ProjectWebUniqueId
    }
    if ($ProjectPage["GtProjectPhase"] -ne $null -and $ProjectPage["GtProjectPhase"].Count -eq 1) {
        $ProjectItem["GtProjectPhaseChoice"] = $ProjectPage["GtProjectPhase"].Label
    }
    $ProjectItem["Title"] = $ProjectTitle
    $ProjectItem.Update()

    $FieldsToSync | ? {$_.FieldTypeKind -ne "Invalid"} | % {
        if ($_.InternalName -eq "GtProjectUrl") {
            $ProjectItem["GtProjectUrl"] = "$ProjectUrl, $ProjectTitle"
        } else {
            $ProjectItem[$_.InternalName] = $ProjectPage[$_.InternalName]
        }
    }
    $ProjectItem.Update()

    $FieldsToSync | ? {$_.FieldTypeKind -eq "Invalid"} | % {
        if ($ProjectPage[$_.InternalName] -ne $null -and $ProjectPage[$_.InternalName].Count -gt 1) {
            $Terms = @{}
            $ProjectPage[$_.InternalName] | % {$Terms.Add($_.TermGuid, $_.Label)}
            Set-PnPTaxonomyFieldValue -ListItem $ProjectItem -InternalFieldName $_.InternalName -Terms $Terms
        } elseif ($ProjectPage[$_.InternalName] -ne $null -and $ProjectPage[$_.InternalName].Count -eq 1) {
            Set-PnPTaxonomyFieldValue -ListItem $ProjectItem -InternalFieldName $_.InternalName -TermId $ProjectPage[$_.InternalName].TermGuid
        }
    }
    $ProjectItem.Update()

    Execute-PnPQuery
}
Disconnect-PnPOnline