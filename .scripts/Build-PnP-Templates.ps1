$TemplatesPath = ".\_templates"
$TemplatesOutputPath = ".\dist\templates"

mkdir $TemplatesOutputPath -Force

Get-ChildItem -Directory $TemplatesPath | ForEach-Object {
    $Name = $_
    $Folder = "$($TemplatesPath)\$($Name)"
    $Out = "$($TemplatesOutputPath)\$($Name).pnp"
    Convert-PnPFolderToProvisioningTemplate -Folder $Folder -Out $Out -Force
}