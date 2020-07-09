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

function Connect-SP($Url) {
    if ($CurrentCredentials.IsPresent) {
        Connect-PnPOnline -Url $Url -CurrentCredentials
    }
    elseif ($UseWebLogin.IsPresent) {
        Connect-PnPOnline -Url $Url -UseWebLogin
    }
    elseif ($GenericCredential -ne $null) {
        Connect-PnPOnline -Url $Url -Credentials $GenericCredential
    }
    else {
        Connect-PnPOnline -Url $Url
    }
}

Connect-SP $Url

$LoginName = Get-PnPUser | Where-Object { $_.LoginName -like "*spo-grid-all-users*" } | Select-Object -ExpandProperty LoginName
if ($null -eq $LoginName) {
    Write-Host "Cannot find user principal. Please ensure user 'Everyone but external users'." -ForegroundColor Yellow
    exit 0
}
$Ctx = Get-PnPContext
$Webs = (Get-PnPWeb).Webs
$Ctx.Load($Webs)
$Ctx.ExecuteQuery()

foreach ($Web in $Webs) {
    Connect-SP $Web.Url
    Write-Host "Adding Everyone but external users to AssociatedVisitorGroup for $($web.Title)"
    New-PnPUser -LoginName $LoginName -ErrorAction SilentlyContinue | Out-Null
    $Group = Get-PnPGroup -AssociatedVisitorGroup
    Add-PnPUserToGroup -LoginName $LoginName -Identity $Group -Web $Web -ErrorAction SilentlyContinue
    Disconnect-PnPOnline
}
