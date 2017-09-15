Param(
    [Parameter(Mandatory = $true)]
    [string]$Url,
    [Parameter(Mandatory = $true)]
    [string]$Prefix,
    [Parameter(Mandatory = $true)]
    [int]$Count,
    [Parameter(Mandatory = $false)]
    [string]$Title = "Prosjektportalen",
    [Parameter(Mandatory = $false)]
    [int]$Lcid = 1044,
    [Parameter(Mandatory = $false)]
    [string]$GenericCredential
)

if ($GenericCredential -eq $null -or $GenericCredential -eq "") {
    [System.Management.Automation.PSCredential]$Credentials = Get-Credential -Message "Login to the admin tenant"
} else {
    $Credentials = Get-PnPStoredCredential -Name $GenericCredential -Type PSCredential
}

Connect-PnPOnline $Url.Replace(".sharepoint", "-admin.sharepoint") -Credentials $Credentials

for ($i = 1; $i -le $Count; $i++) {
    $index = ("{0:D2}" -f $i)
    New-PnPTenantSite -Title $Title -Url "$($Url)/sites/$($Prefix)-$($index)" -Owner $Credentials.UserName -Lcid $Lcid -Template "STS#0" -TimeZone 13 -StorageQuota 10
}