<#

.SYNOPSIS
This script will install Prosjektportalen to a site collection

.DESCRIPTION
Use the required -Url param to specify the target site collection. You can also install assets and default data to other site collections. The script will provision all the necessary lists, files and settings necessary for Prosjektportalen to work.

.EXAMPLE
./Install.ps1 -Url https://puzzlepart.sharepoint.com/sites/prosjektportalen

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
    [Parameter(Mandatory = $false, HelpMessage = "Do you want to skip standard documents, tasks and phase checklist?")]
    [switch]$SkipData,
    [Parameter(Mandatory = $false, HelpMessage = "Do you want to skip default config?")]
    [switch]$SkipDefaultConfig,
    [Parameter(Mandatory = $false, HelpMessage = "Do you want to skip installing taxonomy (in case you already have all needed term sets)?")]
    [switch]$SkipTaxonomy,
    [Parameter(Mandatory = $false, HelpMessage = "Do you want to skip installing assets (in case you already have installed assets previously)?")]
    [switch]$SkipAssets,
    [Parameter(Mandatory = $false, HelpMessage = "Do you want to skip installing third party scripts (in case you already have installed third party scripts previously)?")]
    [switch]$SkipThirdParty,    
    [Parameter(Mandatory = $false, HelpMessage = "Do you want to skip installing root package?")]
    [switch]$SkipRootPackage,
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
    [Parameter(Mandatory = $false, HelpMessage = "Folder for extensions (.pnp files)")]
    [string]$ExtensionFolder,
    [Parameter(Mandatory = $false)]
    [switch]$ConfirmExtensions,
    [Parameter(Mandatory = $false)]
    [switch]$Upgrade,
    [Parameter(Mandatory = $false)]
    [ValidateSet('None','File','Host')]
    [string]$Logging = "File",
    [Parameter(Mandatory = $false)]
    [Hashtable]$Parameters,
    [Parameter(Mandatory = $false)]
    [switch]$SupressOutput
)

. ./SharedFunctions.ps1

function Window-Write($ForegroundColor) {
    if (-not $SupressOutput.IsPresent) {
        Write-Host $Args[0] -ForegroundColor $ForegroundColor
    }
}

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


$AssetsUrlParam = Get-SecondaryUrlAsParam -RootUrl $Url -SecondaryUrl $AssetsUrl
$DataSourceUrlParam = Get-SecondaryUrlAsParam -RootUrl $Url -SecondaryUrl $DataSourceSiteUrl

# Start installation
function Start-Install() {
    # Prints header
    if (-not $Upgrade.IsPresent) {
        Window-Write "############################################################################" -ForegroundColor Green
        Window-Write "" -ForegroundColor Green
        Window-Write "Installing Prosjektportalen ([version])" -ForegroundColor Green
        Window-Write "Maintained by Puzzlepart @ https://github.com/Puzzlepart/prosjektportalen" -ForegroundColor Green
        Window-Write "" -ForegroundColor Green
        Window-Write "Installation URL:`t`t$Url" -ForegroundColor Green
        Window-Write "Assets URL:`t`t`t$AssetsUrl" -ForegroundColor Green
        Window-Write "Data Source URL:`t`t$DataSourceSiteUrl" -ForegroundColor Green
        Window-Write "Environment:`t`t`t$Environment" -ForegroundColor Green
        Window-Write "" -ForegroundColor Green
        Window-Write "############################################################################" -ForegroundColor Green
    }

    # Starts stop watch
    $sw = [Diagnostics.Stopwatch]::StartNew()
    $ErrorActionPreference = "Stop"

    # Sets up PnP trace log
    if($Logging -eq "File") {
        $execDateTime = Get-Date -Format "yyyyMMdd_HHmmss"
        Set-PnPTraceLog -On -Level Debug -LogFile "pplog-$execDateTime.txt"
    }
    elseif($Logging -eq "Host") {
        Set-PnPTraceLog -On -Level Debug
    }
    else {
        Set-PnPTraceLog -Off
    }
  

    # Applies assets template if switch SkipAssets is not present
    if (-not $SkipAssets.IsPresent) {
        try {
            Connect-SharePoint $AssetsUrl -UseWeb
            Window-Write "Deploying required scripts, styling, config and images.. " -ForegroundColor Green -NoNewLine
            Apply-Template -Template "assets" -Localized
            Window-Write "DONE" -ForegroundColor Green
            Disconnect-PnPOnline
        }
        catch {
            Window-Write
            Window-Write "Error installing assets template to $AssetsUrl" -ForegroundColor Red 
            Window-Write $error[0] -ForegroundColor Red
            exit 1 
        }
    }

    # Applies thirdparty template if switch SkipThirdParty is not present
    if (-not $SkipThirdParty.IsPresent) {
        try {
            Connect-SharePoint $AssetsUrl -UseWeb
            Window-Write "Deploying third party scripts.. " -ForegroundColor Green -NoNewLine
            Apply-Template -Template "thirdparty"
            Window-Write "DONE" -ForegroundColor Green
            Disconnect-PnPOnline
        }
        catch {
            Window-Write
            Window-Write "Error installing thirdparty template to $AssetsUrl" -ForegroundColor Red 
            Window-Write $error[0] -ForegroundColor Red
            exit 1 
        }
    }
  
    # Installing taxonomy if switch SkipTaxonomy is not present
    if (-not $SkipTaxonomy.IsPresent) {
        Connect-SharePoint $Url  
        Window-Write "Installing taxonomy (term sets and initial terms)..." -ForegroundColor Green -NoNewLine
        $lcid = Get-TermStoreDefaultLanguage
        Apply-Template -Template "taxonomy-$($lcid)"
        Window-Write "DONE" -ForegroundColor Green
    }

    # Installing root package if switch SkipRootPackage is not present
    if (-not $SkipRootPackage.IsPresent) {
        try {
            Connect-SharePoint $Url    
            Window-Write "Deploying root-package with fields, content types, lists and pages..." -ForegroundColor Green -NoNewLine
            Apply-Template -Template "root" -Localized -ExcludeHandlers PropertyBagEntries -Parameters $Parameters
            Window-Write "DONE" -ForegroundColor Green
            Disconnect-PnPOnline
        }
        catch {
            Window-Write
            Window-Write "Error installing root-package to $Url" -ForegroundColor Red
            Window-Write $error[0] -ForegroundColor Red
            exit 1 
        }
    }

    # Installing data package
    if (-not $SkipData.IsPresent) {
        try {
            Connect-SharePoint $DataSourceSiteUrl        
            Window-Write "Deploying documents, tasks and phase checklist.." -ForegroundColor Green -NoNewLine
            Apply-Template -Template "data" -Localized
            Window-Write "DONE" -ForegroundColor Green
            Disconnect-PnPOnline
        }
        catch {
            Window-Write
            Window-Write "Error installing standard data to $DataSourceSiteUrl" -ForegroundColor Red
            Window-Write $error[0] -ForegroundColor Red
        }
    }

    # Installing config package
    if (-not $SkipDefaultConfig.IsPresent) {
        try {
            Connect-SharePoint $Url
            Window-Write "Deploying default config.." -ForegroundColor Green -NoNewLine
            Apply-Template -Template "config" -Localized
            Window-Write "DONE" -ForegroundColor Green
            Disconnect-PnPOnline
        }
        catch {
            Window-Write
            Window-Write "Error installing default config to $Url" -ForegroundColor Red
            Window-Write $error[0] -ForegroundColor Red
        }
    }

    # Installing extensions if ExtensionFolder is specified
    if ($ExtensionFolder -ne $null) {
        $extensionFiles = Get-ChildItem "$($ExtensionFolder)/*.pnp"
        if ($extensionFiles.Length -gt 0) {
            try {
                Connect-SharePoint $Url
                Window-Write "Deploying extensions.." -ForegroundColor Green
                foreach($extension in $extensionFiles) {
                    $confirmation = "y"
                    if ($ConfirmExtensions.IsPresent) {
                        $confirmation = Read-Host "`tDeploy extension $($extension.BaseName) (y/n)?"
                    }
                    if($confirmation.toLower() -eq "y") {
                        Window-Write "`tDeploying extension $($extension.BaseName).. " -ForegroundColor White -NoNewLine
                        Apply-PnPProvisioningTemplate $extension.FullName -Parameters @{"AssetsSiteUrl" = $AssetsUrlParam; "DataSourceSiteUrl" = $DataSourceUrlParam;}
                        Window-Write "DONE" -ForegroundColor White
                    }
                }
                Disconnect-PnPOnline
            }
            catch {
                Window-Write
                Window-Write "Error installing extensions to $Url" -ForegroundColor Red
                Window-Write $error[0] -ForegroundColor Red
            }
        }
    }

    try {
        Connect-SharePoint $Url    
        Window-Write "Updating web property bag..." -ForegroundColor Green -NoNewLine
        Apply-Template -Template "root" -Localized -Handlers PropertyBagEntries
        Window-Write "DONE" -ForegroundColor Green
        Disconnect-PnPOnline
    }
    catch {
        Window-Write
        Window-Write "Error updating web property bag for $Url" -ForegroundColor Red
        Window-Write $error[0] -ForegroundColor Red
        exit 1 
    }

    $sw.Stop()
    if (-not $Upgrade.IsPresent) {
        Window-Write "Installation completed in $($sw.Elapsed)" -ForegroundColor Green
    }
}

Ensure-AssociatedGroups
Start-Install
