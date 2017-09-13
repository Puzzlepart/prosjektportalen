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

function ParseVersion($VersionString) {
    $vs = $VersionString.Split("#")[0]
    return [Version]($vs)
}

function Get-WebLanguage($ctx) {
    $web = $ctx.Web
    $ctx.Load($web)
    $ctx.ExecuteQuery()
    return $web.Language
}

function LoadBundle($Environment) {
    $BundlePath = "$PSScriptRoot\bundle\$Environment"
    Add-Type -Path "$BundlePath\Microsoft.SharePoint.Client.Taxonomy.dll" -ErrorAction SilentlyContinue
    Add-Type -Path "$BundlePath\Microsoft.SharePoint.Client.DocumentManagement.dll" -ErrorAction SilentlyContinue
    Add-Type -Path "$BundlePath\Microsoft.SharePoint.Client.WorkflowServices.dll" -ErrorAction SilentlyContinue
    Add-Type -Path "$BundlePath\Microsoft.SharePoint.Client.Search.dll" -ErrorAction SilentlyContinue
    Add-Type -Path "$BundlePath\Newtonsoft.Json.dll" -ErrorAction SilentlyContinue
    Import-Module "$BundlePath\$Environment.psd1" -ErrorAction SilentlyContinue -WarningAction SilentlyContinue
}