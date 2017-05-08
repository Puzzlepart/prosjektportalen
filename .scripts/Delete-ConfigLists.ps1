Param(
    [Parameter(Mandatory = $true)]
    [string]$Url,
    [Parameter(Mandatory = $true)]
    [string]$WinCred
)

Connect-PnPOnline $Url -Credentials $WinCred

$lists = @("ListContentConfig", "DynamicPortfolioFields", "DynamicPortfolioViews", "DynamicPortfolioRefiners", "ProjectConfig");

foreach ($list in $lists) {
    Write-Host "Removing list $list"
	Remove-PnPList -Identity $list -Force
}