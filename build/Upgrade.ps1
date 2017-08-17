<#

.SYNOPSIS
This script will upgrade Prosjektportalen

.DESCRIPTION
Use the required -Url param to specify the target site collection

.EXAMPLE
./Upgrade.ps1 -Url https://puzzlepart.sharepoint.com/sites/prosjektportalen

.LINK
https://github.com/Puzzlepart/prosjektportalen

#>


Param(
    [Parameter(Mandatory = $true, HelpMessage = "Where do you want to install the Project Portal?")]
    [string]$Url,
    [Parameter(Mandatory = $false, HelpMessage = "Stored credential from Windows Credential Manager")]
    [string]$GenericCredential,
    [Parameter(Mandatory = $false, HelpMessage = "Do you want to handle PnP libraries and PnP PowerShell without using bundled files?")]
    [switch]$SkipLoadingBundle,
    [Parameter(Mandatory = $false, HelpMessage = "Use Web Login to connect to SharePoint. Useful for e.g. ADFS environments.")]
    [switch]$UseWebLogin,
    [Parameter(Mandatory = $false, HelpMessage = "Use the credentials of the current user to connect to SharePoint. Useful e.g. if you install directly from the server.")]
    [switch]$CurrentCredentials,
    [Parameter(Mandatory = $false, HelpMessage = "Installation Environment. If SkipLoadingBundle is set, this will be ignored")]
    [ValidateSet('SharePointPnPPowerShell2013','SharePointPnPPowerShell2016','SharePointPnPPowerShellOnline')]
    [string]$Environment = "SharePointPnPPowerShellOnline"
)

if (-not $GenericCredential -and -not $UseWebLogin.IsPresent) {
    $Credential = (Get-Credential -Message "Please enter your username and password")
} elseif (-not $UseWebLogin.IsPresent) {
    $Credential = $GenericCredential
}


function Connect-SharePoint ($Url) {
    if ($UseWebLogin.IsPresent) {
        Connect-PnPOnline $Url -UseWebLogin
    } elseif ($CurrentCredentials.IsPresent) {
        Connect-PnPOnline $Url -CurrentCredentials
    } else {
        Connect-PnPOnline $Url -Credentials $Credential
    }
}

Connect-SharePoint -Url $Url
$CurrentVersion = (Get-PnPPropertyBag -Key pp_version)

Write-Host "############################################################################" -ForegroundColor Green
Write-Host "" -ForegroundColor Green
Write-Host "Upgrading Prosjektportalen from version $($CurrentVersion) to [version]" -ForegroundColor Green
Write-Host "Maintained by Puzzlepart @ https://github.com/Puzzlepart/prosjektportalen" -ForegroundColor Green
Write-Host "" -ForegroundColor Green
Write-Host "Upgrade URL:`t`t$Url" -ForegroundColor Green
Write-Host "" -ForegroundColor Green
Write-Host "############################################################################" -ForegroundColor Green
