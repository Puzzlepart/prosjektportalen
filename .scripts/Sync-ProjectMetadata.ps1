Param(
    [Parameter(Mandatory = $true)]
    [string]$Url
)

Connect-PnPOnline $Url

$ProjectList = Get-PnPList -Identity "Prosjekter"
$FieldsToSync = Get-PnPField -List "Prosjekter" | ? {$_.InternalName.IndexOf("Gt") -eq 0}

Get-PnPSubWebs | % {
    $ProjectWeb = Get-PnPWeb -Identity $_.Id
    $ProjectPage = Get-PnPListItem -List "Områdesider" -Id 3 -Web $ProjectWeb
    $ProjectWebUniqueId = $ProjectWeb.Id
    $ProjectUrl = $ProjectWeb.ServerRelativeUrl
    $ProjectTitle = $ProjectWeb.Title
    
    $ProjectItem = Get-PnPListItem -List "Prosjekter" -Query "<View><Query><Where><Eq><FieldRef Name='ProjectWebUniqueId'/><Value Type='Guid'>$ProjectWebUniqueId</Value></Eq></Where></Query></View>"

    if ($ProjectItem -eq $null) {
        $ProjectItem = Add-PnPListItem -List $ProjectList
        $ProjectItem["ProjectWebUniqueId"] = $ProjectWebUniqueId
    }
    $ProjectItem["Title"] = $ProjectTitle
    $ProjectItem.Update()

    $FieldsToSync | ? {$_.FieldTypeKind -ne "Invalid"} | % {
        if ($_.InternalName -eq "GtProjectUrl") {
            $ProjectItem["GtProjectUrl"] = "$ProjectUrl, $ProjectTitle"
        } else {
            $ProjectItem[$_.InternalName] = $ProjectPage[$_.InternalName]
        }
    }
    $ProjectItem.Update()

    $FieldsToSync | ? {$_.FieldTypeKind -eq "Invalid"} | % {
        if ($ProjectPage[$_.InternalName] -ne $null -and $ProjectMeta[$_.InternalName].TermGuid -ne $null) {
            Set-PnPTaxonomyFieldValue -ListItem $ProjectItem -InternalFieldName $_.InternalName -TermId $ProjectPage[$_.InternalName].TermGuid
        }
    }
    $ProjectItem.Update()

    Execute-PnPQuery
}
