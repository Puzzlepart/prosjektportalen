Param(
    [Parameter(Mandatory = $true)]
    [string]$UrlToWeb,
    [Parameter(Mandatory = $false, HelpMessage = "Use current credentials?")]
    [switch]$CurrentCredentials,
    [Parameter(Mandatory = $false, HelpMessage = "Use Web Login?")]
    [switch]$UseWebLogin,
    [Parameter(Mandatory = $false, HelpMessage = "Stored credential from Windows Credential Manager")]
    [string]$GenericCredential
)

. ./SharedFunctions.ps1

function Set-BenefitManagementLists($ProjectWeb, $Language) {
    $MeasurementIndicatorsListName = [uri]::UnescapeDataString("M%C3%A5leindikatorer")
    $FollowUpListName = [uri]::UnescapeDataString("Gevinstoppf%C3%B8lging")
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
    Write-Host "`tVerifying $MeasurementIndicatorsListName list"
    $MeasurementIndicatorsList = Get-PnPList -Identity $MeasurementIndicatorsListName -Web $ProjectWeb
    if ($null -eq $MeasurementIndicatorsList) {
        New-PnPList -Title $MeasurementIndicatorsListName -Template GenericList -EnableVersioning -Web $ProjectWeb -OnQuickLaunch:$false
        $MeasurementIndicatorsList = Get-PnPList -Identity $MeasurementIndicatorsListName -Web $ProjectWeb  
    }

    $FollowUpList = Get-PnPList -Identity $FollowUpListName -Web $ProjectWeb
    $BenefitsList = Get-PnPList -Identity $BenefitsListName -Web $ProjectWeb
    
    if ($null -ne $MeasurementIndicatorsList -and $null -ne $FollowUpList -and $null -ne $BenefitsList) {        
        $ItemContentType = Get-PnPContentType -Identity "0x01" -InSiteHierarchy -Web $ProjectWeb
        $MeasurementIndicatorsContentType = Get-PnPContentType -Identity "0x0100FF4E12223AF44F519AF40C441D05DED0" -InSiteHierarchy -Web $ProjectWeb
        $MeasurementIndicatorsListContentType = Get-PnPContentType -Identity $MeasurementIndicatorsContentType.Name -List $MeasurementIndicatorsList -Web $ProjectWeb
        
        if ($MeasurementIndicatorsListContentType -eq $null) {
            Write-Host "`t`tConfiguring content types"
            Add-PnPContentTypeToList -List $MeasurementIndicatorsList -ContentType $MeasurementIndicatorsContentType -DefaultContentType -Web $ProjectWeb
            Remove-PnPContentTypeFromList -List $MeasurementIndicatorsList -ContentType $ItemContentType -Web $ProjectWeb
        }

        $GtGainLookup = Get-PnPField -List $MeasurementIndicatorsList -Identity "GtGainLookup" -ErrorAction SilentlyContinue
        $GtGainLookupId = Get-PnPField -List $MeasurementIndicatorsList -Identity "GtGainLookup_ID" -ErrorAction SilentlyContinue
        if ($GtGainLookup -eq $null -and $GtGainLookup -eq $null) {
            Write-Host "`t`tAdding lookup fields"
            Add-PnPFieldFromXml -List $MeasurementIndicatorsList -Web $ProjectWeb -FieldXml "<Field Type=`"Lookup`" DisplayName=`"$GainLookupDisplayName`" List=`"{$($BenefitsList.Id.Guid)}`" ShowField=`"Title`" ID=`"{74dca594-ff7a-42e3-9e83-58cd692bcc98}`" StaticName=`"GtGainLookup`" Name=`"GtGainLookup`"  />"
            Add-PnPFieldFromXml -List $MeasurementIndicatorsList -Web $ProjectWeb -FieldXml "<Field Type=`"Lookup`" DisplayName=`"$($GainLookupDisplayName):ID`" List=`"{$($BenefitsList.Id.Guid)}`" ShowField=`"ID`" FieldRef=`"74dca594-ff7a-42e3-9e83-58cd692bcc98`" ReadOnly=`"TRUE`" UnlimitedLengthInDocumentLibrary=`"FALSE`" ID=`"{d52b5544-acd1-4c14-96bc-017045c8de68}`" ShowInDisplayForm=`"FALSE`" StaticName=`"GtGainLookup_ID`" Name=`"GtGainLookup_ID`" />"
        }

        Write-Host "`t`tUpdating default view"    
        $ViewFields = @("GtGainLookup", "LinkTitle", "GtStartValue", "GtDesiredValue", "GtMeasurementUnit")
        $DefaultView = $MeasurementIndicatorsList.DefaultView
        $DefaultView.ViewFields.RemoveAll()
        $ViewFields | % { $DefaultView.ViewFields.Add($_)}        
        $DefaultView.Update()
        $DefaultView.Context.ExecuteQuery()
        
        Write-Host "`t`tUpdating list settings"    
        $MeasurementIndicatorsList.ContentTypesEnabled = $false
        $MeasurementIndicatorsList.OnQuickLaunch = $true
        $MeasurementIndicatorsList.Update()
        Invoke-PnPQuery
        
        Write-Host "`tAdjusting $FollowUpListName list"
    
        $DesiredValueField = Get-PnPField -Identity "GtDesiredValue" -InSiteHierarchy
        $GtMeasureIndicatorLookup = Get-PnPField -List $FollowUpList -Identity "GtMeasureIndicatorLookup" -ErrorAction SilentlyContinue
        $GtMeasureIndicatorLookup_ID = Get-PnPField -List $FollowUpList -Identity "GtMeasureIndicatorLookup_ID" -ErrorAction SilentlyContinue
        $GtMeasureIndicatorLookup_GtDesiredValue = Get-PnPField -List $FollowUpList -Identity "GtMeasureIndicatorLookup_GtDesiredValue" -ErrorAction SilentlyContinue
        if ($GtMeasureIndicatorLookup -eq $null -and $GtMeasureIndicatorLookup_ID -eq $null -and $GtMeasureIndicatorLookup_GtDesiredValue -eq $null -and $DesiredValueField -ne $null) {
            Write-Host "`t`tAdding lookup fields"
            Add-PnPFieldFromXml -List $FollowUpList -Web $ProjectWeb -FieldXml "<Field Type=`"Lookup`" DisplayName=`"$MeasureIndicatorLookupDisplayName`" List=`"{$($MeasurementIndicatorsList.Id.Guid)}`" ShowField=`"Title`" ID=`"{26c0f80a-5c65-45a9-b362-4cd2749bd02f}`" StaticName=`"GtMeasureIndicatorLookup`" Name=`"GtMeasureIndicatorLookup`"  />"
            Add-PnPFieldFromXml -List $FollowUpList -Web $ProjectWeb -FieldXml "<Field Type=`"Lookup`" DisplayName=`"$($MeasureIndicatorLookupDisplayName):ID`" List=`"{$($MeasurementIndicatorsList.Id.Guid)}`" ShowField=`"ID`" FieldRef=`"26c0f80a-5c65-45a9-b362-4cd2749bd02f`" ReadOnly=`"TRUE`" UnlimitedLengthInDocumentLibrary=`"FALSE`" ID=`"{92fad9e3-1410-4cbb-bb61-594a5e61e988}`" ShowInDisplayForm=`"FALSE`" StaticName=`"GtMeasureIndicatorLookup_ID`" Name=`"GtMeasureIndicatorLookup_ID`" />"
            Add-PnPFieldFromXml -List $FollowUpList -Web $ProjectWeb -FieldXml "<Field Type=`"Lookup`" DisplayName=`"$($MeasureIndicatorLookupDisplayName):$($DesiredValueField.Title)`" List=`"{$($MeasurementIndicatorsList.Id.Guid)}`" ShowField=`"GtDesiredValue`" FieldRef=`"26c0f80a-5c65-45a9-b362-4cd2749bd02f`" ReadOnly=`"TRUE`" UnlimitedLengthInDocumentLibrary=`"FALSE`" ID=`"{a5b7b23e-5cfd-4168-9123-f1ce10775792}`" ShowInDisplayForm=`"FALSE`" StaticName=`"GtMeasureIndicatorLookup_GtDesiredValue`" Name=`"GtMeasureIndicatorLookup_GtDesiredValue`" />"
        }
    
        Write-Host "`t`tRemoving lookup fields"
        Remove-PnPField -Identity GtGainLookup_ID -List $FollowUpList -Web $ProjectWeb -Force -ErrorAction SilentlyContinue
        Remove-PnPField -Identity GtGainLookup -List $FollowUpList -Web $ProjectWeb -Force -ErrorAction SilentlyContinue
    
        Write-Host "`t`tUpdating default view"
    
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
    
        Write-Host "`t`tUpdating flat view"
    
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
    } 
    else {
        Write-Host "`tBenefit management lists not found - configuration skipped" -ForegroundColor Yellow
    }
    
    Write-Host "`t`tHiding old measurements columns from $BenefitsListName"
    $BenefitsList = Get-PnPList -Identity $BenefitsListName -Web $ProjectWeb
    if ($null -ne $BenefitsList) {
        Write-Host "`t`tUpdating list settings"    
        $BenefitsList.ContentTypesEnabled = $false
        $BenefitsList.OnQuickLaunch = $true
        $BenefitsList.Update()
        $BenefitsList.Context.ExecuteQuery()

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

if ($CurrentCredentials.IsPresent) {
    Connect-PnPOnline -Url $UrlToWeb -CurrentCredentials
} elseif ($UseWebLogin.IsPresent) {
    Connect-PnPOnline -Url $UrlToWeb -UseWebLogin
} elseif ($GenericCredential -ne $null) {
    Connect-PnPOnline -Url $UrlToWeb -Credentials $GenericCredential
} else {
    Connect-PnPOnline -Url $UrlToWeb
}

$ProjectWeb = Get-PnPWeb
$Language = Get-WebLanguage -ctx (Get-PnPContext)
Set-BenefitManagementLists -ProjectWeb $ProjectWeb -Language $Language
