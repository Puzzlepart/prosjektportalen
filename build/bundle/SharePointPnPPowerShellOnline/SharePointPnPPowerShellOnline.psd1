@{
    RootModule = 'SharePointPnP.PowerShell.Online.Commands.dll'
    ModuleVersion = '3.10.1906.0'
    Description = 'SharePoint Patterns and Practices PowerShell Cmdlets for SharePoint Online'
    GUID = '8f1147be-a8e4-4bd2-a705-841d5334edc0'
    Author = 'SharePoint Patterns and Practices'
    CompanyName = 'SharePoint Patterns and Practices'
    DotNetFrameworkVersion = '4.5'
    ProcessorArchitecture = 'None'
    FunctionsToExport = '*'
    CmdletsToExport = 'Add-PnPAlert','Add-PnPApp','Add-PnPClientSidePage','Add-PnPClientSidePageSection','Add-PnPClientSideText','Add-PnPClientSideWebPart','Add-PnPContentType','Add-PnPContentTypeToDocumentSet','Add-PnPContentTypeToList','Add-PnPCustomAction','Add-PnPDataRowsToProvisioningTemplate','Add-PnPDocumentSet','Add-PnPEventReceiver','Add-PnPField','Add-PnPFieldFromXml','Add-PnPFieldToContentType','Add-PnPFile','Add-PnPFileToProvisioningTemplate','Add-PnPFolder','Add-PnPHtmlPublishingPageLayout','Add-PnPHubSiteAssociation','Add-PnPIndexedProperty','Add-PnPJavaScriptBlock','Add-PnPJavaScriptLink','Add-PnPListFoldersToProvisioningTemplate','Add-PnPListItem','Add-PnPMasterPage','Add-PnPNavigationNode','Test-PnPOffice365GroupAliasIsUsed','Add-PnPOffice365GroupToSite','Add-PnPProvisioningTemplate','Add-PnPPublishingImageRendition','Add-PnPPublishingPage','Add-PnPPublishingPageLayout','Add-PnPRoleDefinition','Add-PnPSiteClassification','Add-PnPSiteCollectionAdmin','Add-PnPSiteCollectionAppCatalog','Add-PnPSiteDesign','Add-PnPSiteDesignTask','Add-PnPSiteScript','Add-PnPStoredCredential','Add-PnPTaxonomyField','Add-PnPTenantCdnOrigin','Add-PnPTenantSequence','Add-PnPTenantSequenceSite','Add-PnPTenantSequenceSubSite','Add-PnPTenantTheme','Add-PnPUserToGroup','Add-PnPView','Add-PnPWebhookSubscription','Add-PnPWebPartToWebPartPage','Add-PnPWebPartToWikiPage','Add-PnPWikiPage','Add-PnPWorkflowDefinition','Add-PnPWorkflowSubscription','Apply-PnPProvisioningTemplate','Set-PnPSitePolicy','Apply-PnPTenantTemplate','Approve-PnPTenantServicePrincipalPermissionRequest','Clear-PnPDefaultColumnValues','Clear-PnPListItemAsRecord','Clear-PnPRecycleBinItem','Clear-PnPTenantRecycleBinItem','Connect-PnPOnline','Connect-PnPMicrosoftGraph','Convert-PnPFolderToProvisioningTemplate','Convert-PnPProvisioningTemplate','ConvertTo-PnPClientSidePage','Copy-PnPFile','Deny-PnPTenantServicePrincipalPermissionRequest','Disable-PnPFeature','Disable-PnPInPlaceRecordsManagementForSite','Disable-PnPPowerShellTelemetry','Disable-PnPResponsiveUI','Disable-PnPSiteClassification','Disable-PnPTenantServicePrincipal','Disconnect-PnPOnline','Enable-PnPCommSite','Enable-PnPFeature','Enable-PnPInPlaceRecordsManagementForSite','Enable-PnPPowerShellTelemetry','Enable-PnPResponsiveUI','Enable-PnPSiteClassification','Enable-PnPTenantServicePrincipal','Get-PnPProperty','Export-PnPClientSidePage','Export-PnPClientSidePageMapping','Export-PnPTaxonomy','Export-PnPTermGroupToXml','Find-PnPFile','Get-PnPAlert','Get-PnPApp','Get-PnPAppInstance','Get-PnPAuditing','Get-PnPAuthenticationRealm','Get-PnPAvailableClientSideComponents','Get-PnPAzureADManifestKeyCredentials','Get-PnPClientSideComponent','Get-PnPClientSidePage','Get-PnPContentType','Get-PnPContentTypePublishingHubUrl','Get-PnPCustomAction','Get-PnPDefaultColumnValues','Get-PnPDocumentSetTemplate','Get-PnPEventReceiver','Get-PnPException','Get-PnPFeature','Get-PnPField','Get-PnPFile','Get-PnPFolder','Get-PnPFolderItem','Get-PnPGroup','Get-PnPGroupMembers','Get-PnPGroupPermissions','Get-PnPHealthScore','Get-PnPHideDefaultThemes','Get-PnPHomePage','Get-PnPHomeSite','Get-PnPHubSite','Get-PnPIndexedPropertyKeys','Get-PnPInPlaceRecordsManagement','Get-PnPJavaScriptLink','Get-PnPList','Get-PnPLabel','Get-PnPListInformationRightsManagement','Get-PnPListItem','Get-PnPListRecordDeclaration','Get-PnPMasterPage','Get-PnPNavigationNode','Get-PnPAccessToken','Get-PnPAzureCertificate','Get-PnPAppAuthAccessToken','Get-PnPConnection','Get-PnPSiteCollectionTermStore','Get-PnPStorageEntity','Get-PnPPowerShellTelemetryEnabled','Get-PnPPropertyBag','Get-PnPProvisioningTemplate','Get-PnPPublishingImageRendition','Get-PnPRecycleBinItem','Get-PnPRequestAccessEmails','Get-PnPRoleDefinition','Get-PnPSearchConfiguration','Get-PnPSearchCrawlLog','Get-PnPSite','Get-PnPSiteClassification','Get-PnPSiteClosure','Get-PnPSiteCollectionAdmin','Get-PnPSiteDesign','Get-PnPSiteDesignRights','Get-PnPSiteDesignRun','Get-PnPSiteDesignRunStatus','Get-PnPSiteDesignTask','Get-PnPSitePolicy','Get-PnPSiteScript','Get-PnPSiteSearchQueryResults','Get-PnPContext','Get-PnPStoredCredential','Get-PnPSubWebs','Get-PnPTaxonomyItem','Get-PnPTaxonomySession','Get-PnPTenant','Get-PnPTenantAppCatalogUrl','Get-PnPTenantCdnEnabled','Get-PnPTenantCdnOrigin','Get-PnPTenantCdnPolicies','Get-PnPTenantRecycleBinItem','Get-PnPTenantSequence','Get-PnPTenantSequenceSite','Get-PnPTenantServicePrincipal','Get-PnPTenantServicePrincipalPermissionGrants','Get-PnPTenantServicePrincipalPermissionRequests','Get-PnPTenantSite','Get-PnPTenantTheme','Get-PnPTerm','Get-PnPTermGroup','Get-PnPTermSet','Get-PnPTheme','Get-PnPTimeZoneId','Get-PnPUnifiedGroup','Get-PnPUnifiedGroupMembers','Get-PnPUnifiedGroupOwners','Get-PnPUPABulkImportStatus','Get-PnPUser','Get-PnPUserProfileProperty','Get-PnPView','Get-PnPWeb','Get-PnPWebhookSubscriptions','Get-PnPWebPart','Get-PnPWebPartProperty','Get-PnPWebPartXml','Get-PnPWebTemplates','Get-PnPWikiPageContent','Get-PnPWorkflowDefinition','Get-PnPWorkflowInstance','Get-PnPWorkflowSubscription','Grant-PnPHubSiteRights','Grant-PnPSiteDesignRights','Grant-PnPTenantServicePrincipalPermission','Import-PnPAppPackage','Import-PnPTaxonomy','Import-PnPTermGroupFromXml','Import-PnPTermSet','Install-PnPApp','Install-PnPSolution','Invoke-PnPQuery','Invoke-PnPSiteDesign','Invoke-PnPSPRestMethod','Invoke-PnPWebAction','Measure-PnPList','Measure-PnPWeb','Measure-PnPResponseTime','Move-PnPClientSideComponent','Move-PnPFile','Move-PnPFolder','Move-PnPListItemToRecycleBin','Move-PnPRecycleBinItem','New-PnPExtensibilityHandlerObject','New-PnPGroup','New-PnPList','New-PnPPersonalSite','New-PnPAzureCertificate','New-PnPUnifiedGroup','New-PnPProvisioningTemplate','New-PnPProvisioningTemplateFromFolder','New-PnPSite','New-PnPTenantSequence','New-PnPTenantSequenceCommunicationSite','New-PnPTenantSequenceTeamNoGroupSite','New-PnPTenantSequenceTeamNoGroupSubSite','New-PnPTenantSequenceTeamSite','New-PnPTenantSite','New-PnPTenantTemplate','New-PnPTerm','New-PnPTermGroup','New-PnPTermSet','New-PnPUPABulkImportJob','New-PnPUser','New-PnPWeb','Publish-PnPApp','Read-PnPProvisioningTemplate','Read-PnPTenantTemplate','Register-PnPHubSite','Remove-PnPAlert','Remove-PnPApp','Remove-PnPClientSideComponent','Remove-PnPClientSidePage','Remove-PnPContentType','Remove-PnPContentTypeFromDocumentSet','Remove-PnPContentTypeFromList','Remove-PnPCustomAction','Remove-PnPIndexedProperty','Remove-PnPEventReceiver','Remove-PnPField','Remove-PnPFieldFromContentType','Remove-PnPFile','Remove-PnPFileFromProvisioningTemplate','Remove-PnPFolder','Remove-PnPGroup','Remove-PnPHomeSite','Remove-PnPHubSiteAssociation','Remove-PnPJavaScriptLink','Remove-PnPList','Remove-PnPListItem','Remove-PnPNavigationNode','Remove-PnPStorageEntity','Remove-PnPPropertyBagValue','Remove-PnPPublishingImageRendition','Remove-PnPRoleDefinition','Remove-PnPSearchConfiguration','Remove-PnPTenantSite','Remove-PnPSiteClassification','Remove-PnPSiteCollectionAdmin','Remove-PnPSiteCollectionAppCatalog','Remove-PnPSiteDesign','Remove-PnPSiteDesignTask','Remove-PnPSiteScript','Remove-PnPStoredCredential','Remove-PnPTaxonomyItem','Remove-PnPTenantCdnOrigin','Remove-PnPTenantTheme','Remove-PnPTermGroup','Remove-PnPUnifiedGroup','Remove-PnPUser','Remove-PnPUserFromGroup','Remove-PnPView','Remove-PnPWeb','Remove-PnPWebhookSubscription','Remove-PnPWebPart','Remove-PnPWikiPage','Remove-PnPWorkflowDefinition','Remove-PnPWorkflowSubscription','Rename-PnPFile','Rename-PnPFolder','Request-PnPReIndexList','Request-PnPReIndexWeb','Reset-PnPFileVersion','Resolve-PnPFolder','Restore-PnPRecycleBinItem','Restore-PnPTenantRecycleBinItem','Resume-PnPWorkflowInstance','Revoke-PnPSiteDesignRights','Revoke-PnPTenantServicePrincipalPermission','Save-PnPClientSidePageConversionLog','Save-PnPProvisioningTemplate','Save-PnPTenantTemplate','Send-PnPMail','Set-PnPAppSideLoading','Set-PnPAuditing','Set-PnPAvailablePageLayouts','Set-PnPClientSidePage','Set-PnPClientSideText','Set-PnPClientSideWebPart','Set-PnPContext','Set-PnPDefaultColumnValues','Set-PnPDefaultContentTypeToList','Set-PnPDefaultPageLayout','Set-PnPField','Set-PnPDocumentSetField','Set-PnPFileCheckedIn','Set-PnPFileCheckedOut','Set-PnPGroup','Set-PnPGroupPermissions','Set-PnPHideDefaultThemes','Set-PnPHomePage','Set-PnPHomeSite','Set-PnPHubSite','Set-PnPIndexedProperties','Set-PnPInPlaceRecordsManagement','Set-PnPList','Set-PnPLabel','Set-PnPListInformationRightsManagement','Set-PnPListItem','Set-PnPListItemAsRecord','Set-PnPListItemPermission','Set-PnPListPermission','Set-PnPListRecordDeclaration','Set-PnPMasterPage','Set-PnPMinimalDownloadStrategy','Set-PnPStorageEntity','Set-PnPPropertyBagValue','Set-PnPProvisioningTemplateMetadata','Set-PnPRequestAccessEmails','Set-PnPSearchConfiguration','Set-PnPSite','Set-PnPSiteClosure','Set-PnPSiteDesign','Set-PnPSiteScript','Set-PnPTaxonomyFieldValue','Set-PnPTenant','Set-PnPTenantCdnEnabled','Set-PnPTenantCdnPolicy','Set-PnPTenantSite','Set-PnPTheme','Set-PnPTraceLog','Set-PnPUnifiedGroup','Set-PnPUserProfileProperty','Set-PnPView','Set-PnPWeb','Set-PnPWebhookSubscription','Set-PnPWebPartProperty','Set-PnPWebPermission','Set-PnPWebTheme','Set-PnPWikiPageContent','Copy-PnPItemProxy','Move-PnPItemProxy','Start-PnPWorkflowInstance','Stop-PnPWorkflowInstance','Submit-PnPSearchQuery','Sync-PnPAppToTeams','Test-PnPListItemIsRecord','Test-PnPTenantTemplate','Uninstall-PnPApp','Uninstall-PnPAppInstance','Uninstall-PnPSolution','Unpublish-PnPApp','Unregister-PnPHubSite','Update-PnPApp','Update-PnPSiteClassification'
    VariablesToExport = '*'
    AliasesToExport = '*'
    FormatsToProcess = 'SharePointPnP.PowerShell.Online.Commands.Format.ps1xml' 
    PrivateData = @{
        PSData = @{
            ProjectUri = 'https://aka.ms/sppnp'
            IconUri = 'https://raw.githubusercontent.com/pnp/media/master/optimized/pnp-projects/blue/png/pnp-powershell-300.png'
        }
    }
}
# SIG # Begin signature block
# MIIjhgYJKoZIhvcNAQcCoIIjdzCCI3MCAQExDzANBglghkgBZQMEAgEFADB5Bgor
# BgEEAYI3AgEEoGswaTA0BgorBgEEAYI3AgEeMCYCAwEAAAQQH8w7YFlLCE63JNLG
# KX7zUQIBAAIBAAIBAAIBAAIBADAxMA0GCWCGSAFlAwQCAQUABCD6ojDUPXBK5cFy
# 8fTpAgcBViyfhXi8TyRgG0KIN3SScaCCDYEwggX/MIID56ADAgECAhMzAAABA14l
# HJkfox64AAAAAAEDMA0GCSqGSIb3DQEBCwUAMH4xCzAJBgNVBAYTAlVTMRMwEQYD
# VQQIEwpXYXNoaW5ndG9uMRAwDgYDVQQHEwdSZWRtb25kMR4wHAYDVQQKExVNaWNy
# b3NvZnQgQ29ycG9yYXRpb24xKDAmBgNVBAMTH01pY3Jvc29mdCBDb2RlIFNpZ25p
# bmcgUENBIDIwMTEwHhcNMTgwNzEyMjAwODQ4WhcNMTkwNzI2MjAwODQ4WjB0MQsw
# CQYDVQQGEwJVUzETMBEGA1UECBMKV2FzaGluZ3RvbjEQMA4GA1UEBxMHUmVkbW9u
# ZDEeMBwGA1UEChMVTWljcm9zb2Z0IENvcnBvcmF0aW9uMR4wHAYDVQQDExVNaWNy
# b3NvZnQgQ29ycG9yYXRpb24wggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIB
# AQDRlHY25oarNv5p+UZ8i4hQy5Bwf7BVqSQdfjnnBZ8PrHuXss5zCvvUmyRcFrU5
# 3Rt+M2wR/Dsm85iqXVNrqsPsE7jS789Xf8xly69NLjKxVitONAeJ/mkhvT5E+94S
# nYW/fHaGfXKxdpth5opkTEbOttU6jHeTd2chnLZaBl5HhvU80QnKDT3NsumhUHjR
# hIjiATwi/K+WCMxdmcDt66VamJL1yEBOanOv3uN0etNfRpe84mcod5mswQ4xFo8A
# DwH+S15UD8rEZT8K46NG2/YsAzoZvmgFFpzmfzS/p4eNZTkmyWPU78XdvSX+/Sj0
# NIZ5rCrVXzCRO+QUauuxygQjAgMBAAGjggF+MIIBejAfBgNVHSUEGDAWBgorBgEE
# AYI3TAgBBggrBgEFBQcDAzAdBgNVHQ4EFgQUR77Ay+GmP/1l1jjyA123r3f3QP8w
# UAYDVR0RBEkwR6RFMEMxKTAnBgNVBAsTIE1pY3Jvc29mdCBPcGVyYXRpb25zIFB1
# ZXJ0byBSaWNvMRYwFAYDVQQFEw0yMzAwMTIrNDM3OTY1MB8GA1UdIwQYMBaAFEhu
# ZOVQBdOCqhc3NyK1bajKdQKVMFQGA1UdHwRNMEswSaBHoEWGQ2h0dHA6Ly93d3cu
# bWljcm9zb2Z0LmNvbS9wa2lvcHMvY3JsL01pY0NvZFNpZ1BDQTIwMTFfMjAxMS0w
# Ny0wOC5jcmwwYQYIKwYBBQUHAQEEVTBTMFEGCCsGAQUFBzAChkVodHRwOi8vd3d3
# Lm1pY3Jvc29mdC5jb20vcGtpb3BzL2NlcnRzL01pY0NvZFNpZ1BDQTIwMTFfMjAx
# MS0wNy0wOC5jcnQwDAYDVR0TAQH/BAIwADANBgkqhkiG9w0BAQsFAAOCAgEAn/XJ
# Uw0/DSbsokTYDdGfY5YGSz8eXMUzo6TDbK8fwAG662XsnjMQD6esW9S9kGEX5zHn
# wya0rPUn00iThoj+EjWRZCLRay07qCwVlCnSN5bmNf8MzsgGFhaeJLHiOfluDnjY
# DBu2KWAndjQkm925l3XLATutghIWIoCJFYS7mFAgsBcmhkmvzn1FFUM0ls+BXBgs
# 1JPyZ6vic8g9o838Mh5gHOmwGzD7LLsHLpaEk0UoVFzNlv2g24HYtjDKQ7HzSMCy
# RhxdXnYqWJ/U7vL0+khMtWGLsIxB6aq4nZD0/2pCD7k+6Q7slPyNgLt44yOneFuy
# bR/5WcF9ttE5yXnggxxgCto9sNHtNr9FB+kbNm7lPTsFA6fUpyUSj+Z2oxOzRVpD
# MYLa2ISuubAfdfX2HX1RETcn6LU1hHH3V6qu+olxyZjSnlpkdr6Mw30VapHxFPTy
# 2TUxuNty+rR1yIibar+YRcdmstf/zpKQdeTr5obSyBvbJ8BblW9Jb1hdaSreU0v4
# 6Mp79mwV+QMZDxGFqk+av6pX3WDG9XEg9FGomsrp0es0Rz11+iLsVT9qGTlrEOla
# P470I3gwsvKmOMs1jaqYWSRAuDpnpAdfoP7YO0kT+wzh7Qttg1DO8H8+4NkI6Iwh
# SkHC3uuOW+4Dwx1ubuZUNWZncnwa6lL2IsRyP64wggd6MIIFYqADAgECAgphDpDS
# AAAAAAADMA0GCSqGSIb3DQEBCwUAMIGIMQswCQYDVQQGEwJVUzETMBEGA1UECBMK
# V2FzaGluZ3RvbjEQMA4GA1UEBxMHUmVkbW9uZDEeMBwGA1UEChMVTWljcm9zb2Z0
# IENvcnBvcmF0aW9uMTIwMAYDVQQDEylNaWNyb3NvZnQgUm9vdCBDZXJ0aWZpY2F0
# ZSBBdXRob3JpdHkgMjAxMTAeFw0xMTA3MDgyMDU5MDlaFw0yNjA3MDgyMTA5MDla
# MH4xCzAJBgNVBAYTAlVTMRMwEQYDVQQIEwpXYXNoaW5ndG9uMRAwDgYDVQQHEwdS
# ZWRtb25kMR4wHAYDVQQKExVNaWNyb3NvZnQgQ29ycG9yYXRpb24xKDAmBgNVBAMT
# H01pY3Jvc29mdCBDb2RlIFNpZ25pbmcgUENBIDIwMTEwggIiMA0GCSqGSIb3DQEB
# AQUAA4ICDwAwggIKAoICAQCr8PpyEBwurdhuqoIQTTS68rZYIZ9CGypr6VpQqrgG
# OBoESbp/wwwe3TdrxhLYC/A4wpkGsMg51QEUMULTiQ15ZId+lGAkbK+eSZzpaF7S
# 35tTsgosw6/ZqSuuegmv15ZZymAaBelmdugyUiYSL+erCFDPs0S3XdjELgN1q2jz
# y23zOlyhFvRGuuA4ZKxuZDV4pqBjDy3TQJP4494HDdVceaVJKecNvqATd76UPe/7
# 4ytaEB9NViiienLgEjq3SV7Y7e1DkYPZe7J7hhvZPrGMXeiJT4Qa8qEvWeSQOy2u
# M1jFtz7+MtOzAz2xsq+SOH7SnYAs9U5WkSE1JcM5bmR/U7qcD60ZI4TL9LoDho33
# X/DQUr+MlIe8wCF0JV8YKLbMJyg4JZg5SjbPfLGSrhwjp6lm7GEfauEoSZ1fiOIl
# XdMhSz5SxLVXPyQD8NF6Wy/VI+NwXQ9RRnez+ADhvKwCgl/bwBWzvRvUVUvnOaEP
# 6SNJvBi4RHxF5MHDcnrgcuck379GmcXvwhxX24ON7E1JMKerjt/sW5+v/N2wZuLB
# l4F77dbtS+dJKacTKKanfWeA5opieF+yL4TXV5xcv3coKPHtbcMojyyPQDdPweGF
# RInECUzF1KVDL3SV9274eCBYLBNdYJWaPk8zhNqwiBfenk70lrC8RqBsmNLg1oiM
# CwIDAQABo4IB7TCCAekwEAYJKwYBBAGCNxUBBAMCAQAwHQYDVR0OBBYEFEhuZOVQ
# BdOCqhc3NyK1bajKdQKVMBkGCSsGAQQBgjcUAgQMHgoAUwB1AGIAQwBBMAsGA1Ud
# DwQEAwIBhjAPBgNVHRMBAf8EBTADAQH/MB8GA1UdIwQYMBaAFHItOgIxkEO5FAVO
# 4eqnxzHRI4k0MFoGA1UdHwRTMFEwT6BNoEuGSWh0dHA6Ly9jcmwubWljcm9zb2Z0
# LmNvbS9wa2kvY3JsL3Byb2R1Y3RzL01pY1Jvb0NlckF1dDIwMTFfMjAxMV8wM18y
# Mi5jcmwwXgYIKwYBBQUHAQEEUjBQME4GCCsGAQUFBzAChkJodHRwOi8vd3d3Lm1p
# Y3Jvc29mdC5jb20vcGtpL2NlcnRzL01pY1Jvb0NlckF1dDIwMTFfMjAxMV8wM18y
# Mi5jcnQwgZ8GA1UdIASBlzCBlDCBkQYJKwYBBAGCNy4DMIGDMD8GCCsGAQUFBwIB
# FjNodHRwOi8vd3d3Lm1pY3Jvc29mdC5jb20vcGtpb3BzL2RvY3MvcHJpbWFyeWNw
# cy5odG0wQAYIKwYBBQUHAgIwNB4yIB0ATABlAGcAYQBsAF8AcABvAGwAaQBjAHkA
# XwBzAHQAYQB0AGUAbQBlAG4AdAAuIB0wDQYJKoZIhvcNAQELBQADggIBAGfyhqWY
# 4FR5Gi7T2HRnIpsLlhHhY5KZQpZ90nkMkMFlXy4sPvjDctFtg/6+P+gKyju/R6mj
# 82nbY78iNaWXXWWEkH2LRlBV2AySfNIaSxzzPEKLUtCw/WvjPgcuKZvmPRul1LUd
# d5Q54ulkyUQ9eHoj8xN9ppB0g430yyYCRirCihC7pKkFDJvtaPpoLpWgKj8qa1hJ
# Yx8JaW5amJbkg/TAj/NGK978O9C9Ne9uJa7lryft0N3zDq+ZKJeYTQ49C/IIidYf
# wzIY4vDFLc5bnrRJOQrGCsLGra7lstnbFYhRRVg4MnEnGn+x9Cf43iw6IGmYslmJ
# aG5vp7d0w0AFBqYBKig+gj8TTWYLwLNN9eGPfxxvFX1Fp3blQCplo8NdUmKGwx1j
# NpeG39rz+PIWoZon4c2ll9DuXWNB41sHnIc+BncG0QaxdR8UvmFhtfDcxhsEvt9B
# xw4o7t5lL+yX9qFcltgA1qFGvVnzl6UJS0gQmYAf0AApxbGbpT9Fdx41xtKiop96
# eiL6SJUfq/tHI4D1nvi/a7dLl+LrdXga7Oo3mXkYS//WsyNodeav+vyL6wuA6mk7
# r/ww7QRMjt/fdW1jkT3RnVZOT7+AVyKheBEyIXrvQQqxP/uozKRdwaGIm1dxVk5I
# RcBCyZt2WwqASGv9eZ/BvW1taslScxMNelDNMYIVWzCCFVcCAQEwgZUwfjELMAkG
# A1UEBhMCVVMxEzARBgNVBAgTCldhc2hpbmd0b24xEDAOBgNVBAcTB1JlZG1vbmQx
# HjAcBgNVBAoTFU1pY3Jvc29mdCBDb3Jwb3JhdGlvbjEoMCYGA1UEAxMfTWljcm9z
# b2Z0IENvZGUgU2lnbmluZyBQQ0EgMjAxMQITMwAAAQNeJRyZH6MeuAAAAAABAzAN
# BglghkgBZQMEAgEFAKCBrjAZBgkqhkiG9w0BCQMxDAYKKwYBBAGCNwIBBDAcBgor
# BgEEAYI3AgELMQ4wDAYKKwYBBAGCNwIBFTAvBgkqhkiG9w0BCQQxIgQgCX9ppEpU
# pSGMxysMyhXaZ6/qCuZc7wLubcuviPl/KaAwQgYKKwYBBAGCNwIBDDE0MDKgFIAS
# AE0AaQBjAHIAbwBzAG8AZgB0oRqAGGh0dHA6Ly93d3cubWljcm9zb2Z0LmNvbTAN
# BgkqhkiG9w0BAQEFAASCAQC4EoboLi4TwiR8wfWuslYPwCJviA/3c5/4UDWeQVoX
# Madq2EX3bQwqO6cJExJwHeRkSs8uk0+EJRRgwBxGo35alt57Qf6C9RhjQesqFiJ0
# M4EERIuIzrlXzRvmloN+Ud3SavMB9Q72Dmu57UYxaRdoy4IXZNEMiBvmEtkvRuVl
# 1h+aq2n6S/Zm75ceZ6ek5yHMSQMisIoIH0CnMjCgBKNEdhXmvmLOGjbctq+wEfvB
# /HCTjkx2MvC+fBgN0f7UkP08hA2Wzp/uBhTmNRt+GEGywZ4Lvzlw7/UoyyeyCMM8
# UlT/LqkOelPrS36ynbAIcxzRgmCZsBG9b3tkhdWeG2AkoYIS5TCCEuEGCisGAQQB
# gjcDAwExghLRMIISzQYJKoZIhvcNAQcCoIISvjCCEroCAQMxDzANBglghkgBZQME
# AgEFADCCAVEGCyqGSIb3DQEJEAEEoIIBQASCATwwggE4AgEBBgorBgEEAYRZCgMB
# MDEwDQYJYIZIAWUDBAIBBQAEIDhK0kb/NrRpVqUK7odmP/KexyjoPfnPja2lF8Lc
# cq2qAgZcy0f33ikYEzIwMTkwNjA3MDkzNzI5LjYzMlowBIACAfSggdCkgc0wgcox
# CzAJBgNVBAYTAlVTMQswCQYDVQQIEwJXQTEQMA4GA1UEBxMHUmVkbW9uZDEeMBwG
# A1UEChMVTWljcm9zb2Z0IENvcnBvcmF0aW9uMS0wKwYDVQQLEyRNaWNyb3NvZnQg
# SXJlbGFuZCBPcGVyYXRpb25zIExpbWl0ZWQxJjAkBgNVBAsTHVRoYWxlcyBUU1Mg
# RVNOOkEyNDAtNEI4Mi0xMzBFMSUwIwYDVQQDExxNaWNyb3NvZnQgVGltZS1TdGFt
# cCBzZXJ2aWNloIIOPDCCBPEwggPZoAMCAQICEzMAAADgship1NHCtPcAAAAAAOAw
# DQYJKoZIhvcNAQELBQAwfDELMAkGA1UEBhMCVVMxEzARBgNVBAgTCldhc2hpbmd0
# b24xEDAOBgNVBAcTB1JlZG1vbmQxHjAcBgNVBAoTFU1pY3Jvc29mdCBDb3Jwb3Jh
# dGlvbjEmMCQGA1UEAxMdTWljcm9zb2Z0IFRpbWUtU3RhbXAgUENBIDIwMTAwHhcN
# MTgwODIzMjAyNzAxWhcNMTkxMTIzMjAyNzAxWjCByjELMAkGA1UEBhMCVVMxCzAJ
# BgNVBAgTAldBMRAwDgYDVQQHEwdSZWRtb25kMR4wHAYDVQQKExVNaWNyb3NvZnQg
# Q29ycG9yYXRpb24xLTArBgNVBAsTJE1pY3Jvc29mdCBJcmVsYW5kIE9wZXJhdGlv
# bnMgTGltaXRlZDEmMCQGA1UECxMdVGhhbGVzIFRTUyBFU046QTI0MC00QjgyLTEz
# MEUxJTAjBgNVBAMTHE1pY3Jvc29mdCBUaW1lLVN0YW1wIHNlcnZpY2UwggEiMA0G
# CSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQDCl/hnDsembJx7FMS5RuaJsiQJDP0t
# iqyeCettiNlGcNoa428oVtblH6yZatCXZygyhzbnDJofTHIGtdiEzQc5fPhddfTd
# 4hEQgd5ch/BlGITXFEwJ4d/GhHZQ1hbLdiBT/j67Qx15VeuXy5n/jM9PvIbBksSW
# wX8vrkhRT/rqa1xWrmF+SfcYKw+pC+d3tUHrgACo0YaVHuS3jlpXg33A+pul8wib
# ZBcGxMF1CqwlP0AfMW60Dp4qm/JLbWxdx/pOiiOrM/tykFDtEnN07HXRjXDhDhfI
# eBCz4GPiCEFk94AaFxysFeFn9vyz7TyKJxUksXJhtWGq2i4WmPcphyDzAgMBAAGj
# ggEbMIIBFzAdBgNVHQ4EFgQUa0HTCrY5zqzv/p44rWuSbXaAh+gwHwYDVR0jBBgw
# FoAU1WM6XIoxkPNDe3xGG8UzaFqFbVUwVgYDVR0fBE8wTTBLoEmgR4ZFaHR0cDov
# L2NybC5taWNyb3NvZnQuY29tL3BraS9jcmwvcHJvZHVjdHMvTWljVGltU3RhUENB
# XzIwMTAtMDctMDEuY3JsMFoGCCsGAQUFBwEBBE4wTDBKBggrBgEFBQcwAoY+aHR0
# cDovL3d3dy5taWNyb3NvZnQuY29tL3BraS9jZXJ0cy9NaWNUaW1TdGFQQ0FfMjAx
# MC0wNy0wMS5jcnQwDAYDVR0TAQH/BAIwADATBgNVHSUEDDAKBggrBgEFBQcDCDAN
# BgkqhkiG9w0BAQsFAAOCAQEACx/endmS5DW6xgb8fIdEqI963fUB7IoYlYNQU/YZ
# wq155uK1lwhcH5R1CaVMr+lyNIfD8l+lqy8mdou+Zwcrnzo3m2UEGO0uNFd4c8Ie
# w5Z49V+6AojT6z5IGJh3y56uDACQzRZrR+26uCx1nLsYjK/WtxQDq1IHHWeAxfrG
# xsAZO1BdQo25Mx34ZseViVj+usfmy0nUmfvZ0hFcMeNd4i4Kds03kY/CwWVZBw62
# tAjOHK/c81wO7hiutu9JX4MNjaEuFdheiNwmHyAmbpqYmz6K+9IPM75iXELbzjDc
# 6yLJpVOq17gfVDCaweryzgVnC2CIxq7gDGyTM9afwMtESTCCBnEwggRZoAMCAQIC
# CmEJgSoAAAAAAAIwDQYJKoZIhvcNAQELBQAwgYgxCzAJBgNVBAYTAlVTMRMwEQYD
# VQQIEwpXYXNoaW5ndG9uMRAwDgYDVQQHEwdSZWRtb25kMR4wHAYDVQQKExVNaWNy
# b3NvZnQgQ29ycG9yYXRpb24xMjAwBgNVBAMTKU1pY3Jvc29mdCBSb290IENlcnRp
# ZmljYXRlIEF1dGhvcml0eSAyMDEwMB4XDTEwMDcwMTIxMzY1NVoXDTI1MDcwMTIx
# NDY1NVowfDELMAkGA1UEBhMCVVMxEzARBgNVBAgTCldhc2hpbmd0b24xEDAOBgNV
# BAcTB1JlZG1vbmQxHjAcBgNVBAoTFU1pY3Jvc29mdCBDb3Jwb3JhdGlvbjEmMCQG
# A1UEAxMdTWljcm9zb2Z0IFRpbWUtU3RhbXAgUENBIDIwMTAwggEiMA0GCSqGSIb3
# DQEBAQUAA4IBDwAwggEKAoIBAQCpHQ28dxGKOiDs/BOX9fp/aZRrdFQQ1aUKAIKF
# ++18aEssX8XD5WHCdrc+Zitb8BVTJwQxH0EbGpUdzgkTjnxhMFmxMEQP8WCIhFRD
# DNdNuDgIs0Ldk6zWczBXJoKjRQ3Q6vVHgc2/JGAyWGBG8lhHhjKEHnRhZ5FfgVSx
# z5NMksHEpl3RYRNuKMYa+YaAu99h/EbBJx0kZxJyGiGKr0tkiVBisV39dx898Fd1
# rL2KQk1AUdEPnAY+Z3/1ZsADlkR+79BL/W7lmsqxqPJ6Kgox8NpOBpG2iAg16Hgc
# sOmZzTznL0S6p/TcZL2kAcEgCZN4zfy8wMlEXV4WnAEFTyJNAgMBAAGjggHmMIIB
# 4jAQBgkrBgEEAYI3FQEEAwIBADAdBgNVHQ4EFgQU1WM6XIoxkPNDe3xGG8UzaFqF
# bVUwGQYJKwYBBAGCNxQCBAweCgBTAHUAYgBDAEEwCwYDVR0PBAQDAgGGMA8GA1Ud
# EwEB/wQFMAMBAf8wHwYDVR0jBBgwFoAU1fZWy4/oolxiaNE9lJBb186aGMQwVgYD
# VR0fBE8wTTBLoEmgR4ZFaHR0cDovL2NybC5taWNyb3NvZnQuY29tL3BraS9jcmwv
# cHJvZHVjdHMvTWljUm9vQ2VyQXV0XzIwMTAtMDYtMjMuY3JsMFoGCCsGAQUFBwEB
# BE4wTDBKBggrBgEFBQcwAoY+aHR0cDovL3d3dy5taWNyb3NvZnQuY29tL3BraS9j
# ZXJ0cy9NaWNSb29DZXJBdXRfMjAxMC0wNi0yMy5jcnQwgaAGA1UdIAEB/wSBlTCB
# kjCBjwYJKwYBBAGCNy4DMIGBMD0GCCsGAQUFBwIBFjFodHRwOi8vd3d3Lm1pY3Jv
# c29mdC5jb20vUEtJL2RvY3MvQ1BTL2RlZmF1bHQuaHRtMEAGCCsGAQUFBwICMDQe
# MiAdAEwAZQBnAGEAbABfAFAAbwBsAGkAYwB5AF8AUwB0AGEAdABlAG0AZQBuAHQA
# LiAdMA0GCSqGSIb3DQEBCwUAA4ICAQAH5ohRDeLG4Jg/gXEDPZ2joSFvs+umzPUx
# vs8F4qn++ldtGTCzwsVmyWrf9efweL3HqJ4l4/m87WtUVwgrUYJEEvu5U4zM9GAS
# inbMQEBBm9xcF/9c+V4XNZgkVkt070IQyK+/f8Z/8jd9Wj8c8pl5SpFSAK84Dxf1
# L3mBZdmptWvkx872ynoAb0swRCQiPM/tA6WWj1kpvLb9BOFwnzJKJ/1Vry/+tuWO
# M7tiX5rbV0Dp8c6ZZpCM/2pif93FSguRJuI57BlKcWOdeyFtw5yjojz6f32WapB4
# pm3S4Zz5Hfw42JT0xqUKloakvZ4argRCg7i1gJsiOCC1JeVk7Pf0v35jWSUPei45
# V3aicaoGig+JFrphpxHLmtgOR5qAxdDNp9DvfYPw4TtxCd9ddJgiCGHasFAeb73x
# 4QDf5zEHpJM692VHeOj4qEir995yfmFrb3epgcunCaw5u+zGy9iCtHLNHfS4hQEe
# gPsbiSpUObJb2sgNVZl6h3M7COaYLeqN4DMuEin1wC9UJyH3yKxO2ii4sanblrKn
# QqLJzxlBTeCG+SqaoxFmMNO7dDJL32N79ZmKLxvHIa9Zta7cRDyXUHHXodLFVeNp
# 3lfB0d4wwP3M5k37Db9dT+mdHhk4L7zPWAUu7w2gUDXa7wknHNWzfjUeCLraNtvT
# X4/edIhJEqGCAs4wggI3AgEBMIH4oYHQpIHNMIHKMQswCQYDVQQGEwJVUzELMAkG
# A1UECBMCV0ExEDAOBgNVBAcTB1JlZG1vbmQxHjAcBgNVBAoTFU1pY3Jvc29mdCBD
# b3Jwb3JhdGlvbjEtMCsGA1UECxMkTWljcm9zb2Z0IElyZWxhbmQgT3BlcmF0aW9u
# cyBMaW1pdGVkMSYwJAYDVQQLEx1UaGFsZXMgVFNTIEVTTjpBMjQwLTRCODItMTMw
# RTElMCMGA1UEAxMcTWljcm9zb2Z0IFRpbWUtU3RhbXAgc2VydmljZaIjCgEBMAcG
# BSsOAwIaAxUAxnmkjOXedpqyHQqkJGn7ewhSC9GggYMwgYCkfjB8MQswCQYDVQQG
# EwJVUzETMBEGA1UECBMKV2FzaGluZ3RvbjEQMA4GA1UEBxMHUmVkbW9uZDEeMBwG
# A1UEChMVTWljcm9zb2Z0IENvcnBvcmF0aW9uMSYwJAYDVQQDEx1NaWNyb3NvZnQg
# VGltZS1TdGFtcCBQQ0EgMjAxMDANBgkqhkiG9w0BAQUFAAIFAOCkkzcwIhgPMjAx
# OTA2MDcxNTM5MzVaGA8yMDE5MDYwODE1MzkzNVowdzA9BgorBgEEAYRZCgQBMS8w
# LTAKAgUA4KSTNwIBADAKAgEAAgIm6AIB/zAHAgEAAgIR3DAKAgUA4KXktwIBADA2
# BgorBgEEAYRZCgQCMSgwJjAMBgorBgEEAYRZCgMCoAowCAIBAAIDB6EgoQowCAIB
# AAIDAYagMA0GCSqGSIb3DQEBBQUAA4GBAEpqKgv1ShL7Ua50NLOlG3fdHf9ToOm3
# 8+9ljO8gZwL1VyrriPs7N0M24FG0B+cWjNuCr31UTKylOZ7yxESRI8S0H4rXp9BH
# WBQ2bNAA/ENAdTuvrfzLwFCO0+qIqJsi3hr9RJ/oNPGT1B2z5pVC4rr5Vcxyi55U
# 8tqEZQFXBleJMYIDDTCCAwkCAQEwgZMwfDELMAkGA1UEBhMCVVMxEzARBgNVBAgT
# Cldhc2hpbmd0b24xEDAOBgNVBAcTB1JlZG1vbmQxHjAcBgNVBAoTFU1pY3Jvc29m
# dCBDb3Jwb3JhdGlvbjEmMCQGA1UEAxMdTWljcm9zb2Z0IFRpbWUtU3RhbXAgUENB
# IDIwMTACEzMAAADgship1NHCtPcAAAAAAOAwDQYJYIZIAWUDBAIBBQCgggFKMBoG
# CSqGSIb3DQEJAzENBgsqhkiG9w0BCRABBDAvBgkqhkiG9w0BCQQxIgQgCEW45r+D
# LDXeKbeMvEI0+0nEXGCdZEwV0Ha/6KS4wFMwgfoGCyqGSIb3DQEJEAIvMYHqMIHn
# MIHkMIG9BCClgS9VpDMosldyg1GQPVVk5wwNOD+Pcl2aoLvRrEJfkDCBmDCBgKR+
# MHwxCzAJBgNVBAYTAlVTMRMwEQYDVQQIEwpXYXNoaW5ndG9uMRAwDgYDVQQHEwdS
# ZWRtb25kMR4wHAYDVQQKExVNaWNyb3NvZnQgQ29ycG9yYXRpb24xJjAkBgNVBAMT
# HU1pY3Jvc29mdCBUaW1lLVN0YW1wIFBDQSAyMDEwAhMzAAAA4LIYqdTRwrT3AAAA
# AADgMCIEIEvWShldvRjSMHULqrpMFql6GVCmZ3Zq1dO+FTCSc86+MA0GCSqGSIb3
# DQEBCwUABIIBAAVe76mvF3+OXENgMffLQ122K3aGPU/9u3AyZ7Ak6iWcZLn00/xI
# zupkPGXYrTJ+QT5FhTUwfg4V2nABGxRCMxSv2/SKvUEMjIhoi9hkAgAs9awIOBS7
# i9UmoPO/OSlul5+BUoxp7I4f+UH9dDhEULrO7DoDd8KYYWs72iw2dqN64vNBfyFd
# zN/sfmrfFbdYHOyLLaxFLZoypJR9hdh2DS/P9Wu8BDQvZqJ+AoApfEmRMB2z7XbN
# Mgtao+G0QPiiBMtREOZALBmfBmw+7QPAyEsjOTN2vjGRfiYixHHqxwp6hYUFqzrd
# pcKsUUwkgqZLZ+CP3ozXdUKXq1dj76OmHb0=
# SIG # End signature block
