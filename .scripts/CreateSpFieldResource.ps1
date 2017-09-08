Param(
    [Parameter(Mandatory = $true)]
    [string]$Key,
    [Parameter(Mandatory = $false)]
    [string]$Value = "",    
    [Parameter(Mandatory = $true)]
    [string]$Prefix,    
    [Parameter(Mandatory = $true)]
    [string]$Postfix
)

return "<data name=`"$($Prefix)_$($Key)_$($Postfix)`" xml:space=`"preserve`"><value>$($Value)</value></data>"