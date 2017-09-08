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
    [Parameter(Mandatory = $false, HelpMessage = "Stored credential from Windows Credential Manager")]
    [string]$GenericCredential,
    [Parameter(Mandatory = $false, HelpMessage = "Do you want to skip standard documents, tasks and phase checklist?")]
    [switch]$SkipData,
    [Parameter(Mandatory = $false, HelpMessage = "Do you want to skip default config?")]
    [switch]$SkipDefaultConfig,
    [Parameter(Mandatory = $false, HelpMessage = "Do you want to skip installing taxonomy (in case you already have all needed term sets)?")]
    [switch]$SkipTaxonomy,
    [Parameter(Mandatory = $false, HelpMessage = "Do you want to skip installing assets (in case you already have installed assets prebiously)?")]
    [switch]$SkipAssets,
    [Parameter(Mandatory = $false, HelpMessage = "Do you want to handle PnP libraries and PnP PowerShell without using bundled files?")]
    [switch]$SkipLoadingBundle,
    [Parameter(Mandatory = $false, HelpMessage = "Use Web Login to connect to SharePoint. Useful for e.g. ADFS environments.")]
    [switch]$UseWebLogin,
    [Parameter(Mandatory = $false, HelpMessage = "Use the credentials of the current user to connect to SharePoint. Useful e.g. if you install directly from the server.")]
    [switch]$CurrentCredentials,
    [Parameter(Mandatory = $false, HelpMessage = "Installation Environment. If SkipLoadingBundle is set, this will be ignored")]
    [ValidateSet('SharePointPnPPowerShell2013','SharePointPnPPowerShell2016','SharePointPnPPowerShellOnline')]
    [string]$Environment = "SharePointPnPPowerShellOnline",
    [Parameter(Mandatory = $false, HelpMessage = "Folder for extensions (.pnp files)")]
    [string]$ExtensionFolder,
    [Parameter(Mandatory = $false)]
    [switch]$Upgrade
)

# Get has assocated groups
function Get-HasAssociatedGroups() {    
    Connect-SharePoint $Url  
    $ascMemberGroup = Get-PnPGroup -AssociatedMemberGroup -ErrorAction SilentlyContinue
    $ascVisitorGroup = Get-PnPGroup -AssociatedVisitorGroup -ErrorAction SilentlyContinue
    $ascOwnerGroup = Get-PnPGroup -AssociatedOwnerGroup -ErrorAction SilentlyContinue
    return (($ascMemberGroup -ne $null) -and ($ascVisitorGroup -ne $null) -and ($ascOwnerGroup -ne $null))
}

# Get termstore default language
function Get-TermStoreDefaultLanguage() {
    $session = Get-PnPTaxonomySession 
    $ts = $session.GetDefaultSiteCollectionTermStore() 
    return (Get-PnPProperty -ClientObject $ts -Property DefaultLanguage)
}

# Get web language
function Get-WebLanguage($ctx) {
    $web = $ctx.Web
    $ctx.Load($web)
    $ctx.ExecuteQuery()
    return $web.Language
}


# Connect to SharePoint
function Connect-SharePoint ($Url) {
    if ($UseWebLogin.IsPresent) {
        Connect-PnPOnline $Url -UseWebLogin
    } elseif ($CurrentCredentials.IsPresent) {
        Connect-PnPOnline $Url -CurrentCredentials
    } else {
        Connect-PnPOnline $Url -Credentials $Credential
    }
}


# Apply tepmplate
function Apply-Template([string]$Template, [switch]$Localized) {    
    $Language = Get-WebLanguage -ctx (Get-PnPContext)    
    if ($Localized.IsPresent) {
        $Template = "$($Template)-$($Language)"
    }
    Apply-PnPProvisioningTemplate ".\templates\$($Template).pnp" -Parameters @{"AssetsSiteUrl" = $AssetsUrlParam; "DataSourceSiteUrl" = $DataSourceUrlParam;}
}

# Aim at using relative urls for referencing scripts, images etc.
function Get-SecondaryUrlAsParam ([string]$RootUrl, $SecondaryUrl) {
    $RootUri = New-Object -TypeName System.Uri -ArgumentList $RootUrl
    $SecondaryUri = New-Object -TypeName System.Uri -ArgumentList $SecondaryUrl

    if ($RootUri.Host -eq $SecondaryUri.Host) {
        if ($SecondaryUri.LocalPath -eq "/") {
            return ""
        }
        return $SecondaryUri.LocalPath
    } else {
        return $SecondaryUrl
    }
}

if (-not $AssetsUrl) {
    $AssetsUrl = $Url
}

if (-not $DataSourceSiteUrl) {
    $DataSourceSiteUrl = $Url
}

$AssetsUrlParam = Get-SecondaryUrlAsParam -RootUrl $Url -SecondaryUrl $AssetsUrl
$DataSourceUrlParam = Get-SecondaryUrlAsParam -RootUrl $Url -SecondaryUrl $DataSourceSiteUrl

  
# Handling credentials
if (-not $GenericCredential -and -not $UseWebLogin.IsPresent) {
    $Credential = (Get-Credential -Message "Please enter your username and password")
} elseif (-not $UseWebLogin.IsPresent) {
    $Credential = $GenericCredential
}

# Start installation
function Start-Install() {
    # Prints header
    if (-not $Upgrade.IsPresent) {
        Write-Host "############################################################################" -ForegroundColor Green
        Write-Host "" -ForegroundColor Green
        Write-Host "Installing Prosjektportalen (2.1.0#94c6b03f)" -ForegroundColor Green
        Write-Host "Maintained by Puzzlepart @ https://github.com/Puzzlepart/prosjektportalen" -ForegroundColor Green
        Write-Host "" -ForegroundColor Green
        Write-Host "Installation URL:`t`t$Url" -ForegroundColor Green
        Write-Host "Assets URL:`t`t`t$AssetsUrl" -ForegroundColor Green
        Write-Host "Data Source URL:`t`t$DataSourceSiteUrl" -ForegroundColor Green
        Write-Host "Environment:`t`t`t$Environment" -ForegroundColor Green
        Write-Host "" -ForegroundColor Green
        Write-Host "############################################################################" -ForegroundColor Green
    }

    # Starts stop watch
    $sw = [Diagnostics.Stopwatch]::StartNew()
    $ErrorActionPreference = "Stop"

    # Loads bundle if switch SkipLoadingBundle is not present
    if (-not $SkipLoadingBundle.IsPresent) {
        $BundlePath = "$PSScriptRoot\bundle\$Environment"
        Add-Type -Path "$BundlePath\Microsoft.SharePoint.Client.Taxonomy.dll" -ErrorAction SilentlyContinue
        Add-Type -Path "$BundlePath\Microsoft.SharePoint.Client.DocumentManagement.dll" -ErrorAction SilentlyContinue
        Add-Type -Path "$BundlePath\Microsoft.SharePoint.Client.WorkflowServices.dll" -ErrorAction SilentlyContinue
        Add-Type -Path "$BundlePath\Microsoft.SharePoint.Client.Search.dll" -ErrorAction SilentlyContinue
        Add-Type -Path "$BundlePath\Newtonsoft.Json.dll" -ErrorAction SilentlyContinue
        Import-Module "$BundlePath\$Environment.psd1" -ErrorAction SilentlyContinue -WarningAction SilentlyContinue
    }

    # Sets up PnP trace log
    $execDateTime = Get-Date -Format "yyyyMMdd_HHmmss"
    Set-PnPTraceLog -On -Level Debug -LogFile "pplog-$execDateTime.txt"
  

    # Applies assets template if switch SkipAssets is not present
    if (-not $SkipAssets.IsPresent) {
        try {
            Connect-SharePoint $AssetsUrl
            Write-Host "Deploying required scripts, styling and images.. " -ForegroundColor Green -NoNewLine
            Apply-Template -Template "assets"
            Write-Host "DONE" -ForegroundColor Green
            Disconnect-PnPOnline
        }
        catch {
            Write-Host
            Write-Host "Error installing assets template to $AssetsUrl" -ForegroundColor Red 
            Write-Host $error[0] -ForegroundColor Red
            exit 1 
        }
    }

    # Installing root package
    try {
        Connect-SharePoint $Url    
        if (-not $SkipTaxonomy.IsPresent) {
            Write-Host "Installing taxonomy (term sets and initial terms)..." -ForegroundColor Green -NoNewLine
            $lcid = Get-TermStoreDefaultLanguage
            Apply-Template -Template "taxonomy-$($lcid)"
            Write-Host "DONE" -ForegroundColor Green
        }
        Write-Host "Deploying root-package with fields, content types, lists and pages..." -ForegroundColor Green -NoNewLine
        Apply-Template -Template "root" -Localized
        Apply-Template -Template "sitesettings" -Localized
        Write-Host "DONE" -ForegroundColor Green
        Disconnect-PnPOnline
    }
    catch {
        Write-Host
        Write-Host "Error installing root-package to $Url" -ForegroundColor Red
        Write-Host $error[0] -ForegroundColor Red
        exit 1 
    }

    # Installing data package
    if (-not $SkipData.IsPresent) {
        try {
            Connect-SharePoint $DataSourceSiteUrl        
            Write-Host "Deploying documents, tasks and phase checklist.." -ForegroundColor Green -NoNewLine
            Apply-Template -Template "data" -Localized
            Write-Host "DONE" -ForegroundColor Green
            Disconnect-PnPOnline
        }
        catch {
            Write-Host
            Write-Host "Error installing standard data to $DataSourceSiteUrl" -ForegroundColor Red
            Write-Host $error[0] -ForegroundColor Red
        }
    }

    # Installing config package
    if (-not $SkipDefaultConfig.IsPresent) {
        try {
            Connect-SharePoint $Url
            Write-Host "Deploying default config.." -ForegroundColor Green -NoNewLine
            Apply-Template -Template "config" -Localized
            Write-Host "DONE" -ForegroundColor Green
            Disconnect-PnPOnline
        }
        catch {
            Write-Host
            Write-Host "Error installing default config to $Url" -ForegroundColor Red
            Write-Host $error[0] -ForegroundColor Red
        }
    }

    # Installing extensions if ExtensionFolder is specified
    if ($ExtensionFolder -ne $null) {
        $extensionFiles = Get-ChildItem "$($ExtensionFolder)/*.pnp"
        if ($extensionFiles.Length -gt 0) {
            try {
                Connect-SharePoint $Url
                Write-Host "Deploying extensions.." -ForegroundColor Green -NoNewLine
                foreach($extension in $extensionFiles) {
                    Apply-PnPProvisioningTemplate $extension.FullName -Parameters @{"AssetsSiteUrl" = $AssetsUrlParam; "DataSourceSiteUrl" = $DataSourceUrlParam;}
                }
                Write-Host "DONE" -ForegroundColor Green
                Disconnect-PnPOnline
            }
            catch {
                Write-Host
                Write-Host "Error installing extensions to $Url" -ForegroundColor Red
                Write-Host $error[0] -ForegroundColor Red
            }
        }
    }

    $sw.Stop()
    if (-not $Upgrade.IsPresent) {
        Write-Host "Installation completed in $($sw.Elapsed)" -ForegroundColor Green
    }
}



if (Get-HasAssociatedGroups -eq $true) {
    Start-Install
} else {
    Write-Host "Can't install to $($Url). Missing associated groups. Please go to /_layouts/15/permsetup.aspx to set up groups for the site." -ForegroundColor Red
}