Param(
    [Parameter(Mandatory = $true)]
    [string]$Url,
    [Parameter(Mandatory = $true)]
    [string]$Prefix,
    [Parameter(Mandatory = $true)]
    [int]$Count,
    [Parameter(Mandatory = $false)]
    [int]$Lcid = 1044
)

Connect-PnPOnline $Url.Replace(".sharepoint", "-admin.sharepoint")

for ($i = 1; $i -le $Count; $i++) {
    $index = ("{0:D2}" -f $i)
    New-PnPTenantSite -Title Prosjektportalen -Url "$($Url)/sites/$($Prefix)-$($index)" -Owner olemp@olemp.onmicrosoft.com -Lcid $Lcid -Template "STS#0" -TimeZone 13 -StorageQuota 10
}
