@{
    RootModule = 'SharePointPnP.PowerShell.Online.Commands.dll'
    ModuleVersion = '2.27.1806.1'
    Description = 'SharePoint Patterns and Practices PowerShell Cmdlets for SharePoint Online'
    GUID = '8f1147be-a8e4-4bd2-a705-841d5334edc0'
    Author = 'SharePoint Patterns and Practices'
    CompanyName = 'SharePoint Patterns and Practices'
    DotNetFrameworkVersion = '4.5'
    ProcessorArchitecture = 'None'
    FunctionsToExport = '*'
    CmdletsToExport = 'Add-PnPApp','Add-PnPClientSidePage','Add-PnPClientSidePageSection','Add-PnPClientSideText','Add-PnPClientSideWebPart','Add-PnPContentType','Add-PnPContentTypeToDocumentSet','Add-PnPContentTypeToList','Add-PnPCustomAction','Add-PnPDataRowsToProvisioningTemplate','Add-PnPDocumentSet','Add-PnPEventReceiver','Add-PnPField','Add-PnPFieldFromXml','Add-PnPFieldToContentType','Add-PnPFile','Add-PnPFileToProvisioningTemplate','Add-PnPFolder','Add-PnPHtmlPublishingPageLayout','Add-PnPHubSiteAssociation','Add-PnPIndexedProperty','Add-PnPJavaScriptBlock','Add-PnPJavaScriptLink','Add-PnPListFoldersToProvisioningTemplate','Add-PnPListItem','Add-PnPMasterPage','Add-PnPNavigationNode','Test-PnPOffice365GroupAliasIsUsed','Add-PnPOffice365GroupToSite','Add-PnPPublishingImageRendition','Add-PnPPublishingPage','Add-PnPPublishingPageLayout','Add-PnPRoleDefinition','Add-PnPSiteClassification','Add-PnPSiteCollectionAdmin','Add-PnPSiteCollectionAppCatalog','Add-PnPSiteDesign','Add-PnPSiteScript','Add-PnPStoredCredential','Add-PnPTaxonomyField','Add-PnPTenantCdnOrigin','Add-PnPTenantTheme','Add-PnPUserToGroup','Add-PnPView','Add-PnPWebhookSubscription','Add-PnPWebPartToWebPartPage','Add-PnPWebPartToWikiPage','Add-PnPWikiPage','Add-PnPWorkflowDefinition','Add-PnPWorkflowSubscription','Apply-PnPProvisioningTemplate','Set-PnPSitePolicy','Approve-PnPTenantServicePrincipalPermissionRequest','Clear-PnPListItemAsRecord','Clear-PnPRecycleBinItem','Clear-PnPTenantRecycleBinItem','Connect-PnPOnline','Connect-PnPMicrosoftGraph','Convert-PnPProvisioningTemplate','Convert-PnPFolderToProvisioningTemplate','Copy-PnPFile','Deny-PnPTenantServicePrincipalPermissionRequest','Disable-PnPFeature','Disable-PnPInPlaceRecordsManagementForSite','Disable-PnPPowerShellTelemetry','Disable-PnPResponsiveUI','Disable-PnPSiteClassification','Disable-PnPTenantServicePrincipal','Disconnect-PnPOnline','Enable-PnPFeature','Enable-PnPInPlaceRecordsManagementForSite','Enable-PnPPowerShellTelemetry','Enable-PnPResponsiveUI','Enable-PnPSiteClassification','Enable-PnPTenantServicePrincipal','Get-PnPProperty','Export-PnPTaxonomy','Export-PnPTermGroupToXml','Find-PnPFile','Get-PnPApp','Get-PnPAppInstance','Get-PnPAuditing','Get-PnPAuthenticationRealm','Get-PnPAvailableClientSideComponents','Get-PnPAzureADManifestKeyCredentials','Get-PnPClientSideComponent','Get-PnPClientSidePage','Get-PnPContentType','Get-PnPContentTypePublishingHubUrl','Get-PnPCustomAction','Get-PnPDefaultColumnValues','Get-PnPDocumentSetTemplate','Get-PnPEventReceiver','Get-PnPFeature','Get-PnPField','Get-PnPFile','Get-PnPFolder','Get-PnPFolderItem','Get-PnPGroup','Get-PnPGroupMembers','Get-PnPGroupPermissions','Get-PnPHealthScore','Get-PnPHideDefaultThemes','Get-PnPHomePage','Get-PnPHubSite','Get-PnPIndexedPropertyKeys','Get-PnPInPlaceRecordsManagement','Get-PnPJavaScriptLink','Get-PnPList','Get-PnPListInformationRightsManagement','Get-PnPListItem','Get-PnPListRecordDeclaration','Get-PnPMasterPage','Get-PnPNavigationNode','Get-PnPAccessToken','Get-PnPAzureCertificate','Get-PnPAppAuthAccessToken','Get-PnPConnection','Get-PnPSiteCollectionTermStore','Get-PnPStorageEntity','Get-PnPPowerShellTelemetryEnabled','Get-PnPPropertyBag','Get-PnPProvisioningTemplate','Get-PnPProvisioningTemplateFromGallery','Get-PnPPublishingImageRendition','Get-PnPRecycleBinItem','Get-PnPRequestAccessEmails','Get-PnPRoleDefinition','Get-PnPSearchConfiguration','Get-PnPSearchCrawlLog','Get-PnPSite','Get-PnPSiteClassification','Get-PnPSiteClosure','Get-PnPSiteCollectionAdmin','Get-PnPSiteDesign','Get-PnPSiteDesignRights','Get-PnPSitePolicy','Get-PnPSiteScript','Get-PnPSiteSearchQueryResults','Get-PnPContext','Get-PnPStoredCredential','Get-PnPSubWebs','Get-PnPTaxonomyItem','Get-PnPTaxonomySession','Get-PnPTenant','Get-PnPTenantAppCatalogUrl','Get-PnPTenantCdnEnabled','Get-PnPTenantCdnOrigin','Get-PnPTenantCdnPolicies','Get-PnPTenantRecycleBinItem','Get-PnPTenantServicePrincipal','Get-PnPTenantServicePrincipalPermissionGrants','Get-PnPTenantServicePrincipalPermissionRequests','Get-PnPTenantSite','Get-PnPTenantTheme','Get-PnPTerm','Get-PnPTermGroup','Get-PnPTermSet','Get-PnPTheme','Get-PnPTimeZoneId','Get-PnPUnifiedGroup','Get-PnPUnifiedGroupMembers','Get-PnPUnifiedGroupOwners','Get-PnPUPABulkImportStatus','Get-PnPUser','Get-PnPUserProfileProperty','Get-PnPView','Get-PnPWeb','Get-PnPWebhookSubscriptions','Get-PnPWebPart','Get-PnPWebPartProperty','Get-PnPWebPartXml','Get-PnPWebTemplates','Get-PnPWikiPageContent','Get-PnPWorkflowDefinition','Get-PnPWorkflowInstance','Get-PnPWorkflowSubscription','Grant-PnPHubSiteRights','Grant-PnPSiteDesignRights','Grant-PnPTenantServicePrincipalPermission','Import-PnPAppPackage','Import-PnPTaxonomy','Import-PnPTermGroupFromXml','Import-PnPTermSet','Install-PnPApp','Install-PnPSolution','Invoke-PnPQuery','Invoke-PnPSiteDesign','Invoke-PnPWebAction','Measure-PnPList','Measure-PnPWeb','Measure-PnPResponseTime','Move-PnPClientSideComponent','Move-PnPFile','Move-PnPFolder','Move-PnPListItemToRecycleBin','Move-PnPRecycleBinItem','New-PnPExtensibilityHandlerObject','New-PnPGroup','New-PnPList','New-PnPPersonalSite','New-PnPAzureCertificate','New-PnPUnifiedGroup','New-PnPProvisioningTemplate','New-PnPProvisioningTemplateFromFolder','New-PnPSite','New-PnPTenantSite','New-PnPTerm','New-PnPTermGroup','New-PnPTermSet','New-PnPUPABulkImportJob','New-PnPUser','New-PnPWeb','Publish-PnPApp','Read-PnPProvisioningTemplate','Register-PnPHubSite','Remove-PnPApp','Remove-PnPClientSideComponent','Remove-PnPClientSidePage','Remove-PnPContentType','Remove-PnPContentTypeFromDocumentSet','Remove-PnPContentTypeFromList','Remove-PnPCustomAction','Remove-PnPIndexedProperty','Remove-PnPEventReceiver','Remove-PnPField','Remove-PnPFieldFromContentType','Remove-PnPFile','Remove-PnPFileFromProvisioningTemplate','Remove-PnPFolder','Remove-PnPGroup','Remove-PnPHubSiteAssociation','Remove-PnPJavaScriptLink','Remove-PnPList','Remove-PnPListItem','Remove-PnPNavigationNode','Remove-PnPStorageEntity','Remove-PnPPropertyBagValue','Remove-PnPPublishingImageRendition','Remove-PnPRoleDefinition','Remove-PnPTenantSite','Remove-PnPSiteClassification','Remove-PnPSiteCollectionAdmin','Remove-PnPSiteCollectionAppCatalog','Remove-PnPSiteDesign','Remove-PnPSiteScript','Remove-PnPStoredCredential','Remove-PnPTaxonomyItem','Remove-PnPTenantCdnOrigin','Remove-PnPTenantTheme','Remove-PnPTermGroup','Remove-PnPUnifiedGroup','Remove-PnPUser','Remove-PnPUserFromGroup','Remove-PnPView','Remove-PnPWeb','Remove-PnPWebhookSubscription','Remove-PnPWebPart','Remove-PnPWikiPage','Remove-PnPWorkflowDefinition','Remove-PnPWorkflowSubscription','Rename-PnPFile','Rename-PnPFolder','Request-PnPReIndexList','Request-PnPReIndexWeb','Resolve-PnPFolder','Restore-PnPRecycleBinItem','Restore-PnPTenantRecycleBinItem','Resume-PnPWorkflowInstance','Revoke-PnPSiteDesignRights','Revoke-PnPTenantServicePrincipalPermission','Save-PnPProvisioningTemplate','Send-PnPMail','Set-PnPAppSideLoading','Set-PnPAuditing','Set-PnPAvailablePageLayouts','Set-PnPClientSidePage','Set-PnPClientSideText','Set-PnPClientSideWebPart','Set-PnPContext','Set-PnPDefaultColumnValues','Set-PnPDefaultContentTypeToList','Set-PnPDefaultPageLayout','Set-PnPField','Set-PnPDocumentSetField','Set-PnPFileCheckedIn','Set-PnPFileCheckedOut','Set-PnPGroup','Set-PnPGroupPermissions','Set-PnPHideDefaultThemes','Set-PnPHomePage','Set-PnPHubSite','Set-PnPIndexedProperties','Set-PnPInPlaceRecordsManagement','Set-PnPList','Set-PnPListInformationRightsManagement','Set-PnPListItem','Set-PnPListItemAsRecord','Set-PnPListItemPermission','Set-PnPListPermission','Set-PnPListRecordDeclaration','Set-PnPMasterPage','Set-PnPMinimalDownloadStrategy','Set-PnPStorageEntity','Set-PnPPropertyBagValue','Set-PnPProvisioningTemplateMetadata','Set-PnPRequestAccessEmails','Set-PnPSearchConfiguration','Set-PnPSite','Set-PnPSiteClosure','Set-PnPSiteDesign','Set-PnPSiteScript','Set-PnPTaxonomyFieldValue','Set-PnPTenant','Set-PnPTenantCdnEnabled','Set-PnPTenantCdnPolicy','Set-PnPTenantSite','Set-PnPTheme','Set-PnPTraceLog','Set-PnPUnifiedGroup','Set-PnPUserProfileProperty','Set-PnPView','Set-PnPWeb','Set-PnPWebhookSubscription','Set-PnPWebPartProperty','Set-PnPWebPermission','Set-PnPWebTheme','Set-PnPWikiPageContent','Copy-PnPItemProxy','Move-PnPItemProxy','Start-PnPWorkflowInstance','Stop-PnPWorkflowInstance','Submit-PnPSearchQuery','Test-PnPListItemIsRecord','Uninstall-PnPApp','Uninstall-PnPAppInstance','Uninstall-PnPSolution','Unpublish-PnPApp','Unregister-PnPHubSite','Update-PnPApp','Update-PnPSiteClassification'
    VariablesToExport = '*'
    AliasesToExport = '*'
    FormatsToProcess = 'SharePointPnP.PowerShell.Online.Commands.Format.ps1xml' 
    PrivateData = @{
        PSData = @{
            ProjectUri = 'https://aka.ms/sppnp'
            IconUri = 'https://raw.githubusercontent.com/SharePoint/PnP-PowerShell/master/Commands/Resources/pnp.ico'
        }
    }
}
# SIG # Begin signature block
# MIIj8AYJKoZIhvcNAQcCoIIj4TCCI90CAQExDzANBglghkgBZQMEAgEFADB5Bgor
# BgEEAYI3AgEEoGswaTA0BgorBgEEAYI3AgEeMCYCAwEAAAQQH8w7YFlLCE63JNLG
# KX7zUQIBAAIBAAIBAAIBAAIBADAxMA0GCWCGSAFlAwQCAQUABCCoTeg+G2Q/Ahu8
# FJ2IlAYQwCCp5LmNedPAV4JTJXvjOqCCDYMwggYBMIID6aADAgECAhMzAAAAxOmJ
# +HqBUOn/AAAAAADEMA0GCSqGSIb3DQEBCwUAMH4xCzAJBgNVBAYTAlVTMRMwEQYD
# VQQIEwpXYXNoaW5ndG9uMRAwDgYDVQQHEwdSZWRtb25kMR4wHAYDVQQKExVNaWNy
# b3NvZnQgQ29ycG9yYXRpb24xKDAmBgNVBAMTH01pY3Jvc29mdCBDb2RlIFNpZ25p
# bmcgUENBIDIwMTEwHhcNMTcwODExMjAyMDI0WhcNMTgwODExMjAyMDI0WjB0MQsw
# CQYDVQQGEwJVUzETMBEGA1UECBMKV2FzaGluZ3RvbjEQMA4GA1UEBxMHUmVkbW9u
# ZDEeMBwGA1UEChMVTWljcm9zb2Z0IENvcnBvcmF0aW9uMR4wHAYDVQQDExVNaWNy
# b3NvZnQgQ29ycG9yYXRpb24wggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIB
# AQCIirgkwwePmoB5FfwmYPxyiCz69KOXiJZGt6PLX4kvOjMuHpF4+nypH4IBtXrL
# GrwDykbrxZn3+wQd8oUK/yJuofJnPcUnGOUoH/UElEFj7OO6FYztE5o13jhwVG87
# 7K1FCTBJwb6PMJkMy3bJ93OVFnfRi7uUxwiFIO0eqDXxccLgdABLitLckevWeP6N
# +q1giD29uR+uYpe/xYSxkK7WryvTVPs12s1xkuYe/+xxa8t/CHZ04BBRSNTxAMhI
# TKMHNeVZDf18nMjmWuOF9daaDx+OpuSEF8HWyp8dAcf9SKcTkjOXIUgy+MIkogCy
# vlPKg24pW4HvOG6A87vsEwvrAgMBAAGjggGAMIIBfDAfBgNVHSUEGDAWBgorBgEE
# AYI3TAgBBggrBgEFBQcDAzAdBgNVHQ4EFgQUy9ZihM9gOer/Z8Jc0si7q7fDE5gw
# UgYDVR0RBEswSaRHMEUxDTALBgNVBAsTBE1PUFIxNDAyBgNVBAUTKzIzMDAxMitj
# ODA0YjVlYS00OWI0LTQyMzgtODM2Mi1kODUxZmEyMjU0ZmMwHwYDVR0jBBgwFoAU
# SG5k5VAF04KqFzc3IrVtqMp1ApUwVAYDVR0fBE0wSzBJoEegRYZDaHR0cDovL3d3
# dy5taWNyb3NvZnQuY29tL3BraW9wcy9jcmwvTWljQ29kU2lnUENBMjAxMV8yMDEx
# LTA3LTA4LmNybDBhBggrBgEFBQcBAQRVMFMwUQYIKwYBBQUHMAKGRWh0dHA6Ly93
# d3cubWljcm9zb2Z0LmNvbS9wa2lvcHMvY2VydHMvTWljQ29kU2lnUENBMjAxMV8y
# MDExLTA3LTA4LmNydDAMBgNVHRMBAf8EAjAAMA0GCSqGSIb3DQEBCwUAA4ICAQAG
# Fh/bV8JQyCNPolF41+34/c291cDx+RtW7VPIaUcF1cTL7OL8mVuVXxE4KMAFRRPg
# mnmIvGar27vrAlUjtz0jeEFtrvjxAFqUmYoczAmV0JocRDCppRbHukdb9Ss0i5+P
# WDfDThyvIsoQzdiCEKk18K4iyI8kpoGL3ycc5GYdiT4u/1cDTcFug6Ay67SzL1BW
# XQaxFYzIHWO3cwzj1nomDyqWRacygz6WPldJdyOJ/rEQx4rlCBVRxStaMVs5apao
# pIhrlihv8cSu6r1FF8xiToG1VBpHjpilbcBuJ8b4Jx/I7SCpC7HxzgualOJqnWmD
# oTbXbSD+hdX/w7iXNgn+PRTBmBSpwIbM74LBq1UkQxi1SIV4htD50p0/GdkUieeN
# n2gkiGg7qceATibnCCFMY/2ckxVNM7VWYE/XSrk4jv8u3bFfpENryXjPsbtrj4Ns
# h3Kq6qX7n90a1jn8ZMltPgjlfIOxrbyjunvPllakeljLEkdi0iHv/DzEMQv3Lz5k
# pTdvYFA/t0SQT6ALi75+WPbHZ4dh256YxMiMy29H4cAulO2x9rAwbexqSajplnbI
# vQjE/jv1rnM3BrJWzxnUu/WUyocc8oBqAU+2G4Fzs9NbIj86WBjfiO5nxEmnL9wl
# iz1e0Ow0RJEdvJEMdoI+78TYLaEEAo5I+e/dAs8DojCCB3owggVioAMCAQICCmEO
# kNIAAAAAAAMwDQYJKoZIhvcNAQELBQAwgYgxCzAJBgNVBAYTAlVTMRMwEQYDVQQI
# EwpXYXNoaW5ndG9uMRAwDgYDVQQHEwdSZWRtb25kMR4wHAYDVQQKExVNaWNyb3Nv
# ZnQgQ29ycG9yYXRpb24xMjAwBgNVBAMTKU1pY3Jvc29mdCBSb290IENlcnRpZmlj
# YXRlIEF1dGhvcml0eSAyMDExMB4XDTExMDcwODIwNTkwOVoXDTI2MDcwODIxMDkw
# OVowfjELMAkGA1UEBhMCVVMxEzARBgNVBAgTCldhc2hpbmd0b24xEDAOBgNVBAcT
# B1JlZG1vbmQxHjAcBgNVBAoTFU1pY3Jvc29mdCBDb3Jwb3JhdGlvbjEoMCYGA1UE
# AxMfTWljcm9zb2Z0IENvZGUgU2lnbmluZyBQQ0EgMjAxMTCCAiIwDQYJKoZIhvcN
# AQEBBQADggIPADCCAgoCggIBAKvw+nIQHC6t2G6qghBNNLrytlghn0IbKmvpWlCq
# uAY4GgRJun/DDB7dN2vGEtgL8DjCmQawyDnVARQxQtOJDXlkh36UYCRsr55JnOlo
# XtLfm1OyCizDr9mpK656Ca/XllnKYBoF6WZ26DJSJhIv56sIUM+zRLdd2MQuA3Wr
# aPPLbfM6XKEW9Ea64DhkrG5kNXimoGMPLdNAk/jj3gcN1Vx5pUkp5w2+oBN3vpQ9
# 7/vjK1oQH01WKKJ6cuASOrdJXtjt7UORg9l7snuGG9k+sYxd6IlPhBryoS9Z5JA7
# La4zWMW3Pv4y07MDPbGyr5I4ftKdgCz1TlaRITUlwzluZH9TupwPrRkjhMv0ugOG
# jfdf8NBSv4yUh7zAIXQlXxgotswnKDglmDlKNs98sZKuHCOnqWbsYR9q4ShJnV+I
# 4iVd0yFLPlLEtVc/JAPw0XpbL9Uj43BdD1FGd7P4AOG8rAKCX9vAFbO9G9RVS+c5
# oQ/pI0m8GLhEfEXkwcNyeuBy5yTfv0aZxe/CHFfbg43sTUkwp6uO3+xbn6/83bBm
# 4sGXgXvt1u1L50kppxMopqd9Z4DmimJ4X7IvhNdXnFy/dygo8e1twyiPLI9AN0/B
# 4YVEicQJTMXUpUMvdJX3bvh4IFgsE11glZo+TzOE2rCIF96eTvSWsLxGoGyY0uDW
# iIwLAgMBAAGjggHtMIIB6TAQBgkrBgEEAYI3FQEEAwIBADAdBgNVHQ4EFgQUSG5k
# 5VAF04KqFzc3IrVtqMp1ApUwGQYJKwYBBAGCNxQCBAweCgBTAHUAYgBDAEEwCwYD
# VR0PBAQDAgGGMA8GA1UdEwEB/wQFMAMBAf8wHwYDVR0jBBgwFoAUci06AjGQQ7kU
# BU7h6qfHMdEjiTQwWgYDVR0fBFMwUTBPoE2gS4ZJaHR0cDovL2NybC5taWNyb3Nv
# ZnQuY29tL3BraS9jcmwvcHJvZHVjdHMvTWljUm9vQ2VyQXV0MjAxMV8yMDExXzAz
# XzIyLmNybDBeBggrBgEFBQcBAQRSMFAwTgYIKwYBBQUHMAKGQmh0dHA6Ly93d3cu
# bWljcm9zb2Z0LmNvbS9wa2kvY2VydHMvTWljUm9vQ2VyQXV0MjAxMV8yMDExXzAz
# XzIyLmNydDCBnwYDVR0gBIGXMIGUMIGRBgkrBgEEAYI3LgMwgYMwPwYIKwYBBQUH
# AgEWM2h0dHA6Ly93d3cubWljcm9zb2Z0LmNvbS9wa2lvcHMvZG9jcy9wcmltYXJ5
# Y3BzLmh0bTBABggrBgEFBQcCAjA0HjIgHQBMAGUAZwBhAGwAXwBwAG8AbABpAGMA
# eQBfAHMAdABhAHQAZQBtAGUAbgB0AC4gHTANBgkqhkiG9w0BAQsFAAOCAgEAZ/KG
# pZjgVHkaLtPYdGcimwuWEeFjkplCln3SeQyQwWVfLiw++MNy0W2D/r4/6ArKO79H
# qaPzadtjvyI1pZddZYSQfYtGUFXYDJJ80hpLHPM8QotS0LD9a+M+By4pm+Y9G6XU
# tR13lDni6WTJRD14eiPzE32mkHSDjfTLJgJGKsKKELukqQUMm+1o+mgulaAqPypr
# WEljHwlpblqYluSD9MCP80Yr3vw70L01724lruWvJ+3Q3fMOr5kol5hNDj0L8giJ
# 1h/DMhji8MUtzluetEk5CsYKwsatruWy2dsViFFFWDgycScaf7H0J/jeLDogaZiy
# WYlobm+nt3TDQAUGpgEqKD6CPxNNZgvAs0314Y9/HG8VfUWnduVAKmWjw11SYobD
# HWM2l4bf2vP48hahmifhzaWX0O5dY0HjWwechz4GdwbRBrF1HxS+YWG18NzGGwS+
# 30HHDiju3mUv7Jf2oVyW2ADWoUa9WfOXpQlLSBCZgB/QACnFsZulP0V3HjXG0qKi
# n3p6IvpIlR+r+0cjgPWe+L9rt0uX4ut1eBrs6jeZeRhL/9azI2h15q/6/IvrC4Dq
# aTuv/DDtBEyO3991bWORPdGdVk5Pv4BXIqF4ETIheu9BCrE/+6jMpF3BoYibV3FW
# TkhFwELJm3ZbCoBIa/15n8G9bW1qyVJzEw16UM0xghXDMIIVvwIBATCBlTB+MQsw
# CQYDVQQGEwJVUzETMBEGA1UECBMKV2FzaGluZ3RvbjEQMA4GA1UEBxMHUmVkbW9u
# ZDEeMBwGA1UEChMVTWljcm9zb2Z0IENvcnBvcmF0aW9uMSgwJgYDVQQDEx9NaWNy
# b3NvZnQgQ29kZSBTaWduaW5nIFBDQSAyMDExAhMzAAAAxOmJ+HqBUOn/AAAAAADE
# MA0GCWCGSAFlAwQCAQUAoIGuMBkGCSqGSIb3DQEJAzEMBgorBgEEAYI3AgEEMBwG
# CisGAQQBgjcCAQsxDjAMBgorBgEEAYI3AgEVMC8GCSqGSIb3DQEJBDEiBCBb6KuI
# lScds28CTAkJ7mLYfVjxVS1dWyIMNWvdSYLZLTBCBgorBgEEAYI3AgEMMTQwMqAU
# gBIATQBpAGMAcgBvAHMAbwBmAHShGoAYaHR0cDovL3d3dy5taWNyb3NvZnQuY29t
# MA0GCSqGSIb3DQEBAQUABIIBABJjkCKUNdLovsQ3WN8bSnpRKM+a323gFqbSqcF7
# Kyr6L61CqMbacbzGpmos27vT5w5+hTnRd054uIadtbHHeIiQ5sIjxZsQGKJ0eXVu
# /GR5ACIz+i84pPk/l8f7K6vkZK0Dkwh3lOB0I2uQCId6pA+jBA1c5wGB11lHH8Uk
# B4jL0LAegdnH5B6Wb9s3d3VX17W48gHvywghN7E907AWZFBTgbV9mj5JAGSfxOaw
# xzxy6+3HHmJnNRzDIx9c0ExV+zUGgXdvhjmhwMOq9hJ9KdjabKItg7z0NqPOAVoM
# UhmoZ7NaxmAZZ3GhDLC5gUaKhVKp6FYa9v2XopXujEDaDgihghNNMIITSQYKKwYB
# BAGCNwMDATGCEzkwghM1BgkqhkiG9w0BBwKgghMmMIITIgIBAzEPMA0GCWCGSAFl
# AwQCAQUAMIIBPQYLKoZIhvcNAQkQAQSgggEsBIIBKDCCASQCAQEGCisGAQQBhFkK
# AwEwMTANBglghkgBZQMEAgEFAAQgjEJtB+17ni6Vb+MUugFehtzVdroaVQggxS/J
# 1gBUhh0CBlsbNCR5gxgTMjAxODA2MTMxODU2NDguNjA3WjAHAgEBgAIB9KCBuaSB
# tjCBszELMAkGA1UEBhMCVVMxEzARBgNVBAgTCldhc2hpbmd0b24xEDAOBgNVBAcT
# B1JlZG1vbmQxHjAcBgNVBAoTFU1pY3Jvc29mdCBDb3Jwb3JhdGlvbjENMAsGA1UE
# CxMETU9QUjEnMCUGA1UECxMebkNpcGhlciBEU0UgRVNOOkIxQjctRjY3Ri1GRUMy
# MSUwIwYDVQQDExxNaWNyb3NvZnQgVGltZS1TdGFtcCBTZXJ2aWNloIIO0DCCBNow
# ggPCoAMCAQICEzMAAACxcRN533X2NcgAAAAAALEwDQYJKoZIhvcNAQELBQAwfDEL
# MAkGA1UEBhMCVVMxEzARBgNVBAgTCldhc2hpbmd0b24xEDAOBgNVBAcTB1JlZG1v
# bmQxHjAcBgNVBAoTFU1pY3Jvc29mdCBDb3Jwb3JhdGlvbjEmMCQGA1UEAxMdTWlj
# cm9zb2Z0IFRpbWUtU3RhbXAgUENBIDIwMTAwHhcNMTYwOTA3MTc1NjU3WhcNMTgw
# OTA3MTc1NjU3WjCBszELMAkGA1UEBhMCVVMxEzARBgNVBAgTCldhc2hpbmd0b24x
# EDAOBgNVBAcTB1JlZG1vbmQxHjAcBgNVBAoTFU1pY3Jvc29mdCBDb3Jwb3JhdGlv
# bjENMAsGA1UECxMETU9QUjEnMCUGA1UECxMebkNpcGhlciBEU0UgRVNOOkIxQjct
# RjY3Ri1GRUMyMSUwIwYDVQQDExxNaWNyb3NvZnQgVGltZS1TdGFtcCBTZXJ2aWNl
# MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAqqQklG1Y1lu8ob0P7deu
# muRn4JvRi2GErmK94vgbnWPmd0j/9arA7539HD1dpG1uhYbmnAxc+qsuvMM0fpEv
# ttTK4lZSU7ss5rJfWmbFn/J8kSGI8K9iBaB6hQkJuIX4si9ppNr9R3oZI3HbJ/yR
# kKUPk4hozpY6CkehRc0/Zfu6tQiyqI7mClXYZTXjw+rLsh3/gdBvYDd38zFBllaf
# +3uimKQgUTXGjbKfqZZk3tEU3ibWVPUxAmmxlG3sWTlXmU31fCw/6TVzGg251lq+
# Q46OjbeH9vB2TOcqEso4Nai3J1CdMAYUdlelVVtgQdIx/c+5Hvrw0Y6W7uGBAWnW
# 5wIDAQABo4IBGzCCARcwHQYDVR0OBBYEFE5XPfeLLhRLV7L8Il7Tz7cnRBA7MB8G
# A1UdIwQYMBaAFNVjOlyKMZDzQ3t8RhvFM2hahW1VMFYGA1UdHwRPME0wS6BJoEeG
# RWh0dHA6Ly9jcmwubWljcm9zb2Z0LmNvbS9wa2kvY3JsL3Byb2R1Y3RzL01pY1Rp
# bVN0YVBDQV8yMDEwLTA3LTAxLmNybDBaBggrBgEFBQcBAQROMEwwSgYIKwYBBQUH
# MAKGPmh0dHA6Ly93d3cubWljcm9zb2Z0LmNvbS9wa2kvY2VydHMvTWljVGltU3Rh
# UENBXzIwMTAtMDctMDEuY3J0MAwGA1UdEwEB/wQCMAAwEwYDVR0lBAwwCgYIKwYB
# BQUHAwgwDQYJKoZIhvcNAQELBQADggEBAHPujfu0W8PBTpjfYaPrAKIBLKcljT4+
# YnWbbgGvmXU8OvIUDBkkv8gNGGHRO5DSySaCARIzgn2yIheAqh6GwM2yKrfb4eVC
# YPe1CTlCseS5TOv+Tn/95mXj+NxTqvuNmrhgCVr0CQ7b3xoKcwDcQbg7TmerDgbI
# v2k7cEqbYbU/B3MtSX8Zjjf0ZngdKoX0JYkAEDbZchOrRiUtDJItegPKZPf6CjeH
# YjrmKwvTOVCzv3lW0uyh1yb/ODeRH+VqENSHCboFiEiq9KpKMOpek1VvQhmI2KbT
# lRvK869gj1NwuUHH8c3WXu4A0X1+CBmU8t0gvd/fFlQvw04veKWh984wggZxMIIE
# WaADAgECAgphCYEqAAAAAAACMA0GCSqGSIb3DQEBCwUAMIGIMQswCQYDVQQGEwJV
# UzETMBEGA1UECBMKV2FzaGluZ3RvbjEQMA4GA1UEBxMHUmVkbW9uZDEeMBwGA1UE
# ChMVTWljcm9zb2Z0IENvcnBvcmF0aW9uMTIwMAYDVQQDEylNaWNyb3NvZnQgUm9v
# dCBDZXJ0aWZpY2F0ZSBBdXRob3JpdHkgMjAxMDAeFw0xMDA3MDEyMTM2NTVaFw0y
# NTA3MDEyMTQ2NTVaMHwxCzAJBgNVBAYTAlVTMRMwEQYDVQQIEwpXYXNoaW5ndG9u
# MRAwDgYDVQQHEwdSZWRtb25kMR4wHAYDVQQKExVNaWNyb3NvZnQgQ29ycG9yYXRp
# b24xJjAkBgNVBAMTHU1pY3Jvc29mdCBUaW1lLVN0YW1wIFBDQSAyMDEwMIIBIjAN
# BgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAqR0NvHcRijog7PwTl/X6f2mUa3RU
# ENWlCgCChfvtfGhLLF/Fw+Vhwna3PmYrW/AVUycEMR9BGxqVHc4JE458YTBZsTBE
# D/FgiIRUQwzXTbg4CLNC3ZOs1nMwVyaCo0UN0Or1R4HNvyRgMlhgRvJYR4YyhB50
# YWeRX4FUsc+TTJLBxKZd0WETbijGGvmGgLvfYfxGwScdJGcSchohiq9LZIlQYrFd
# /XcfPfBXday9ikJNQFHRD5wGPmd/9WbAA5ZEfu/QS/1u5ZrKsajyeioKMfDaTgaR
# togINeh4HLDpmc085y9Euqf03GS9pAHBIAmTeM38vMDJRF1eFpwBBU8iTQIDAQAB
# o4IB5jCCAeIwEAYJKwYBBAGCNxUBBAMCAQAwHQYDVR0OBBYEFNVjOlyKMZDzQ3t8
# RhvFM2hahW1VMBkGCSsGAQQBgjcUAgQMHgoAUwB1AGIAQwBBMAsGA1UdDwQEAwIB
# hjAPBgNVHRMBAf8EBTADAQH/MB8GA1UdIwQYMBaAFNX2VsuP6KJcYmjRPZSQW9fO
# mhjEMFYGA1UdHwRPME0wS6BJoEeGRWh0dHA6Ly9jcmwubWljcm9zb2Z0LmNvbS9w
# a2kvY3JsL3Byb2R1Y3RzL01pY1Jvb0NlckF1dF8yMDEwLTA2LTIzLmNybDBaBggr
# BgEFBQcBAQROMEwwSgYIKwYBBQUHMAKGPmh0dHA6Ly93d3cubWljcm9zb2Z0LmNv
# bS9wa2kvY2VydHMvTWljUm9vQ2VyQXV0XzIwMTAtMDYtMjMuY3J0MIGgBgNVHSAB
# Af8EgZUwgZIwgY8GCSsGAQQBgjcuAzCBgTA9BggrBgEFBQcCARYxaHR0cDovL3d3
# dy5taWNyb3NvZnQuY29tL1BLSS9kb2NzL0NQUy9kZWZhdWx0Lmh0bTBABggrBgEF
# BQcCAjA0HjIgHQBMAGUAZwBhAGwAXwBQAG8AbABpAGMAeQBfAFMAdABhAHQAZQBt
# AGUAbgB0AC4gHTANBgkqhkiG9w0BAQsFAAOCAgEAB+aIUQ3ixuCYP4FxAz2do6Eh
# b7Prpsz1Mb7PBeKp/vpXbRkws8LFZslq3/Xn8Hi9x6ieJeP5vO1rVFcIK1GCRBL7
# uVOMzPRgEop2zEBAQZvcXBf/XPleFzWYJFZLdO9CEMivv3/Gf/I3fVo/HPKZeUqR
# UgCvOA8X9S95gWXZqbVr5MfO9sp6AG9LMEQkIjzP7QOllo9ZKby2/QThcJ8ySif9
# Va8v/rbljjO7Yl+a21dA6fHOmWaQjP9qYn/dxUoLkSbiOewZSnFjnXshbcOco6I8
# +n99lmqQeKZt0uGc+R38ONiU9MalCpaGpL2eGq4EQoO4tYCbIjggtSXlZOz39L9+
# Y1klD3ouOVd2onGqBooPiRa6YacRy5rYDkeagMXQzafQ732D8OE7cQnfXXSYIghh
# 2rBQHm+98eEA3+cxB6STOvdlR3jo+KhIq/fecn5ha293qYHLpwmsObvsxsvYgrRy
# zR30uIUBHoD7G4kqVDmyW9rIDVWZeodzOwjmmC3qjeAzLhIp9cAvVCch98isTtoo
# uLGp25ayp0Kiyc8ZQU3ghvkqmqMRZjDTu3QyS99je/WZii8bxyGvWbWu3EQ8l1Bx
# 16HSxVXjad5XwdHeMMD9zOZN+w2/XU/pnR4ZOC+8z1gFLu8NoFA12u8JJxzVs341
# Hgi62jbb01+P3nSISRKhggN5MIICYQIBATCB46GBuaSBtjCBszELMAkGA1UEBhMC
# VVMxEzARBgNVBAgTCldhc2hpbmd0b24xEDAOBgNVBAcTB1JlZG1vbmQxHjAcBgNV
# BAoTFU1pY3Jvc29mdCBDb3Jwb3JhdGlvbjENMAsGA1UECxMETU9QUjEnMCUGA1UE
# CxMebkNpcGhlciBEU0UgRVNOOkIxQjctRjY3Ri1GRUMyMSUwIwYDVQQDExxNaWNy
# b3NvZnQgVGltZS1TdGFtcCBTZXJ2aWNloiUKAQEwCQYFKw4DAhoFAAMVADq635Mo
# ZeR60+ej9uKnRG5YqlPSoIHCMIG/pIG8MIG5MQswCQYDVQQGEwJVUzETMBEGA1UE
# CBMKV2FzaGluZ3RvbjEQMA4GA1UEBxMHUmVkbW9uZDEeMBwGA1UEChMVTWljcm9z
# b2Z0IENvcnBvcmF0aW9uMQ0wCwYDVQQLEwRNT1BSMScwJQYDVQQLEx5uQ2lwaGVy
# IE5UUyBFU046NERFOS0wQzVFLTNFMDkxKzApBgNVBAMTIk1pY3Jvc29mdCBUaW1l
# IFNvdXJjZSBNYXN0ZXIgQ2xvY2swDQYJKoZIhvcNAQEFBQACBQDey8sxMCIYDzIw
# MTgwNjE0MDA1NjE3WhgPMjAxODA2MTUwMDU2MTdaMHcwPQYKKwYBBAGEWQoEATEv
# MC0wCgIFAN7LyzECAQAwCgIBAAICCmUCAf8wBwIBAAICF04wCgIFAN7NHLECAQAw
# NgYKKwYBBAGEWQoEAjEoMCYwDAYKKwYBBAGEWQoDAaAKMAgCAQACAxbjYKEKMAgC
# AQACAwehIDANBgkqhkiG9w0BAQUFAAOCAQEAJuq5uP+cpkELAGenusJIKzPVOc51
# poDZT4kn2zOrLJXCvOzNJwcNAQjpheHwbM+Cat5mUvIBxXUo5YfZrg69uCRgkhsU
# KuqSZYD5kt3OyNRObCI/GJqeZRSQjar6E3Wsc/SncQ4NRn09bYcrjF/Yzylg36dF
# DYCXvzNQt6bPI7Muk2doUv1eirsGPaQO8ENUYRfHoCPBDOPI2e1u7NDL9lOxJSD/
# ayUYuSAgAxWDfOtBTqaEXTipVu55Ii0UofcM+0L87Haze9rLimKITss7DAjb1H3W
# e7usX1pADklBkWUlHbW40eqihihPVEZHPCJ2G6FWaWPWDj+S3G+eLYru6TGCAvUw
# ggLxAgEBMIGTMHwxCzAJBgNVBAYTAlVTMRMwEQYDVQQIEwpXYXNoaW5ndG9uMRAw
# DgYDVQQHEwdSZWRtb25kMR4wHAYDVQQKExVNaWNyb3NvZnQgQ29ycG9yYXRpb24x
# JjAkBgNVBAMTHU1pY3Jvc29mdCBUaW1lLVN0YW1wIFBDQSAyMDEwAhMzAAAAsXET
# ed919jXIAAAAAACxMA0GCWCGSAFlAwQCAQUAoIIBMjAaBgkqhkiG9w0BCQMxDQYL
# KoZIhvcNAQkQAQQwLwYJKoZIhvcNAQkEMSIEIDmqAijZsOqzyIV2FwVyhYP8yGlp
# 3tpmOGnslq2rl+GsMIHiBgsqhkiG9w0BCRACDDGB0jCBzzCBzDCBsQQUOrrfkyhl
# 5HrT56P24qdEbliqU9IwgZgwgYCkfjB8MQswCQYDVQQGEwJVUzETMBEGA1UECBMK
# V2FzaGluZ3RvbjEQMA4GA1UEBxMHUmVkbW9uZDEeMBwGA1UEChMVTWljcm9zb2Z0
# IENvcnBvcmF0aW9uMSYwJAYDVQQDEx1NaWNyb3NvZnQgVGltZS1TdGFtcCBQQ0Eg
# MjAxMAITMwAAALFxE3nfdfY1yAAAAAAAsTAWBBS4bTygjMT966esstZPAlqc6xLU
# 0TANBgkqhkiG9w0BAQsFAASCAQB9jAWe5B/KoKlGXczmkRXAFE/NVEv5HzDMGzys
# hOTEzQb7s3vQ6cIw/vuwzyU6bDfryELjE1hn5rzaaFe05AoBfmK0cMkaEDqQxz+S
# QXYCIjbBnv2qvvjZTnHNzJob2wF6wPOtN6mCLMUJlxPSh0E2P8IUPcwhKhK1vNFO
# fCArt1tvQqDd+KM9bkuqSVIsqDlot+/65LVChLs4w8FJgDhQrMoLdd4eNqR3lJCZ
# cfbFQwml3h6Kzq7caF1Da2lUs4liJoPhD6RcuPw0UoAOll+7Hpsrl62DdcS9x2S3
# 8CLlxku7/LuB2KXeZ62RZ7XOhYUtrzpjQkik4gkOnRp4TOqm
# SIG # End signature block
