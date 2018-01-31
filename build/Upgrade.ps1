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
    [Parameter(Mandatory = $false, HelpMessage = "Where do you want to install the required resources?")]
    [string]$AssetsUrl,
    [Parameter(Mandatory = $false, HelpMessage = "Where do you want to copy standard data from?")]
    [string]$DataSourceSiteUrl,
    [Parameter(Mandatory = $false, HelpMessage = "Do you want to handle PnP libraries and PnP PowerShell without using bundled files?")]
    [switch]$SkipLoadingBundle,
    [Parameter(Mandatory = $false, HelpMessage = "Stored credential from Windows Credential Manager")]
    [string]$GenericCredential,
    [Parameter(Mandatory = $false, HelpMessage = "Use Web Login to connect to SharePoint. Useful for e.g. ADFS environments.")]
    [switch]$UseWebLogin,
    [Parameter(Mandatory = $false, HelpMessage = "Use the credentials of the current user to connect to SharePoint. Useful e.g. if you install directly from the server.")]
    [switch]$CurrentCredentials,
    [Parameter(Mandatory = $false, HelpMessage = "PowerShell credential to authenticate with")]
    [System.Management.Automation.PSCredential]$PSCredential,
    [Parameter(Mandatory = $false, HelpMessage = "Installation Environment. If SkipLoadingBundle is set, this will be ignored")]
    [ValidateSet('SharePointPnPPowerShell2013','SharePointPnPPowerShell2016','SharePointPnPPowerShellOnline')]
    [string]$Environment = "SharePointPnPPowerShellOnline",    
    [Parameter(Mandatory = $false, HelpMessage = "Do you want to skip installing assets (in case you already have installed assets previously)?")]
    [switch]$SkipAssets,
    [Parameter(Mandatory = $false, HelpMessage = "Do you want to skip installing third party scripts (in case you already have installed third party scripts previously)?")]
    [switch]$SkipThirdParty,
    [Parameter(Mandatory = $false, HelpMessage = "Do you want to skip custom action removal?")]
    [switch]$SkipCustomActionRemoval
)

. ./SharedFunctions.ps1

# Loads bundle if switch SkipLoadingBundle is not present
if (-not $SkipLoadingBundle.IsPresent) {
    LoadBundle -Environment $Environment
}

# Handling credentials
if ($PSCredential -ne $null) {
    $Credential = $PSCredential
} elseif ($GenericCredential -ne $null -and $GenericCredential -ne "") {
    $Credential = Get-PnPStoredCredential -Name $GenericCredential -Type PSCredential 
} elseif ($Credential -eq $null -and -not $UseWebLogin.IsPresent -and -not $CurrentCredentials.IsPresent) {
    $Credential = (Get-Credential -Message "Please enter your username and password")
}

if (-not $AssetsUrl) {
    $AssetsUrl = $Url
}

if (-not $DataSourceSiteUrl) {
    $DataSourceSiteUrl = $Url
}

try {
    Connect-SharePoint -Url $Url
} catch {
    Write-Error $Error[0]
    Write-Error "An error occured connecting to $Url. Aborting."
    exit 1
}
$CurrentVersion = ParseVersion -VersionString (Get-PnPPropertyBag -Key pp_version)

# [version] will be replaced with the actual version by 'gulp release'
$InstallVersion = ParseVersion -VersionString "[version]"

if ($InstallVersion -gt $CurrentVersion) {
    Write-Host "############################################################################" -ForegroundColor Green
    Write-Host "" -ForegroundColor Green
    Write-Host "Upgrading Prosjektportalen from version $($CurrentVersion) to $($InstallVersion)" -ForegroundColor Green
    Write-Host "Maintained by Puzzlepart @ https://github.com/Puzzlepart/prosjektportalen" -ForegroundColor Green
    Write-Host "" -ForegroundColor Green
    Write-Host "Upgrade URL:`t`t$Url" -ForegroundColor Green
    Write-Host "" -ForegroundColor Green
    Write-Host "############################################################################" -ForegroundColor Green
    if (-not $SkipCustomActionRemoval.IsPresent) {
        try {
            Write-Host "Removing existing custom actions.. " -ForegroundColor Green -NoNewLine
            Connect-SharePoint $Url       
            Get-PnPCustomAction -Scope Site | ForEach-Object { Remove-PnPCustomAction -Identity $_.Id -Scope Site -Force }
            Get-PnPCustomAction -Scope Web | ForEach-Object { Remove-PnPCustomAction -Identity $_.Id -Scope Web -Force }
            Write-Host "DONE" -ForegroundColor Green
            Disconnect-PnPOnline
        }
        catch {
            Write-Host
            Write-Host "Error removing existing custom actions from $Url" -ForegroundColor Red 
            Write-Host $error[0] -ForegroundColor Red
            exit 1 
        }
    }

    .\Install.ps1 -Url $Url -AssetsUrl $AssetsUrl -DataSourceSiteUrl $DataSourceSiteUrl -Environment $Environment -Upgrade -SkipData -SkipDefaultConfig -SkipTaxonomy -PSCredential $Credential -UseWebLogin:$UseWebLogin -CurrentCredentials:$CurrentCredentials -SkipLoadingBundle -SkipAssets:$SkipAssets -SkipThirdParty:$SkipThirdParty

    if ($InstallVersion.Major -gt $CurrentVersion.Major -or $InstallVersion.Minor -gt $CurrentVersion.Minor) {
        Connect-SharePoint $Url       
        Write-Host "Deploying upgrade packages.." -ForegroundColor Green -NoNewLine
        $Language = Get-WebLanguage -ctx (Get-PnPContext)
        $upgradePkgs = Get-ChildItem "./@upgrade/$($CurrentVersion.Major).$($CurrentVersion.Minor)_$($InstallVersion.Major).$($InstallVersion.Minor)/$($Language)/*.pnp"
        foreach ($pkg in $upgradePkgs) {
            Apply-PnPProvisioningTemplate $pkg.FullName
        }
        Write-Host "DONE" -ForegroundColor Green
        Disconnect-PnPOnline
    } 
    Write-Host "No additional upgrade steps required. Upgrade complete." -ForegroundColor Green
} else {    
    Write-Host "You're already on the same or newer version of Project Portal" -ForegroundColor Yellow
}
