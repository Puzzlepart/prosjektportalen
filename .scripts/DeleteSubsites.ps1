Param(
    [Parameter(Mandatory = $true)]
    [string]$Url,
    [Parameter(Mandatory = $false)]
    [string]$GenericCredential,
    [Parameter(Mandatory = $false)]
    [switch]$Confirm
)

Connect-PnPOnline $Url -Credentials $GenericCredential

$SubWebs = Get-PnPSubWebs

foreach($Web in $SubWebs) {
    if($Confirm) {
        $confirmation = Read-Host "Do you want to delete subweb '$($Web.Title)' (y/n)?"
        if ($confirmation.ToLower() -eq 'y') {
            $Web.DeleteObject();
            Execute-PnPQuery
        }
    } else {
        $Web.DeleteObject();
        Execute-PnPQuery
    }
}