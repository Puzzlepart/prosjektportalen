Param(    
    [Parameter(Mandatory = $true, HelpMessage = "Target Site URL")]
    [string]$TargetSite,
    [Parameter(Mandatory = $false, HelpMessage = "Stored credential from Windows Credential Manager")]
    [string]$GenericCredential,
    [Parameter(Mandatory = $false, HelpMessage = "Use Web Login to connect to SharePoint. Useful for e.g. ADFS environments.")]
    [switch]$UseWebLogin,
    [Parameter(Mandatory = $false, HelpMessage = "Use the credentials of the current user to connect to SharePoint. Useful e.g. if you install directly from the server.")]
    [switch]$CurrentCredentials,
    [Parameter(Mandatory = $false, HelpMessage = "PowerShell credential to authenticate with")]
    [System.Management.Automation.PSCredential]$PSCredential,
    [Parameter(Mandatory = $true, HelpMessage = "Extension Title")]
    [string]$ExtensionTitle
)


function Connect-SharePoint ([string]$Url, [Object]$Connection) {
    $ConnectionUrl = $Url.TrimEnd("/")

    if ($null -ne $Connection) {
        if ($Connection.Url -eq $ConnectionUrl) {
            return $Connection
        }
    }
    if ($UseWebLogin.IsPresent) {
        return Connect-PnPOnline $ConnectionUrl -UseWebLogin -ReturnConnection
    }
    elseif ($CurrentCredentials.IsPresent) {
        return Connect-PnPOnline $ConnectionUrl -CurrentCredentials -ReturnConnection
    }
    else {
        return Connect-PnPOnline $ConnectionUrl -Credentials $Credential -ReturnConnection
    }
}

# Handling credentials
if ($PSCredential -ne $null) {
    Write-Output "### Connecting via Posh Credential ###"
    $Credential = $PSCredential
}
elseif ($GenericCredential -ne $null -and $GenericCredential -ne "") {
    Write-Output "### Connecting via Generic Credential $GenericCredential ###"
    $Credential = Get-PnPStoredCredential -Name $GenericCredential -Type PSCredential 
}
elseif ($Credential -eq $null -and -not $UseWebLogin.IsPresent -and -not $CurrentCredentials.IsPresent) {
    Write-Output "### Connecting via prompt ###"
    $Credential = (Get-Credential -Message "Please enter your username and password")
}

$TargetSiteConnection = Connect-SharePoint -Url $TargetSite -$Credential

$ExtensionItem = (Get-PnPListItem -List "Extensions" -Connection $TargetSiteConnection | Where-Object { $_["Title"] -eq $ExtensionTitle })

if ($null -ne $ExtensionItem) {
    $RootWeb = Get-PnPWeb -Connection $TargetSiteConnection
    $RootWeb.Context.Load($RootWeb.Webs)
    $RootWeb.Context.ExecuteQuery()
    $Extension = Get-PnPFile -Url $ExtensionItem["FileRef"] -AsString -Connection $TargetSiteConnection | ConvertFrom-Json
    if ($null -ne $Extension.Lists) {
        foreach ($ListConfig in $Extension.Lists) {
            if ($null -ne $ListConfig.Views) {
                Write-Host "Processing [$($ListConfig.Title)]"
                foreach ($Web in $RootWeb.Webs) {
                    Write-Host "`t$($Web.Title)"                    
                    Write-Host "`t`tEnsuring [$($ListConfig.Title)]"
                    $List = Get-PnPList -Identity $ListConfig.Title -Web $Web -Connection $TargetSiteConnection
                    if ($null -eq $List) {                         
                        Write-Host "`t`t`tList [$($ListConfig.Title)] doesn't exist - creating"
                        New-PnPList -Title $ListConfig.Title -Template $ListConfig.Template -EnableContentTypes:$ListConfig.ContentTypesEnabled -EnableVersioning:$ListConfig.AdditionalSettings.EnableVersioning -Hidden:$ListConfig.AdditionalSettings.Hidden -Web $Web -Connection $TargetSiteConnection
                        $List = Get-PnPList -Identity $ListConfig.Title -Web $Web -Connection $TargetSiteConnection
                        Write-Host "`t`t`tList [$($ListConfig.Title)] created"
                        if ($null -ne $ListConfig.ContentTypeBindings) {                       
                            Write-Host "`t`t`tProcessing content types for list [$($ListConfig.Title)]"
                            $ExistingContentTypes = Get-PnPContentType -List $List -Web $Web -Connection $TargetSiteConnection
                            foreach ($ContentTypeId in ($ListConfig.ContentTypeBindings | Select-Object -ExpandProperty ContentTypeID)) {
                                Add-PnPContentTypeToList -List $List -ContentType $ContentTypeId -Web $Web -Connection $TargetSiteConnection
                            }
                            if ($ListConfig.RemoveExistingContentTypes) {
                                foreach ($ContentType in $ExistingContentTypes) {
                                    Remove-PnPContentTypeFromList -List $List -ContentType $ContentType -Web $Web -Connection $TargetSiteConnection
                                }
                            }
                        }
                    }
                    Write-Host "`t`tProcessing views for [$($ListConfig.Title)]"
                    $List.Context.Load($List.Views)
                    $List.Context.ExecuteQuery()
                    foreach ($ViewConfig in $ListConfig.Views) {
                        Write-Host "`t`t`tEnsuring view [$($ViewConfig.Title)]"
                        $View = $List.Views | Where-Object { $_.Title -eq $ViewConfig.Title }
                        if ($null -eq $View) {                         
                            Write-Host "`t`t`tView $($ViewConfig.Title) for list [$($ListConfig.Title)] doesn't exist - creating"
                            Write-Host "`t`t`tAdding view [$($ViewConfig.Title)] to list [$($ListConfig.Title)]"
                            $View = Add-PnPView -List $List -Title $ViewConfig.Title -Query $ViewConfig.AdditionalSettings.ViewQuery -Fields $ViewConfig.ViewFields -RowLimit $ViewConfig.AdditionalSettings.ViewQuery -Paged:$ViewConfig.AdditionalSettings.Paged -Web $Web -Connection $TargetSiteConnection
                        }
                        else {
                            Write-Host "`t`t`tUpdating view [$($ViewConfig.Title)] for list [$($ListConfig.Title)]"
                            try {
                                $View.ViewQuery = $ViewConfig.AdditionalSettings.ViewQuery 
                                $View.Paged = $ViewConfig.Paged
                                $View.RowLimit = $ViewConfig.AdditionalSettings.RowLimit
                                if ($ViewConfig.AdditionalSettings.DefaultView) {
                                    $view.DefaultView = $true
                                }
                                $View.ViewFields.RemoveAll()
                                foreach ($ViewField in $ViewConfig.ViewFields) {                            
                                    $View.ViewFields.Add($ViewField)
                                }
                                $View.Update()
                                $View.Context.ExecuteQuery()
                            }
                            catch {
                                Write-Host "`t`t`Failed to update view [$($ViewConfig.Title)] for list [$($ListConfig.Title)]"                        
                            }
                        }
                    }
                }
            }
        }
    }
}
else {    
    Write-Host "Extension [$($ExtensionTitle)] doesn't exist in site [$($TargetSite)]"
}