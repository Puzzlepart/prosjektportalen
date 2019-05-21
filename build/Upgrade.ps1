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
    [Parameter(Mandatory = $false, HelpMessage = "Do you want to skip installing root package (main installation package)? Only to be done if you're sure you only need new assets files.")]
    [switch]$SkipRootPackage,
    [ValidateSet('None','File','Host')]
    [string]$Logging = "File",
    [Parameter(Mandatory = $false, HelpMessage = "Use Force if you want to install packages even if version check fails")]
    [switch]$Force,
    [Parameter(Mandatory = $false)]
    [Hashtable]$Parameters
)

$ErrorActionPreference = "Stop"

# Fix encoding issues of scripts
Get-ChildItem .\scripts\* -Recurse *.ps1 | % { $content=$_ | Get-Content; Set-Content -PassThru $_.FullName $content -Encoding UTF8 -Force} > $null

. ./scripts/SharedFunctions.ps1

# Loads bundle if switch SkipLoadingBundle is not present
if (-not $SkipLoadingBundle.IsPresent) {
    LoadBundle -Environment $Environment
}

$LoadedPnPCommand = Get-Command Connect-PnPOnline
$LoadedPnPCommandVersion = $LoadedPnPCommand.Version
$LoadedPnPCommandSource = $LoadedPnPCommand.Source

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

$Connection = Connect-SharePoint -Url $Url -Connection $Connection
$ProjectPortalContext = Get-PnPContext
$Language = Get-WebLanguage -ctx $ProjectPortalContext

if ($null -eq $Connection) {
    Write-Host
    Write-Host "Error connecting to SharePoint $Url. Aborting" -ForegroundColor Red 
    Write-Host $error[0] -ForegroundColor Red
    exit 1 
}

$CurrentVersion = ParseVersion -VersionString (Get-PnPPropertyBag -Key pp_version)
# {package-version} will be replaced with the actual version by 'npm run-script release'
$InstallVersion = ParseVersion -VersionString "{package-version}"
$UpgradeFolderPath = "./@upgrade/$($CurrentVersion.Major).$($CurrentVersion.Minor)"

if ($InstallVersion -gt $CurrentVersion -or $Force.IsPresent) {
    Write-Host "############################################################################" -ForegroundColor Green
    Write-Host "" -ForegroundColor Green
    Write-Host "Prosjektportalen is maintained by Puzzlepart @ https://github.com/Puzzlepart/prosjektportalen" -ForegroundColor Green
    Write-Host "" -ForegroundColor Green
    Write-Host "Upgrading Prosjektportalen from version $($CurrentVersion) to $($InstallVersion)" -ForegroundColor Green
    Write-Host "" -ForegroundColor Green
    Write-Host "Upgrade URL:`t`t$Url" -ForegroundColor Green
    Write-Host "PnP Environment:`t$LoadedPnPCommandSource ($LoadedPnPCommandVersion)" -ForegroundColor Green
    Write-Host "" -ForegroundColor Green
    Write-Host "Note: The upgrade requires site collection admin and term store admin permissions" -ForegroundColor Yellow
    Write-Host "" -ForegroundColor Green
    Write-Host "############################################################################" -ForegroundColor Green

    if ($InstallVersion.Major -gt $CurrentVersion.Major -or $InstallVersion.Minor -gt $CurrentVersion.Minor) {
        try {
            if (Test-Path $UpgradeFolderPath -PathType Container) {
                Write-Host "Installing pre-upgrade packages.." -ForegroundColor Green -NoNewLine
                $upgradePkgs = Get-ChildItem -Path "$UpgradeFolderPath/pre-*-$($Language).pnp"
                if ($null -ne $upgradePkgs) {
                    foreach ($pkg in $upgradePkgs) {
                        Apply-PnPProvisioningTemplate $pkg.FullName -ErrorAction SilentlyContinue
                    }
                }
                Write-Host "DONE" -ForegroundColor Green
            }
        }
        catch {
            Write-Host
            Write-Host "Error deploying pre-upgrade packages to $Url" -ForegroundColor Red 
            Write-Host $error[0] -ForegroundColor Red
            exit 1 
        }

        # Removing custom actions with wrong internal-names from versions 2.2 and before
        if ($CurrentVersion.Minor -lt 3) {
            try {
                Write-Host "Removing existing custom actions.. " -ForegroundColor Green -NoNewLine
                Get-PnPCustomAction -Scope Web | ForEach-Object { Remove-PnPCustomAction -Identity $_.Id -Scope Web -Force }
                Write-Host "DONE" -ForegroundColor Green
            }
            catch {
                Write-Host
                Write-Host "Error removing existing custom actions from $Url" -ForegroundColor Red 
                Write-Host $error[0] -ForegroundColor Red
                exit 1 
            }
        }
    }
    
    try {
        .\Install.ps1 -Url $Url -AssetsUrl $AssetsUrl -DataSourceSiteUrl $DataSourceSiteUrl -Environment $Environment -Upgrade -SkipData -SkipDefaultConfig -SkipTaxonomy -PSCredential $Credential -Connection $Connection -UseWebLogin:$UseWebLogin -CurrentCredentials:$CurrentCredentials -SkipLoadingBundle -SkipAssets:$SkipAssets -SkipThirdParty:$SkipThirdParty -SkipRootPackage:$SkipRootPackage -Logging $Logging -Parameters $Parameters
    }
    catch {
        Write-Host
        Write-Host "Error upgrading Project Portal. Aborting"
        exit 1
    }

    if ($InstallVersion.Major -gt $CurrentVersion.Major -or $InstallVersion.Minor -gt $CurrentVersion.Minor) {
        $Connection = Connect-SharePoint $Url -Connection $Connection
        if (Test-Path $UpgradeFolderPath -PathType Container) {
            Write-Host "Installing upgrade packages.." -ForegroundColor Green
            $upgradePkgs = Get-ChildItem -Path "$UpgradeFolderPath/*-$($Language).pnp" -Exclude "pre-*.pnp"
            if ($null -ne $upgradePkgs) {
                foreach ($pkg in $upgradePkgs) {
                    Write-Host "Applying upgrade-package $($pkg.FullName)" 
                    Apply-PnPProvisioningTemplate $pkg.FullName -ErrorAction SilentlyContinue
                }
            }
            Write-Host "DONE" -ForegroundColor Green
        }

        if ($CurrentVersion.Minor -lt 5) {
            Write-Host "Applying additional upgrade steps... " -ForegroundColor Green -NoNewLine
            # Replacing Content Type IDs in configurations from versions 2.3 and before
            if ($CurrentVersion.Minor -lt 4) {
                try {
                    Get-PnPListItem -List "Lists/DataSources" | ForEach-Object {
                        $Query = $_["GtDpSearchQuery"].Replace("0x010109010058561f86d956412b9dd7957bbcd67aae0100", "0x010088578E7470CC4AA68D5663464831070211").Replace(" contentclass:STS_Web", "")
                        $_["GtDpSearchQuery"] = $Query
                        $_.Update()
                    }
                    Get-PnPListItem -List "Lists/DynamicPortfolioViews" | ForEach-Object {
                        $Query = $_["GtDpSearchQuery"].Replace("0x010109010058561f86d956412b9dd7957bbcd67aae0100", "0x010088578E7470CC4AA68D5663464831070211").Replace(" contentclass:STS_Web", "")
                        $_["GtDpSearchQuery"] = $Query
                        $_.Update()
                    }
                    Invoke-PnPQuery
                    Write-Host "DONE" -ForegroundColor Green
                }
                catch {
                    Write-Host
                    Write-Host "Error applying additional upgrade steps to $Url" -ForegroundColor Red 
                    Write-Host $error[0] -ForegroundColor Red
                    exit 1 
                }
            }
            $ProjectLifecycleFilter = ""
            $ClosedProjectsDisplayName = ""
            switch ($Language){
                "1033" { 
                    $ProjectLifecycleFilter = 'ContentTypeId:0x010088578E7470CC4AA68D5663464831070211* NOT GtProjectLifecycleStatusOWSCHCS="Closed"'
                    $ClosedProjectsDisplayName = 'Closed Projects'
                }
                "1044" { 
                    $ProjectLifecycleFilter = 'ContentTypeId:0x010088578E7470CC4AA68D5663464831070211* NOT GtProjectLifecycleStatusOWSCHCS="Avsluttet"'
                    $ClosedProjectsDisplayName = 'Avsluttede prosjekter'
                }
            }
            try {
                Get-PnPListItem -List "Lists/DataSources" | ForEach-Object {
                    if ($_["Title"] -eq "PROJECTS") {
                        $Query = $_["GtDpSearchQuery"].Replace("ContentTypeId:0x010088578E7470CC4AA68D5663464831070211*", $ProjectLifecycleFilter)
                        $_["GtDpSearchQuery"] = $Query
                        $_.Update()
                    }
                    if ($_["Title"] -eq "BENEFITSOVERVIEW") {
                        $Query = "(ContentTypeID:0x0100B384774BA4EBB842A5E402EBF4707367* OR ContentTypeID:0x01007A831AC68204F04AAA022CFF06C7BAA2* OR 0x0100FF4E12223AF44F519AF40C441D05DED0*) Path:{SiteCollection.URL}"
                        $_["GtDpSearchQuery"] = $Query
                        $_.Update()
                    }
                }
                $ClosedProjects = Get-PnPListItem -List "Lists/DynamicPortfolioViews" | Where-Object {$_["GtDpDisplayName"] -eq $ClosedProjectsDisplayName}
                if ($null -ne $ClosedProjects) {
                    $Query = $ClosedProjects["GtDpSearchQuery"].Replace("ContentTypeId:0x010088578E7470CC4AA68D5663464831070211*", $ProjectLifecycleFilter.Replace(" NOT ", " "))
                    $ClosedProjects["GtDpSearchQuery"] = $Query
                    $ClosedProjects.Update()
                } else {
                    Add-PnPListItem -List "Lists/DynamicPortfolioViews" -Values @{ Title=$ClosedProjectsDisplayName; GtDpSearchQuery=($ProjectLifecycleFilter.Replace(" NOT ", " ") + " Path:{SiteCollection.URL}") }
                }
                

                Get-PnPListItem -List "Lists/DynamicPortfolioViews" |  Where-Object {$_["GtDpDisplayName"] -ne $ClosedProjectsDisplayName} | ForEach-Object {
                    $Query = $_["GtDpSearchQuery"].Replace("ContentTypeId:0x010088578E7470CC4AA68D5663464831070211*", $ProjectLifecycleFilter)
                    $_["GtDpSearchQuery"] = $Query
                    $_.Update()
                }
                Invoke-PnPQuery
                Write-Host "DONE" -ForegroundColor Green
            }
            catch {
                Write-Host
                Write-Host "Error applying additional upgrade steps to $Url" -ForegroundColor Red 
                Write-Host $error[0] -ForegroundColor Red
                exit 1 
            }
        }
    } 
    Write-Host "No additional upgrade steps required. Upgrade complete." -ForegroundColor Green
} else {    
    Write-Host "You're already on the same or newer version of Project Portal" -ForegroundColor Yellow
}
Disconnect-PnPOnline