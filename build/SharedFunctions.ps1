# Connect to SharePoint
function Connect-SharePoint ([string]$Url, [Object]$Connection) {
    $ConnectionUrl = $Url.TrimEnd("/")

	if ($null -ne $Connection) {
		if ($Connection.Url -eq $ConnectionUrl) {
			return $Connection
		}
	}
	if ($UseWebLogin.IsPresent) {
		return Connect-PnPOnline $ConnectionUrl -UseWebLogin -ReturnConnection
	} elseif ($CurrentCredentials.IsPresent) {
		return Connect-PnPOnline $ConnectionUrl -CurrentCredentials -ReturnConnection
	} else {
		return Connect-PnPOnline $ConnectionUrl -Credentials $Credential -ReturnConnection
	}
}

# Ensure assocated groups
function Ensure-AssociatedGroups() {
    $ascMemberGroup = Get-PnPGroup -AssociatedMemberGroup -ErrorAction SilentlyContinue
    $ascVisitorGroup = Get-PnPGroup -AssociatedVisitorGroup -ErrorAction SilentlyContinue
    $ascOwnerGroup = Get-PnPGroup -AssociatedOwnerGroup -ErrorAction SilentlyContinue

    if($ascOwnerGroup -eq $null -or $ascMemberGroup -eq $null -or $ascVisitorGroup -eq $null) {
        Write-Host "We're missing some associated groups." -ForegroundColor Yellow
    }

    if($ascOwnerGroup -eq $null) {
        $ascOwnerGroupName = Read-Host "Couldn't find a associated owner group. Enter name"    
        $ascOwnerGroup = Get-PnPGroup -Identity $ascOwnerGroupName -ErrorAction SilentlyContinue    
        if($ascOwnerGroup -eq $null) {
            Write-Host "Group '$($ascOwnerGroupName)' doesn't exist. Creating..." -ForegroundColor Green
            $ascOwnerGroup = New-PnPGroup -Title $ascOwnerGroupName
        }
        Write-Host "Setting group $($ascOwnerGroupName) as associated owner group..." -ForegroundColor Green
        Set-PnPGroup -Identity $ascOwnerGroup.Id -SetAssociatedGroup Owners
        Write-Host "Granting the group $($ascOwnerGroupName) full control on the web..." -ForegroundColor Green
        Set-PnPWebPermission -Group $ascOwnerGroup.Id -AddRole "Full control" -ErrorAction SilentlyContinue
        Set-PnPWebPermission -Group $ascOwnerGroup.Id -AddRole "Full kontroll" -ErrorAction SilentlyContinue
        Write-Host ""
    }
    if($ascMemberGroup -eq $null) {
        $ascMemberGroupName = Read-Host "Couldn't find a associated members group. Enter name"
        $ascMemberGroup = Get-PnPGroup -Identity $ascMemberGroupName -ErrorAction SilentlyContinue
        if($ascMemberGroup -eq $null) {
            Write-Host "Group '$($ascMemberGroupName)' doesn't exist. Creating..." -ForegroundColor Green
            $ascMemberGroup = New-PnPGroup -Title $ascMemberGroupName -Owner $ascOwnerGroup.Title
        }
        Write-Host "Setting group $($ascMemberGroupName) as associated members group..." -ForegroundColor Green
        Set-PnPGroup -Identity $ascMemberGroup.Id -SetAssociatedGroup Members
        Write-Host "Granting the group $($ascMemberGroupName) contribute rights on the web..." -ForegroundColor Green
        Set-PnPWebPermission -Group $ascMemberGroup.Id -AddRole "Contribute" -ErrorAction SilentlyContinue
        Set-PnPWebPermission -Group $ascMemberGroup.Id -AddRole "Bidra" -ErrorAction SilentlyContinue
        Write-Host ""
    }
    if($ascVisitorGroup -eq $null) {
        $ascVisitorGroupName = Read-Host "Couldn't find a associated visitors group. Enter name"     
        $ascVisitorGroup = Get-PnPGroup -Identity $ascVisitorGroupName -ErrorAction SilentlyContinue   
        if($ascVisitorGroup -eq $null) {
            Write-Host "Group '$($ascVisitorGroupName)' doesn't exist. Creating..." -ForegroundColor Green
            $ascVisitorGroup = New-PnPGroup -Title $ascVisitorGroupName -Owner $ascOwnerGroup.Title
        }
        Write-Host "Setting group $($ascVisitorGroupName) as associated visitors group..." -ForegroundColor Green
        Set-PnPGroup -Identity $ascVisitorGroup.Id -SetAssociatedGroup Visitors
        Write-Host "Granting the group $($ascVisitorGroupName) read access to the web..." -ForegroundColor Green
        Set-PnPWebPermission -Group $ascVisitorGroup.Id -AddRole "Read" -ErrorAction SilentlyContinue
        Set-PnPWebPermission -Group $ascVisitorGroup.Id -AddRole "Lese" -ErrorAction SilentlyContinue
        Write-Host ""
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

# Merge hash tables
function Merge-Hashtables {
    $Output = @{}
    ForEach ($Hashtable in ($Input + $Args)) {
        If ($Hashtable -is [Hashtable]) {
            ForEach ($Key in $Hashtable.Keys) {$Output.$Key = $Hashtable.$Key}
        }
    }
    $Output
}

# Apply tepmplate
function Apply-Template([string]$Template, [switch]$Localized, [OfficeDevPnP.Core.Framework.Provisioning.Model.Handlers]$Handlers = "All", [OfficeDevPnP.Core.Framework.Provisioning.Model.Handlers]$ExcludeHandlers, [HashTable]$Parameters = @{}) {    
    $Language = Get-WebLanguage -ctx (Get-PnPContext)    
    if ($Localized.IsPresent) {
        $Template = "$($Template)-$($Language)"
    }
    $MergedParameters = (@{"AssetsSiteUrl" = $AssetsUrlParam; "DataSourceSiteUrl" = $DataSourceUrlParam;},$Parameters | Merge-Hashtables)
    if ($ExcludeHandlers -ne $null) {
        Apply-PnPProvisioningTemplate ".\templates\$($Template).pnp" -Parameters $MergedParameters -ExcludeHandlers $ExcludeHandlers
    } else {
        Apply-PnPProvisioningTemplate ".\templates\$($Template).pnp" -Parameters $MergedParameters -Handlers $Handlers
    }
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
    if($VersionString  -like "*.*.*#*") {
        $vs = $VersionString.Split("#")[0]
        return [Version]($vs)
    }
    if($VersionString  -like "*.*.*.*") {
        $vs = $VersionString.Split(".")[0..2] -join "."
        return [Version]($vs)
    }
    if($VersionString  -like "*.*.*") {
        return [Version]($VersionString)
    }
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