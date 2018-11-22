Param(
    [string]$SSAName = "Search Service Application"
)

if((Get-PSSnapin -Name Microsoft.SharePoint.PowerShell -ErrorAction SilentlyContinue) -eq $null){
    Add-PSSnapin Microsoft.SharePoint.PowerShell
}

Function Map-ManagedProperty ([string]$ManagedPropertyName, [string]$CrawledPropertyName, $SSA)
{
    $MetadataCategory = Get-SPEnterpriseSearchMetadataCategory -SearchApplication $SSA -Identity "SharePoint"
    $CrawledProperty = Get-SPEnterpriseSearchMetadataCrawledProperty -SearchApplication $SSA -Name $CrawledPropertyName -Category $MetadataCategory
    $ManagedProperty = Get-SPEnterpriseSearchMetadataManagedProperty -SearchApplication $SSA -Identity $ManagedPropertyName

    if ($CrawledProperty -ne $null -and $ManagedProperty -ne $null) {
        New-SPEnterpriseSearchMetadataMapping -SearchApplication $SSA -CrawledProperty $CrawledProperty -ManagedProperty $ManagedProperty
    } else {
        Write-Warning "Cannot find a crawled or managed property. Remember that you need to populate a project with project metadata and issue a crawl of the content before running this script"
    }
}

$SSA = Get-SPEnterpriseSearchServiceApplication -Identity $SSAName
if ($SSA -ne $null) {
    Map-ManagedProperty -SSA $SSA -ManagedPropertyName "RefinableString50" -CrawledPropertyName "ows_GtProjectOwner"
    Map-ManagedProperty -SSA $SSA -ManagedPropertyName "RefinableString51" -CrawledPropertyName "ows_GtProjectManager"
    Map-ManagedProperty -SSA $SSA -ManagedPropertyName "RefinableString52" -CrawledPropertyName "ows_GtProjectPhase"
    Map-ManagedProperty -SSA $SSA -ManagedPropertyName "RefinableString53" -CrawledPropertyName "ows_GtProjectServiceArea"
    Map-ManagedProperty -SSA $SSA -ManagedPropertyName "RefinableString54" -CrawledPropertyName "ows_GtProjectType"
    Map-ManagedProperty -SSA $SSA -ManagedPropertyName "RefinableString55" -CrawledPropertyName "ows_GtStatusBudget"
    Map-ManagedProperty -SSA $SSA -ManagedPropertyName "RefinableString56" -CrawledPropertyName "ows_GtStatusRisk"
    Map-ManagedProperty -SSA $SSA -ManagedPropertyName "RefinableString57" -CrawledPropertyName "ows_GtStatusTime"
    Map-ManagedProperty -SSA $SSA -ManagedPropertyName "RefinableString58" -CrawledPropertyName "ows_GtGainLookup_ID"
    Map-ManagedProperty -SSA $SSA -ManagedPropertyName "RefinableString70" -CrawledPropertyName "ows_GtGainsResponsible"
    Map-ManagedProperty -SSA $SSA -ManagedPropertyName "RefinableString71" -CrawledPropertyName "ows_GtResourceUser"
    Map-ManagedProperty -SSA $SSA -ManagedPropertyName "RefinableString72" -CrawledPropertyName "ows_GtResourceRole"
    Map-ManagedProperty -SSA $SSA -ManagedPropertyName "RefinableDate05" -CrawledPropertyName "ows_GtStartDate"
    Map-ManagedProperty -SSA $SSA -ManagedPropertyName "RefinableDate06" -CrawledPropertyName "ows_GtEndDate"
} else {
    Write-Error "Could not find Search Service Application with name $SSAName. Aborting."
}

Write-Host "Property mapping completed" -ForegroundColor Green