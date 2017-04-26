<#

.SYNOPSIS
This script will install Prosjektportalen to a site collection

.DESCRIPTION
Use the required -Url param to specify the target site collection. You can also install assets and default data to other site collections. The script will provision all the necessary lists, files and settings necessary for Prosjektportalen to work.

.EXAMPLE
./Install.ps1 -Url https://puzzlepart.sharepoint.com/sites/prosjektportalen

.LINK
https://github.com/prosjektstotte/sp-prosjektportal

#>
Param(
    [Parameter(Mandatory = $true, HelpMessage = "Where do you want to install the Project Portal?")]
    [string]$Url,
    [Parameter(Mandatory = $false, HelpMessage = "Where do you want to install the required resources?")]
    [string]$AssetsUrl,
    [Parameter(Mandatory = $false, HelpMessage = "Where do you want to copy standard data from?")]
    [string]$DataSourceSiteUrl,
    [Parameter(Mandatory = $false, HelpMessage = "Which language do you want to install in? (Default is 1044, Norwegian)")]
    [int]$Language = 1044,
    [Parameter(Mandatory = $false, HelpMessage = "Stored credential from Windows Credential Manager")]
    [string]$GenericCredential,
    [Parameter(Mandatory = $false, HelpMessage = "Do you want to skip standard documents, tasks and phase checklist?")]
    [switch]$SkipData,
    [Parameter(Mandatory = $false, HelpMessage = "Do you want to skip default config?")]
    [switch]$SkipDefaultConfig
)

$sw = [Diagnostics.Stopwatch]::StartNew()
$ErrorActionPreference = "Stop"

# Add-Type -Path $PSScriptRoot\bundle\Microsoft.SharePoint.Client.Taxonomy.dll -ErrorAction SilentlyContinue
# Add-Type -Path $PSScriptRoot\bundle\Microsoft.SharePoint.Client.DocumentManagement.dll -ErrorAction SilentlyContinue
# Add-Type -Path $PSScriptRoot\bundle\Microsoft.SharePoint.Client.WorkflowServices.dll -ErrorAction SilentlyContinue
# Add-Type -Path $PSScriptRoot\bundle\Microsoft.SharePoint.Client.Search.dll -ErrorAction SilentlyContinue
# Add-Type -Path $PSScriptRoot\bundle\Newtonsoft.Json.dll -ErrorAction SilentlyContinue
# Import-Module $PSScriptRoot\bundle\SharePointPnPPowerShell2013.psd1 -ErrorAction SilentlyContinue -WarningAction SilentlyContinue

Write-Host ""
Write-Host ""
Write-Host ""
Write-Host ""
Write-Host "  ___             _     _   _                 _        _                ___   __  "
Write-Host " | _ \_ _ ___ ___(_)___| |_| |_ _ __  ___ _ _| |_ __ _| |___ _ __  __ _|_  ) /  \ "
Write-Host " |  _/ '_/ _ (_-<| / -_) / /  _| '_ \/ _ \ '_|  _/ _` | / -_) '  | \ V // / | () |"
Write-Host " |_| |_| \___/__// \___|_\_\\__| .__/\___/_|  \__\__,_|_\___|_||_|  \_//___(_)__/ "
Write-Host "               |__/            |_|                                                "
Write-Host ""
Write-Host ""
Write-Host ""
Write-Host ""

if ($Debug.IsPresent) {
    Set-PnPTraceLog -On -Level Debug
} else {
    Set-PnPTraceLog -Off
}
if (-not $AssetsUrl) {
    $AssetsUrl = $Url
}
if (-not $DataSourceSiteUrl) {
    $DataSourceSiteUrl = $Url
}
if (-not $GenericCredential) {
    $creds = (Get-Credential -Message "Please enter your username and password")
} else {
    $creds = $GenericCredential
}
try {
    Connect-PnPOnline $AssetsUrl -Credentials $creds
    Write-Host "Deploying required resources.. " -ForegroundColor Green -NoNewLine
    Apply-PnPProvisioningTemplate ".\templates\assets.pnp"
    Write-Host "DONE" -ForegroundColor Green
    Disconnect-PnPOnline
}
catch {
    Write-Host
    Write-Host "Error installing assets template to $AssetsUrl"  -ForegroundColor Red 
    Write-Host $error[0] -ForegroundColor Red
    exit 1 
}

try {
    Connect-PnPOnline $Url -Credentials $creds
    Write-Host "Deploying fields, content types, lists and pages.." -ForegroundColor Green -NoNewLine
    Apply-PnPProvisioningTemplate ".\templates\root.pnp" -Parameters @{"AssetsSiteUrl" = $AssetsUrl; "DataSourceSiteUrl" = $DataSourceSiteUrl;}
    Apply-PnPProvisioningTemplate ".\templates\sitesettings-$($Language).pnp"
    Apply-PnPProvisioningTemplate ".\templates\display-templates.pnp"
    Write-Host "DONE" -ForegroundColor Green
    Disconnect-PnPOnline
}
catch {
    Write-Host
    Write-Host "Error installing main template to $Url" -ForegroundColor Red
    Write-Host $error[0] -ForegroundColor Red
    exit 1 
}


if (-not $SkipData.IsPresent) {
    try {
        Connect-PnPOnline $DataSourceSiteUrl -Credentials $creds
        Write-Host "Deploying documents, tasks and phase checklist.." -ForegroundColor Green -NoNewLine
        Apply-PnPProvisioningTemplate ".\templates\data-$($Language).pnp"
        Write-Host "DONE" -ForegroundColor Green
        Disconnect-PnPOnline
    }
    catch {
        Write-Host
        Write-Host "Error installing standard data to $DataSourceSiteUrl" -ForegroundColor Red
        Write-Host $error[0] -ForegroundColor Red
    }
}


if (-not $SkipDefaultConfig.IsPresent) {
    try {
        Connect-PnPOnline $Url -Credentials $creds
        Write-Host "Deploying default config.." -ForegroundColor Green -NoNewLine
        Apply-PnPProvisioningTemplate ".\templates\config-$($Language).pnp" -Parameters @{"AssetsSiteUrl" = $AssetsUrl; "DataSourceSiteUrl" = $DataSourceSiteUrl;}
        Write-Host "DONE" -ForegroundColor Green
        Disconnect-PnPOnline
    }
    catch {
        Write-Host
        Write-Host "Error installing default config to $Url" -ForegroundColor Red
        Write-Host $error[0] -ForegroundColor Red
    }
}

$sw.Stop()
Write-Host "Installation completed in $($sw.Elapsed)" -ForegroundColor Green