Param(
    [Parameter(Mandatory = $true)]
    [string]$Url,
    [Parameter(Mandatory = $false, HelpMessage = "Use current credentials?")]
    [switch]$CurrentCredentials,
    [Parameter(Mandatory = $false, HelpMessage = "Use Web Login?")]
    [switch]$UseWebLogin,
    [Parameter(Mandatory = $false, HelpMessage = "Persist project properties from old architecture to new")]
    [switch]$PersistProjectProperties,
    [Parameter(Mandatory = $false, HelpMessage = "Stored credential from Windows Credential Manager")]
    [string]$GenericCredential
)

. ./SharedFunctions.ps1

if ($CurrentCredentials.IsPresent) {
    Connect-PnPOnline -Url $Url -CurrentCredentials
} elseif ($UseWebLogin.IsPresent) {
    Connect-PnPOnline -Url $Url -UseWebLogin
} elseif ($GenericCredential -ne $null) {
    Connect-PnPOnline -Url $Url -Credentials $GenericCredential
} else {
    Connect-PnPOnline -Url $Url
}

function Add-ResourceAllocationFeatures($ProjectWeb, $Language) {
    $ListName = "Ressursallokering"
    if($Language -eq 1033) {
        $ListName = "Resource Allocation"
    }
    Write-Host "`tVerifying resource allocation list" -ForegroundColor Gray
    $ResourceAllocation = Get-PnPList -Identity $ListName -Web $ProjectWeb
    if ($null -eq $ResourceAllocation) {
        New-PnPList -Title $ListName -Template GenericList -EnableVersioning -Web $ProjectWeb
        $ResourceAllocation = Get-PnPList -Identity $ListName -Web $ProjectWeb
            
        $ItemContentType = Get-PnPContentType -Identity "0x01" -InSiteHierarchy -Web $ProjectWeb
        $ResourceAllocationContentType = Get-PnPContentType -Identity "0x010088578E7470CC4AA68D5663464831070209" -InSiteHierarchy -Web $ProjectWeb
        
        Add-PnPContentTypeToList -List $ResourceAllocation -ContentType $ResourceAllocationContentType -DefaultContentType -Web $ProjectWeb
        Remove-PnPContentTypeFromList -List $ResourceAllocation -ContentType $ItemContentType -Web $ProjectWeb

        $ViewFields = @("GtResourceUser", "GtResourceRole", "GtStartDate", "GtEndDate", "GtResourceLoad", "GtResourceAbsenceComment", "Modified")
        $DefaultView = $ResourceAllocation.DefaultView
        $DefaultView.ViewFields.RemoveAll()
        $ViewFields | % { $DefaultView.ViewFields.Add($_)}        
        $DefaultView.Update()
        $DefaultView.Context.ExecuteQuery()
        $ResourceAllocation.ContentTypesEnabled = $false
        $ResourceAllocation.OnQuickLaunch = $true
        $ResourceAllocation.Update()
        Invoke-PnPQuery
        Write-Host "`tResource allocation list created and configured" -ForegroundColor Green
	} else {
        Write-Host "`tResource allocation list already exists" -ForegroundColor Green
    }
}

function Add-ProjectPropertiesList($ProjectWeb, $Language) {
    $ListName = "Properties"

    Write-Host "`tVerifying project properties list" -ForegroundColor Gray
    $PropertiesList = Get-PnPList -Identity $ListName -Web $ProjectWeb
    if ($null -eq $PropertiesList) {
        New-PnPList -Title $ListName -Template GenericList -EnableVersioning -Web $ProjectWeb -OnQuickLaunch:$false
        $PropertiesList = Get-PnPList -Identity $ListName -Web $ProjectWeb
            
        $ItemContentType = Get-PnPContentType -Identity "0x01" -InSiteHierarchy -Web $ProjectWeb
        $ProjectPropertiesContentType = Get-PnPContentType -Identity "0x010088578E7470CC4AA68D5663464831070211" -InSiteHierarchy -Web $ProjectWeb
        
        Add-PnPContentTypeToList -List $PropertiesList -ContentType $ProjectPropertiesContentType -DefaultContentType -Web $ProjectWeb
        Remove-PnPContentTypeFromList -List $PropertiesList -ContentType $ItemContentType -Web $ProjectWeb

        Write-Host "`tProject properties list created and configured" -ForegroundColor Green
	} else {
        Write-Host "`tProject properties list already exists" -ForegroundColor Green
    }
}

function Set-ProjectPropertiesFromProjectPage($ProjectWeb, $Language) {
    $TargetListName = "Properties"
    $SitePagesName = "Områdesider"
    if ($Language -eq 1033) {
        $SitePagesName = "Site Pages"
    }
    
    Write-Host "`tSynchronizing project properties list from old architecture" -ForegroundColor Gray
    $ProjectPage = Get-PnPListItem -List $SitePagesName -Id 3 -Web $ProjectWeb
    $ProjectItem = Get-PnPListItem -List $TargetListName -Id 1 -Web $ProjectWeb -ErrorAction SilentlyContinue

    if ($ProjectItem -eq $null) {
        $ProjectItem = Add-PnPListItem -List $TargetListName -Web $ProjectWeb
    }

    # Synchronize project properties if old Content Type
    if ($ProjectPage.FieldValues.ContentTypeId.StringValue.ToLower().StartsWith("0x010109010058561f86d956412b9dd7957bbcd67aae01")) {
        $FieldsToSync = Get-PnPField -List $TargetListName -Web $ProjectWeb | ? {$_.InternalName.IndexOf("Gt") -eq 0}
        $FieldsToSync | ? {$_.FieldTypeKind -ne "Invalid"} | % {
            $ProjectItem[$_.InternalName] = $ProjectPage[$_.InternalName]
        }
        $ProjectItem.Update()

        $FieldsToSync | ? {$_.FieldTypeKind -eq "Invalid"} | % {
            if ($ProjectPage[$_.InternalName] -ne $null -and $ProjectPage[$_.InternalName].Count -gt 1) {
                $Terms = @{}
                $ProjectPage[$_.InternalName] | % {$Terms.Add($_.TermGuid, $_.Label)}
                Set-PnPTaxonomyFieldValue -ListItem $ProjectItem -InternalFieldName $_.InternalName -Terms $Terms
            } elseif ($ProjectPage[$_.InternalName] -ne $null -and $ProjectPage[$_.InternalName].Count -eq 1) {
                Set-PnPTaxonomyFieldValue -ListItem $ProjectItem -InternalFieldName $_.InternalName -TermId $ProjectPage[$_.InternalName].TermGuid
            }
        }
        $ProjectItem.Update()

        Invoke-PnPQuery
        Write-Host "`tProject properties synchronized" -ForegroundColor Green
    } else {
        Write-Host "`tProject properties not necessary to synchronize - site uses new architecture" -ForegroundColor Green
    }
}

$RootWeb = Get-PnPWeb
$Webs = Get-PnPProperty -ClientObject $RootWeb -Property "Webs"
$Webs | ForEach-Object {
    $ProjectWeb = Get-PnPWeb -Identity $_.Id
    $ProjectUrl = $ProjectWeb.ServerRelativeUrl
    $ProjectTitle = $ProjectWeb.Title

    $Language = Get-WebLanguage -ctx (Get-PnPContext)

    Write-Host  "Processing subweb $ProjectTitle with url $ProjectUrl and language $Language"
    
    Add-ResourceAllocationFeatures -ProjectWeb $ProjectWeb -Language $Language
    Add-ProjectPropertiesList -ProjectWeb $ProjectWeb -Language $Language
    
    if ($PersistProjectProperties.IsPresent) {
        Set-ProjectPropertiesFromProjectPage -ProjectWeb $ProjectWeb -Language $Language
    }
}
Disconnect-PnPOnline