$template = @"
<data name='{0}_{1}_{2}' xml:space='preserve'>
<value>{3}</value>
</data>
"@

$output = "";

$xml = [xml] (Get-Content C:\code\pnp-prosjektportalen\templates\root\Objects\SiteFields.xml)
$siteFields = $xml.SiteFields.ChildNodes
$siteFields | ForEach-Object { 
    $output += ($template -f "SiteFields", "$($_.Name)", "Description", "$($_.Description)")
}

$output > file.txt