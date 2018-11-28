Param(
    [Parameter(Mandatory = $true)]
    [string]$Url,
    [Parameter(Mandatory = $false, HelpMessage = "Use current credentials?")]
    [switch]$CurrentCredentials,
    [Parameter(Mandatory = $false, HelpMessage = "Use Web Login?")]
    [switch]$UseWebLogin,
    [Parameter(Mandatory = $false, HelpMessage = "Stored credential from Windows Credential Manager")]
    [string]$GenericCredential
)

if ($CurrentCredentials.IsPresent) {
    Connect-PnPOnline -Url $Url -CurrentCredentials
} elseif ($UseWebLogin.IsPresent) {
    Connect-PnPOnline -Url $Url -UseWebLogin
} elseif ($GenericCredential -ne $null) {
    Connect-PnPOnline -Url $Url -Credentials $GenericCredential
} else {
    Connect-PnPOnline -Url $Url
}


Get-PnPSubWebs | ForEach-Object {
    $ProjectWeb = Get-PnPWeb -Identity $_.Id
    $ProjectUrl = $ProjectWeb.ServerRelativeUrl
    $ProjectTitle = $ProjectWeb.Title

    Write-Output  "Processing subweb $ProjectTitle"
    $ResourceAllocation = Get-PnPList -Identity "Ressursallokering" -Web $ProjectWeb
    if ($null -eq $ResourceAllocation) {
        New-PnPList -Title "Ressursallokering" -Template GenericList -Url "Lists/Ressursallokering" -EnableVersioning -Web $ProjectWeb
        $ResourceAllocation = Get-PnPList -Identity "Ressursallokering" -Web $ProjectWeb
	}
	$ItemContentType = Get-PnPContentType -Identity "0x01" -InSiteHierarchy -Web $ProjectWeb
	$ResourceAllocationContentType = Get-PnPContentType -Identity "0x010088578E7470CC4AA68D5663464831070209" -InSiteHierarchy -Web $ProjectWeb
	
	Add-PnPContentTypeToList -List $ResourceAllocation -ContentType $ResourceAllocationContentType -DefaultContentType -Web $ProjectWeb
	Remove-PnPContentTypeFromList -List $ResourceAllocation -ContentType $ItemContentType -Web $ProjectWeb

	$ViewFields = @("GtResourceUser", "GtResourceRole", "GtStartDate", "GtEndDate", "GtResourceLoad", "GtResourceAbsenceComment", "Modified")
	$DefaultView = $ResourceAllocation.DefaultView
	$DefaultView.ViewFields.RemoveAll()
	$ViewFields | % { $DefaultView.ViewFields.Add($_)}        
	$DefaultView.Update()
	$DefaultView.Context.ExecuteQuery()
	$ResourceAllocation.ContentTypesEnabled = $false
	$ResourceAllocation.OnQuickLaunch = $true
	$ResourceAllocation.Update()
	Invoke-PnPQuery
}
Disconnect-PnPOnline