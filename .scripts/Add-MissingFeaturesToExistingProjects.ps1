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
    $TitleName = "Beskrivelse av arbeidsoppgaver"
    if($Language -eq 1033) {
        $ListName = "Resource Allocation"
        $TitleName = "Work description"
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

        $title = Get-PnPField -List $ResourceAllocation -Identity "Title" -Web $ProjectWeb
        if ($null -ne $title) {
            $title.Required = $false
            $title.Hidden = $false
            $title.Title = $TitleName
            $title.Update()
        }
        $ViewFields = @("LinkTitle", "GtResourceUser", "GtResourceRole", "GtStartDate", "GtEndDate", "GtResourceLoad", "GtResourceAbsenceComment", "Modified")
        $DefaultView = $ResourceAllocation.DefaultView
        $DefaultView.ViewFields.RemoveAll()
        $ViewFields | % { $DefaultView.ViewFields.Add($_)}        
        $DefaultView.Update()
        $DefaultView.Context.ExecuteQuery()
        $ResourceAllocation.ContentTypesEnabled = $false
        $ResourceAllocation.OnQuickLaunch = $true
        $ResourceAllocation.Update()
        Invoke-PnPQuery

        $ResourceAllocationLeftNav = Get-PnPNavigationNode -Location QuickLaunch -Web $ProjectWeb | ?{$_.Title -eq $ListName} 
        if ($null -eq $ResourceAllocationLeftNav) {
            Add-PnPNavigationNode -Location QuickLaunch -Title $ListName -Url "Lists/$ListName" -Web $ProjectWeb
        }
        Write-Host "`tResource allocation list created and configured" -ForegroundColor Green
	} else {
        $ResourceAllocationLeftNav = Get-PnPNavigationNode -Location QuickLaunch -Web $ProjectWeb | ?{$_.Title -eq $ListName} 
        if ($null -eq $ResourceAllocationLeftNav) {
            Add-PnPNavigationNode -Location QuickLaunch -Title $ListName -Url "Lists/$ListName" -Web $ProjectWeb
        }
        $title = Get-PnPField -List $ResourceAllocation -Identity "Title" -Web $ProjectWeb
        if ($null -ne $title) {
            $title.Required = $false
            $title.Hidden = $false
            $title.Title = $TitleName
            $title.Update()

            Invoke-PnPQuery
        }
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
        Get-PnPNavigationNode -Location QuickLaunch -Web $ProjectWeb | ?{$_.Title -eq "Siste" -or $_.Title -eq "Recent"} | Remove-PnPNavigationNode -Force -Web $ProjectWeb
        Write-Host "`tProject properties list created and configured" -ForegroundColor Green
	} else {
        Get-PnPNavigationNode -Location QuickLaunch -Web $ProjectWeb | ?{$_.Title -eq "Siste" -or $_.Title -eq "Recent" -or $_.Title -eq "Properties"} | Remove-PnPNavigationNode -Force -Web $ProjectWeb
        Write-Host "`tProject properties list already exists" -ForegroundColor Green
    }
}

function Add-MeasurementIndicatorsList($ProjectWeb, $Language) {
    $MeasurementIndicatorsListName = [uri]::UnescapeDataString("M%C3%A5leindikatorer")
    $FollowUpListName = [uri]::UnescapeDataString("Gevinstsoppf%C3%B8lging")
    $NewFollowUpListName = [uri]::UnescapeDataString("Gevinstoppf%C3%B8lging")
    $BenefitsListName = "Gevinstanalyse og gevinstrealiseringsplan"
    $GainLookupDisplayName = "Gevinst"
    $MeasureIndicatorLookupDisplayName = [uri]::UnescapeDataString("M%C3%A5leindikator")
    $GroupedBenefitTypeViewName = "Pr gevinsttype"
    $FlatViewName = "Flat visning"
    if ($Language -eq 1033) {
        $MeasurementIndicatorsListName = "Measurement Indicators"
        $FollowUpListName = "Benefits Followup"
        $BenefitsListName = "Benefits Analysis"
        $GainLookupDisplayName = "Benefit"
        $MeasureIndicatorLookupDisplayName = "Measurement Indicator"
        $GroupedBenefitTypeViewName = "Grouped by Benefit Type"
        $FlatViewName = "Flat"
    }
    Write-Host "`tVerifying $MeasurementIndicatorsListName list" -ForegroundColor Gray
    $MeasurementIndicatorsList = Get-PnPList -Identity $MeasurementIndicatorsListName -Web $ProjectWeb
    if ($null -eq $MeasurementIndicatorsList) {
        #region Creating and configuring measurement indicators list
        New-PnPList -Title $MeasurementIndicatorsListName -Template GenericList -EnableVersioning -Web $ProjectWeb -OnQuickLaunch:$false
        $MeasurementIndicatorsList = Get-PnPList -Identity $MeasurementIndicatorsListName -Web $ProjectWeb  
        $FollowUpList = Get-PnPList -Identity $FollowUpListName -Web $ProjectWeb
        $BenefitsList = Get-PnPList -Identity $BenefitsListName -Web $ProjectWeb
        
        if ($null -ne $MeasurementIndicatorsList -and $null -ne $FollowUpList -and $null -ne $BenefitsList) {
            Write-Host "`t`tConfiguring content types" -ForegroundColor Gray
            
            $ItemContentType = Get-PnPContentType -Identity "0x01" -InSiteHierarchy -Web $ProjectWeb
            $MeasurementIndicatorsContentType = Get-PnPContentType -Identity "0x0100FF4E12223AF44F519AF40C441D05DED0" -InSiteHierarchy -Web $ProjectWeb
            
            Add-PnPContentTypeToList -List $MeasurementIndicatorsList -ContentType $MeasurementIndicatorsContentType -DefaultContentType -Web $ProjectWeb
            Remove-PnPContentTypeFromList -List $MeasurementIndicatorsList -ContentType $ItemContentType -Web $ProjectWeb
        
            Write-Host "`t`tAdding lookup fields" -ForegroundColor Gray
        
            Add-PnPFieldFromXml -List $MeasurementIndicatorsList -Web $ProjectWeb -FieldXml "<Field Type=`"Lookup`" DisplayName=`"$GainLookupDisplayName`" List=`"{$($BenefitsList.Id.Guid)}`" ShowField=`"Title`" ID=`"{74dca594-ff7a-42e3-9e83-58cd692bcc98}`" StaticName=`"GtGainLookup`" Name=`"GtGainLookup`"  />" 2>&1>$null
            Add-PnPFieldFromXml -List $MeasurementIndicatorsList -Web $ProjectWeb -FieldXml "<Field Type=`"Lookup`" DisplayName=`"$($GainLookupDisplayName):ID`" List=`"{$($BenefitsList.Id.Guid)}`" ShowField=`"ID`" FieldRef=`"74dca594-ff7a-42e3-9e83-58cd692bcc98`" ReadOnly=`"TRUE`" UnlimitedLengthInDocumentLibrary=`"FALSE`" ID=`"{d52b5544-acd1-4c14-96bc-017045c8de68}`" ShowInDisplayForm=`"FALSE`" StaticName=`"GtGainLookup_ID`" Name=`"GtGainLookup_ID`" />" 2>&1>$null
        
            Write-Host "`t`tUpdating default view" -ForegroundColor Gray
        
            $ViewFields = @("GtGainLookup", "LinkTitle", "GtStartValue", "GtDesiredValue", "GtMeasurementUnit")
            $DefaultView = $MeasurementIndicatorsList.DefaultView
            $DefaultView.ViewFields.RemoveAll()
            $ViewFields | % { $DefaultView.ViewFields.Add($_)}        
            $DefaultView.Update()
            $DefaultView.Context.ExecuteQuery()
            
            Write-Host "`t`tUpdating list settings" -ForegroundColor Gray
        
            $MeasurementIndicatorsList.ContentTypesEnabled = $false
            $MeasurementIndicatorsList.OnQuickLaunch = $true
            $MeasurementIndicatorsList.Update()
            Invoke-PnPQuery
        
            
            Write-Host "`t`tAdding link to QuickLaunch" -ForegroundColor Gray
        
            Get-PnPNavigationNode -Location QuickLaunch -Web $ProjectWeb | ? {$_.Title -eq "Siste" -or $_.Title -eq "Recent"} | Remove-PnPNavigationNode -Force -Web $ProjectWeb     
        
            $MeasurementIndicatorsLeftNav = Get-PnPNavigationNode -Location QuickLaunch -Web $ProjectWeb | ? {$_.Title -eq $MeasurementIndicatorsListName} 
            if ($null -eq $MeasurementIndicatorsLeftNav) {
                Add-PnPNavigationNode -Location QuickLaunch -Title $MeasurementIndicatorsListName -Url $MeasurementIndicatorsList.RootFolder.ServerRelativeUrl -Web $ProjectWeb
            }
            Write-Host "`tList $MeasurementIndicatorsListName created and configured" -ForegroundColor Green
            #endregion
        
            #region Copying measurement indicators
            Write-Host "`tCreating items in $MeasurementIndicatorsListName list" -ForegroundColor Gray
            $MeasurementIndicatorsListItemsMap = @{}
            $(Get-PnPListItem -List $BenefitsList -Web $ProjectWeb) | Where-Object {$_["GtMeasureIndicator"] -ne $null} | ForEach-Object {
                $newItem = Add-PnPListItem -List $MeasurementIndicatorsList -Web $ProjectWeb -Values @{
                    Title             = $_["GtMeasureIndicator"];
                    GtGainLookup      = "$($_["ID"])";
                    GtStartValue      = "$($_["GtStartValue"])";
                    GtDesiredValue    = "$($_["GtDesiredValue"])";
                    GtMeasurementUnit = "$($_["GtMeasurementUnit"])";
                }
                $MeasurementIndicatorsListItemsMap[$_["ID"]] = $newItem["ID"]
            }    
            Write-Host "`tDone creating items in list $MeasurementIndicatorsListName" -ForegroundColor Green
            #endregion
        
            #region Adjusting follow up list
            Write-Host "`tAdjusting $FollowUpListName list" -ForegroundColor Gray
        
            Write-Host "`t`tAdding lookup fields" -ForegroundColor Gray

            $DesiredValueField = Get-PnPField -Identity "GtDesiredValue"
        
            Add-PnPFieldFromXml -List $FollowUpList -Web $ProjectWeb -FieldXml "<Field Type=`"Lookup`" DisplayName=`"$MeasureIndicatorLookupDisplayName`" List=`"{$($MeasurementIndicatorsList.Id.Guid)}`" ShowField=`"Title`" ID=`"{26c0f80a-5c65-45a9-b362-4cd2749bd02f}`" StaticName=`"GtMeasureIndicatorLookup`" Name=`"GtMeasureIndicatorLookup`"  />" 2>&1>$null
            Add-PnPFieldFromXml -List $FollowUpList -Web $ProjectWeb -FieldXml "<Field Type=`"Lookup`" DisplayName=`"$($MeasureIndicatorLookupDisplayName):ID`" List=`"{$($MeasurementIndicatorsList.Id.Guid)}`" ShowField=`"ID`" FieldRef=`"26c0f80a-5c65-45a9-b362-4cd2749bd02f`" ReadOnly=`"TRUE`" UnlimitedLengthInDocumentLibrary=`"FALSE`" ID=`"{92fad9e3-1410-4cbb-bb61-594a5e61e988}`" ShowInDisplayForm=`"FALSE`" StaticName=`"GtMeasureIndicatorLookup_ID`" Name=`"GtMeasureIndicatorLookup_ID`" />" 2>&1>$null
            Add-PnPFieldFromXml -List $FollowUpList -Web $ProjectWeb -FieldXml "<Field Type=`"Lookup`" DisplayName=`"$($MeasureIndicatorLookupDisplayName):$($DesiredValueField.Title)`" List=`"{$($MeasurementIndicatorsList.Id.Guid)}`" ShowField=`"GtDesiredValue`" FieldRef=`"26c0f80a-5c65-45a9-b362-4cd2749bd02f`" ReadOnly=`"TRUE`" UnlimitedLengthInDocumentLibrary=`"FALSE`" ID=`"{a5b7b23e-5cfd-4168-9123-f1ce10775792}`" ShowInDisplayForm=`"FALSE`" StaticName=`"GtMeasureIndicatorLookup_GtDesiredValue`" Name=`"GtMeasureIndicatorLookup_GtDesiredValue`" />" 2>&1>$null
        
            Write-Host "`t`tUpdating item lookups" -ForegroundColor Gray
        
            @(Get-PnPListItem -List $FollowUpList -Web $ProjectWeb) | Where-Object { $null -ne $_["GtGainLookup"] } | ForEach-Object {
                $Id = $_["ID"]
                $GainId = $_["GtGainLookup"].LookupId
                $IndicatorId = $MeasurementIndicatorsListItemsMap[$GainId]
                Set-PnPListItem -List $FollowUpList -Identity $Id -Web $ProjectWeb -Values @{GtMeasureIndicatorLookup = "$IndicatorId"} 2>&1>$null
            }
        
            Write-Host "`t`tRemoving lookup fields" -ForegroundColor Gray
        
            Remove-PnPField -Identity GtGainLookup_ID -List $FollowUpList -Web $ProjectWeb -Force 2>&1>$null
            Remove-PnPField -Identity GtGainLookup -List $FollowUpList -Web $ProjectWeb -Force 2>&1>$null
        
            Write-Host "`t`tUpdating default view" -ForegroundColor Gray
        
            $ViewFields = @("GtMeasureIndicatorLookup", "GtMeasureIndicatorLookup_GtDesiredValue", "GtMeasurementDate", "GtMeasurementValue", "GtMeasurementComment")
            $DefaultView = $FollowUpList.DefaultView
            $DefaultView.ViewFields.RemoveAll()
            $ViewFields | % { $DefaultView.ViewFields.Add($_)}     
            $DefaultView.ViewQuery = @"
                                        <GroupBy Collapse="TRUE" GroupLimit="30">
                                            <FieldRef Name="GtMeasureIndicatorLookup" />
                                        </GroupBy>
                                        <OrderBy>
                                            <FieldRef Name="GtMeasurementDate" Ascending="FALSE" />
                                        </OrderBy>
"@
            $DefaultView.Update()
            $DefaultView.Context.ExecuteQuery()
            
            
            $FollowUpList.Context.Load($FollowUpList.Views)
            $FollowUpList.Context.ExecuteQuery()
            $FlatView = $FollowUpList.Views | Where-Object { $_.Title -eq $FlatViewName }
        
            Write-Host "`t`tUpdating flat view" -ForegroundColor Gray
        
            $FlatView.ViewFields.RemoveAll()
            $ViewFields | % { $FlatView.ViewFields.Add($_)}      
            $FlatView.ViewQuery = @"
                                        <OrderBy>
                                            <FieldRef Name="GtMeasureIndicatorLookup" />
                                            <FieldRef Name="GtMeasurementDate" Ascending="FALSE" />
                                        </OrderBy>
"@  
            $FlatView.Update()
            $FlatView.Context.ExecuteQuery()

            if($Language -eq 1044) {
                $FollowUpList = Get-PnPList -Identity $FollowUpListName -Web $ProjectWeb 
                if ($null -ne $FollowUpList) {
                    Write-Host "`t`tRenaming list to $NewFollowUpListName" -ForegroundColor Gray
                    Set-PnPList -Identity $FollowUpList -Web $ProjectWeb -Title $NewFollowUpListName
                    Write-Host "`t`tUpdating link in QuickLaunch" -ForegroundColor Gray
                    $NavigationNode = Get-PnPNavigationNode -Location QuickLaunch -Web $ProjectWeb | ? {$_.Title -eq $FollowUpListName }
                    if ($null -ne $NavigationNode) {
                        $NavigationNode.Title = $NewFollowUpListName
                        $NavigationNode.Update()
                        $NavigationNode.Context.ExecuteQuery()
                    }
                }
            }
        
            Write-Host "`tList $FollowUpListName adjusted" -ForegroundColor Green
            #endregion
        
            #region Adjusting benefits list
            Write-Host "`tAdjusting $BenefitsListName" -ForegroundColor Gray

            Write-Host "`t`tUpdating default view" -ForegroundColor Gray
        
            $ViewFields = @("LinkTitle", "GtChangeLookup", "GtGainsType", "GtGainsTurnover", "GtGainsResponsible", "GtRealizationTime")
            $DefaultView = $BenefitsList.DefaultView
            $DefaultView.ViewFields.RemoveAll()
            $ViewFields | % { $DefaultView.ViewFields.Add($_)}   
            $DefaultView.Update()
            $DefaultView.Context.ExecuteQuery()        
            
            $BenefitsList.Context.Load($BenefitsList.Views)
            $BenefitsList.Context.ExecuteQuery()
            $GroupedView = $BenefitsList.Views | Where-Object { $_.Title -eq $GroupedBenefitTypeViewName }
        
            Write-Host "`t`tUpdating grouped view" -ForegroundColor Gray
        
            $ViewFields = @("LinkTitle", "GtChangeLookup", "GtGainsTurnover", "GtGainsResponsible", "GtRealizationTime")
            $GroupedView.ViewFields.RemoveAll()
            $ViewFields | % { $GroupedView.ViewFields.Add($_)}     
            $GroupedView.Update()
            $GroupedView.Context.ExecuteQuery()
			
            Write-Host "`tList $BenefitsListName adjusted" -ForegroundColor Green
        } 
        else {
            Write-Host "`tBenefit management lists not found - configuration skipped" -ForegroundColor Yellow
        }
        #endregion
    }
    else {
        Get-PnPNavigationNode -Location QuickLaunch -Web $ProjectWeb | ? {$_.Title -eq "Siste" -or $_.Title -eq "Recent" -or $_.Title -eq "Properties"} | Remove-PnPNavigationNode -Force -Web $ProjectWeb
        Write-Host "`tMeasurement Indicators list already exists" -ForegroundColor Green
    }
    
    Write-Host "`tHiding old measurements columns from $BenefitsListName" -ForegroundColor Gray
    $BenefitsList = Get-PnPList -Identity $BenefitsListName -Web $ProjectWeb
    if ($null -ne $BenefitsList) {
        $GtStartValue = Get-PnPField -List $BenefitsList -Identity "GtStartValue" -Web $ProjectWeb
        $GtStartValue.Hidden = $true
        $GtStartValue.Update()
        $GtStartValue.Context.ExecuteQuery()
        
        $GtDesiredValue = Get-PnPField -List $BenefitsList -Identity "GtDesiredValue" -Web $ProjectWeb
        $GtDesiredValue.Hidden = $true
        $GtDesiredValue.Update()
        $GtDesiredValue.Context.ExecuteQuery()
        
        $GtMeasurementUnit = Get-PnPField -List $BenefitsList -Identity "GtMeasurementUnit" -Web $ProjectWeb
        $GtMeasurementUnit.Hidden = $true
        $GtMeasurementUnit.Update()
        $GtMeasurementUnit.Context.ExecuteQuery()
        
        $GtMeasurementUnit = Get-PnPField -List $BenefitsList -Identity "GtMeasureIndicator" -Web $ProjectWeb
        $GtMeasurementUnit.Hidden = $true
        $GtMeasurementUnit.Update()
        $GtMeasurementUnit.Context.ExecuteQuery()
    }
}

function Set-ProjectPropertiesFromProjectPage($ProjectWeb, $Language) {
    $TargetListName = "Properties"
    
    Write-Host "`tSynchronizing project properties list from old architecture" -ForegroundColor Gray
    $ProjectPage = Get-PnPListItem -List "SitePages" -Id 3 -Web $ProjectWeb
    $ProjectItem = Get-PnPListItem -List $TargetListName -Id 1 -Web $ProjectWeb -ErrorAction SilentlyContinue

    # Synchronize project properties if old Content Type
    if ($ProjectPage -and $ProjectPage.FieldValues.ContentTypeId.StringValue.ToLower().StartsWith("0x010109010058561f86d956412b9dd7957bbcd67aae01")) {
		if ($ProjectItem -eq $null) {
			$ProjectItem = Add-PnPListItem -List $TargetListName -Web $ProjectWeb
		}
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

    if ($null -ne $ProjectWeb -and $null -ne $ProjectTitle -and $null -ne $ProjectUrl -and $null -ne $Language) {
        Write-Host  "Processing subweb $ProjectTitle with url $ProjectUrl"
        
        Add-ResourceAllocationFeatures -ProjectWeb $ProjectWeb -Language $Language
        Add-ProjectPropertiesList -ProjectWeb $ProjectWeb -Language $Language
        
        if ($PersistProjectProperties.IsPresent) {
            Set-ProjectPropertiesFromProjectPage -ProjectWeb $ProjectWeb -Language $Language
        }
        
        Add-MeasurementIndicatorsList -ProjectWeb $ProjectWeb -Language $Language
    }
}
Disconnect-PnPOnline
