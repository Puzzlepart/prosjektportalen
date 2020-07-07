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

foreach($web in (Get-PnPSubwebs)) {
    Add-PnPUserToGroup -LoginName "" -Identity $web.Assoc
}

Disconnect-PnPOnline