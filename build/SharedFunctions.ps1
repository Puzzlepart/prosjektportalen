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

# Ensure assocated groups
function Ensure-AssociatedGroups() {    
    Connect-SharePoint $Url  
    $ascMemberGroup = Get-PnPGroup -AssociatedMemberGroup -ErrorAction SilentlyContinue
    $ascVisitorGroup = Get-PnPGroup -AssociatedVisitorGroup -ErrorAction SilentlyContinue
    $ascOwnerGroup = Get-PnPGroup -AssociatedOwnerGroup -ErrorAction SilentlyContinue

    if($ascMemberGroup -eq $null -or $ascVisitorGroup -eq $null -or $ascOwnerGroup -eq $null) {
        Write-Host "We're missing some associated groups." -ForegroundColor Yellow
    }

    if($ascMemberGroup -eq $null) {
        $ascMemberGroupName = Read-Host "Couldn't find a AssociatedMemberGroup. Enter name"
        $ascMemberGroup = Get-PnPGroup -Identity $ascMemberGroupName -ErrorAction SilentlyContinue
        if($ascVisitorGroup -eq $null) {
            Write-Host "Group doesn't exist. Creating..."
            $ascMemberGroup = New-PnPGroup -Title $ascMemberGroupName
        }
        Write-Host "Setting group $($ascMemberGroupName) as AssociatedMemberGroup..."
        Set-PnPGroup -Identity $ascMemberGroup.Id -SetAssociatedGroup Members
    }
    if($ascVisitorGroup -eq $null) {
        $ascVisitorGroupName = Read-Host "Couldn't find a AssociatedVisitorGroup. Enter name"     
        $ascVisitorGroup = Get-PnPGroup -Identity $ascVisitorGroupName -ErrorAction SilentlyContinue   
        if($ascVisitorGroup -eq $null) {
            Write-Host "Group doesn't exist. Creating..."
            $ascVisitorGroup = New-PnPGroup -Title $ascVisitorGroupName
        }
        Write-Host "Setting group $($ascVisitorGroupName) as AssociatedVisitorGroup..."
        Set-PnPGroup -Identity $ascVisitorGroup.Id -SetAssociatedGroup Visitors
    }
    if($ascOwnerGroup -eq $null) {
        $ascOwnerGroupName = Read-Host "Couldn't find a AssociatedOwnerGroup. Enter name"    
        $ascOwnerGroup = Get-PnPGroup -Identity $ascOwnerGroupName -ErrorAction SilentlyContinue    
        if($ascOwnerGroup -eq $null) {
            Write-Host "Group doesn't exist. Creating..."
            $ascOwnerGroup = New-PnPGroup -Title $ascOwnerGroupName
        }
        Write-Host "Setting group $($ascOwnerGroupName) as AssociatedOwnerGroup..."
        Set-PnPGroup -Identity $ascOwnerGroup.Id -SetAssociatedGroup Owners
    }
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