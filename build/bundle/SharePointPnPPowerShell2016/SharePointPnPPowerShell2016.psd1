@{
    RootModule = 'SharePointPnP.PowerShell.2016.Commands.dll'
    ModuleVersion = '2.23.1802.0'
    Description = 'SharePoint Patterns and Practices PowerShell Cmdlets for SharePoint 2016'
    GUID = '8f1147be-a8e4-4bd2-a705-841d5334edc0'
    Author = 'SharePoint Patterns and Practices'
    CompanyName = 'SharePoint Patterns and Practices'
    DotNetFrameworkVersion = '4.5'
    ProcessorArchitecture = 'None'
    FunctionsToExport = '*'
    CmdletsToExport = 'Add-PnPContentType','Add-PnPContentTypeToDocumentSet','Add-PnPContentTypeToList','Add-PnPCustomAction','Add-PnPDataRowsToProvisioningTemplate','Add-PnPDocumentSet','Add-PnPEventReceiver','Add-PnPField','Add-PnPFieldFromXml','Add-PnPFieldToContentType','Add-PnPFile','Add-PnPFileToProvisioningTemplate','Add-PnPFolder','Add-PnPHtmlPublishingPageLayout','Add-PnPIndexedProperty','Add-PnPJavaScriptBlock','Add-PnPJavaScriptLink','Add-PnPListFoldersToProvisioningTemplate','Add-PnPListItem','Add-PnPMasterPage','Add-PnPNavigationNode','Add-PnPPublishingImageRendition','Add-PnPPublishingPage','Add-PnPPublishingPageLayout','Add-PnPSiteCollectionAdmin','Add-PnPTaxonomyField','Add-PnPUserToGroup','Add-PnPView','Add-PnPWebPartToWebPartPage','Add-PnPWebPartToWikiPage','Add-PnPWikiPage','Add-PnPWorkflowDefinition','Add-PnPWorkflowSubscription','Apply-PnPProvisioningTemplate','Set-PnPSitePolicy','Clear-PnPRecycleBinItem','Connect-PnPOnline','Connect-PnPMicrosoftGraph','Convert-PnPProvisioningTemplate','Convert-PnPFolderToProvisioningTemplate','Copy-PnPFile','Disable-PnPFeature','Disable-PnPInPlaceRecordsManagementForSite','Disable-PnPResponsiveUI','Disconnect-PnPOnline','Enable-PnPFeature','Enable-PnPInPlaceRecordsManagementForSite','Enable-PnPResponsiveUI','Ensure-PnPFolder','Get-PnPProperty','Execute-PnPQuery','Export-PnPTaxonomy','Export-PnPTermGroupToXml','Find-PnPFile','Get-PnPAppInstance','Get-PnPAuditing','Get-PnPAuthenticationRealm','Get-PnPAzureADManifestKeyCredentials','Get-PnPContentType','Get-PnPContentTypePublishingHubUrl','Get-PnPCustomAction','Get-PnPDefaultColumnValues','Get-PnPDocumentSetTemplate','Get-PnPEventReceiver','Get-PnPFeature','Get-PnPField','Get-PnPFile','Get-PnPFolder','Get-PnPFolderItem','Get-PnPGroup','Get-PnPGroupMembers','Get-PnPGroupPermissions','Get-PnPHealthScore','Get-PnPHomePage','Get-PnPIndexedPropertyKeys','Get-PnPJavaScriptLink','Get-PnPList','Get-PnPListItem','Get-PnPMasterPage','Get-PnPAccessToken','Get-PnPAppAuthAccessToken','Get-PnPConnection','Get-PnPSiteCollectionTermStore','Get-PnPPropertyBag','Get-PnPProvisioningTemplate','Get-PnPProvisioningTemplateFromGallery','Get-PnPPublishingImageRendition','Get-PnPRecycleBinItem','Get-PnPSearchConfiguration','Get-PnPSite','Get-PnPSiteClosure','Get-PnPSiteCollectionAdmin','Get-PnPSitePolicy','Get-PnPSiteSearchQueryResults','Get-PnPContext','Get-PnPStoredCredential','Get-PnPSubWebs','Get-PnPTaxonomyItem','Get-PnPTaxonomySession','Get-PnPTerm','Get-PnPTermGroup','Get-PnPTermSet','Get-PnPTheme','Get-PnPTimeZoneId','Get-PnPUnifiedGroup','Get-PnPUser','Get-PnPUserProfileProperty','Get-PnPView','Get-PnPWeb','Get-PnPWebPart','Get-PnPWebPartProperty','Get-PnPWebPartXml','Get-PnPWikiPageContent','Get-PnPWorkflowDefinition','Get-PnPWorkflowInstance','Get-PnPWorkflowSubscription','Import-PnPAppPackage','Import-PnPTaxonomy','Import-PnPTermGroupFromXml','Import-PnPTermSet','Install-PnPSolution','Invoke-PnPWebAction','Load-PnPProvisioningTemplate','Measure-PnPList','Measure-PnPWeb','Measure-PnPResponseTime','Move-PnPFile','Move-PnPListItemToRecycleBin','New-PnPExtensibilityHandlerObject','New-PnPGroup','New-PnPList','New-PnPUnifiedGroup','New-PnPProvisioningTemplate','New-PnPProvisioningTemplateFromFolder','New-PnPTenantSite','New-PnPTerm','New-PnPTermGroup','New-PnPTermSet','New-PnPUser','New-PnPWeb','Remove-PnPContentType','Remove-PnPContentTypeFromDocumentSet','Remove-PnPContentTypeFromList','Remove-PnPCustomAction','Remove-PnPIndexedProperty','Remove-PnPEventReceiver','Remove-PnPField','Remove-PnPFieldFromContentType','Remove-PnPFile','Remove-PnPFileFromProvisioningTemplate','Remove-PnPFolder','Remove-PnPGroup','Remove-PnPJavaScriptLink','Remove-PnPList','Remove-PnPListItem','Remove-PnPNavigationNode','Remove-PnPPropertyBagValue','Remove-PnPPublishingImageRendition','Remove-PnPSiteCollectionAdmin','Remove-PnPTaxonomyItem','Remove-PnPTermGroup','Remove-PnPUnifiedGroup','Remove-PnPUser','Remove-PnPUserFromGroup','Remove-PnPView','Remove-PnPWeb','Remove-PnPWebPart','Remove-PnPWikiPage','Remove-PnPWorkflowDefinition','Remove-PnPWorkflowSubscription','Rename-PnPFile','Request-PnPReIndexList','Request-PnPReIndexWeb','Restore-PnPRecycleBinItem','Resume-PnPWorkflowInstance','Save-PnPProvisioningTemplate','Send-PnPMail','Set-PnPAppSideLoading','Set-PnPAuditing','Set-PnPAvailablePageLayouts','Set-PnPContext','Set-PnPDefaultColumnValues','Set-PnPDefaultContentTypeToList','Set-PnPDefaultPageLayout','Set-PnPField','Set-PnPDocumentSetField','Set-PnPFileCheckedIn','Set-PnPFileCheckedOut','Set-PnPGroup','Set-PnPGroupPermissions','Set-PnPHomePage','Set-PnPIndexedProperties','Set-PnPInPlaceRecordsManagement','Set-PnPList','Set-PnPListItem','Set-PnPListItemPermission','Set-PnPListPermission','Set-PnPMasterPage','Set-PnPMinimalDownloadStrategy','Set-PnPPropertyBagValue','Set-PnPProvisioningTemplateMetadata','Set-PnPSearchConfiguration','Set-PnPSiteClosure','Set-PnPTaxonomyFieldValue','Set-PnPTheme','Set-PnPTraceLog','Set-PnPUnifiedGroup','Set-PnPView','Set-PnPWeb','Set-PnPWebPartProperty','Set-PnPWebPermission','Set-PnPWikiPageContent','Copy-PnPItemProxy','Move-PnPItemProxy','Start-PnPWorkflowInstance','Stop-PnPWorkflowInstance','Submit-PnPSearchQuery','Uninstall-PnPAppInstance','Uninstall-PnPSolution'
    VariablesToExport = '*'
    FormatsToProcess = 'SharePointPnP.PowerShell.2016.Commands.Format.ps1xml' 
    PrivateData = @{
        PSData = @{
            ProjectUri = 'https://aka.ms/sppnp'
            IconUri = 'https://raw.githubusercontent.com/SharePoint/PnP-PowerShell/master/Commands/Resources/pnp.ico'
        }
    }
}
# SIG # Begin signature block
# MIIj7AYJKoZIhvcNAQcCoIIj3TCCI9kCAQExDzANBglghkgBZQMEAgEFADB5Bgor
# BgEEAYI3AgEEoGswaTA0BgorBgEEAYI3AgEeMCYCAwEAAAQQH8w7YFlLCE63JNLG
# KX7zUQIBAAIBAAIBAAIBAAIBADAxMA0GCWCGSAFlAwQCAQUABCBGEzyUKETmPT2f
# 9hWyGTyMdnzfu710LC8DlLtwhIbfj6CCDYMwggYBMIID6aADAgECAhMzAAAAxOmJ
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
# TkhFwELJm3ZbCoBIa/15n8G9bW1qyVJzEw16UM0xghW/MIIVuwIBATCBlTB+MQsw
# CQYDVQQGEwJVUzETMBEGA1UECBMKV2FzaGluZ3RvbjEQMA4GA1UEBxMHUmVkbW9u
# ZDEeMBwGA1UEChMVTWljcm9zb2Z0IENvcnBvcmF0aW9uMSgwJgYDVQQDEx9NaWNy
# b3NvZnQgQ29kZSBTaWduaW5nIFBDQSAyMDExAhMzAAAAxOmJ+HqBUOn/AAAAAADE
# MA0GCWCGSAFlAwQCAQUAoIGuMBkGCSqGSIb3DQEJAzEMBgorBgEEAYI3AgEEMBwG
# CisGAQQBgjcCAQsxDjAMBgorBgEEAYI3AgEVMC8GCSqGSIb3DQEJBDEiBCB+o0Jv
# Gs92/rgw/3YiDPSdpT7dtHCneraARHnhkpyGuzBCBgorBgEEAYI3AgEMMTQwMqAU
# gBIATQBpAGMAcgBvAHMAbwBmAHShGoAYaHR0cDovL3d3dy5taWNyb3NvZnQuY29t
# MA0GCSqGSIb3DQEBAQUABIIBABF3I6lcPbuxb8LZtVgaalUQwwIfo0G6kxTzaJpd
# Wtfq/frK7uWlwq5TMAvmm5TR/20wBHNSlJYqaoKGcfFI8F93sez2cxp5pCgFNPUW
# +6DZcn0IEss5oatV1RzVyXXk4AxPRSqN3Hs5i+3doZSZ1f8cj0PwlefW46wCGxm1
# KiB3JiT+29wb2a6ucLswk+rMMdi+wgkR5Eta/QobWOesSVPAXqtDFKhMJ7jbp0s+
# h2IKqiqUF9S3ZaILAdH0zIHk6GBZHlPErDbtQxv66EtIETMSLdI8PIzQtEdv7WjJ
# D+CTMWhVujtLpW7NtDDo2+UygwO1qDFV1kavbbAedKHwdNahghNJMIITRQYKKwYB
# BAGCNwMDATGCEzUwghMxBgkqhkiG9w0BBwKgghMiMIITHgIBAzEPMA0GCWCGSAFl
# AwQCAQUAMIIBPAYLKoZIhvcNAQkQAQSgggErBIIBJzCCASMCAQEGCisGAQQBhFkK
# AwEwMTANBglghkgBZQMEAgEFAAQgAlbaVJYANT2iIzSHdawkiC0rYNLmwUgYQogg
# 1kYDVrACBlpOwZ1EHhgTMjAxODAyMDMwOTA4NTEuOTA2WjAHAgEBgAID56CBuKSB
# tTCBsjELMAkGA1UEBhMCVVMxEzARBgNVBAgTCldhc2hpbmd0b24xEDAOBgNVBAcT
# B1JlZG1vbmQxHjAcBgNVBAoTFU1pY3Jvc29mdCBDb3Jwb3JhdGlvbjEMMAoGA1UE
# CxMDQU9DMScwJQYDVQQLEx5uQ2lwaGVyIERTRSBFU046ODQzRC0zN0Y2LUYxMDQx
# JTAjBgNVBAMTHE1pY3Jvc29mdCBUaW1lLVN0YW1wIFNlcnZpY2Wggg7NMIIGcTCC
# BFmgAwIBAgIKYQmBKgAAAAAAAjANBgkqhkiG9w0BAQsFADCBiDELMAkGA1UEBhMC
# VVMxEzARBgNVBAgTCldhc2hpbmd0b24xEDAOBgNVBAcTB1JlZG1vbmQxHjAcBgNV
# BAoTFU1pY3Jvc29mdCBDb3Jwb3JhdGlvbjEyMDAGA1UEAxMpTWljcm9zb2Z0IFJv
# b3QgQ2VydGlmaWNhdGUgQXV0aG9yaXR5IDIwMTAwHhcNMTAwNzAxMjEzNjU1WhcN
# MjUwNzAxMjE0NjU1WjB8MQswCQYDVQQGEwJVUzETMBEGA1UECBMKV2FzaGluZ3Rv
# bjEQMA4GA1UEBxMHUmVkbW9uZDEeMBwGA1UEChMVTWljcm9zb2Z0IENvcnBvcmF0
# aW9uMSYwJAYDVQQDEx1NaWNyb3NvZnQgVGltZS1TdGFtcCBQQ0EgMjAxMDCCASIw
# DQYJKoZIhvcNAQEBBQADggEPADCCAQoCggEBAKkdDbx3EYo6IOz8E5f1+n9plGt0
# VBDVpQoAgoX77XxoSyxfxcPlYcJ2tz5mK1vwFVMnBDEfQRsalR3OCROOfGEwWbEw
# RA/xYIiEVEMM1024OAizQt2TrNZzMFcmgqNFDdDq9UeBzb8kYDJYYEbyWEeGMoQe
# dGFnkV+BVLHPk0ySwcSmXdFhE24oxhr5hoC732H8RsEnHSRnEnIaIYqvS2SJUGKx
# Xf13Hz3wV3WsvYpCTUBR0Q+cBj5nf/VmwAOWRH7v0Ev9buWayrGo8noqCjHw2k4G
# kbaICDXoeByw6ZnNPOcvRLqn9NxkvaQBwSAJk3jN/LzAyURdXhacAQVPIk0CAwEA
# AaOCAeYwggHiMBAGCSsGAQQBgjcVAQQDAgEAMB0GA1UdDgQWBBTVYzpcijGQ80N7
# fEYbxTNoWoVtVTAZBgkrBgEEAYI3FAIEDB4KAFMAdQBiAEMAQTALBgNVHQ8EBAMC
# AYYwDwYDVR0TAQH/BAUwAwEB/zAfBgNVHSMEGDAWgBTV9lbLj+iiXGJo0T2UkFvX
# zpoYxDBWBgNVHR8ETzBNMEugSaBHhkVodHRwOi8vY3JsLm1pY3Jvc29mdC5jb20v
# cGtpL2NybC9wcm9kdWN0cy9NaWNSb29DZXJBdXRfMjAxMC0wNi0yMy5jcmwwWgYI
# KwYBBQUHAQEETjBMMEoGCCsGAQUFBzAChj5odHRwOi8vd3d3Lm1pY3Jvc29mdC5j
# b20vcGtpL2NlcnRzL01pY1Jvb0NlckF1dF8yMDEwLTA2LTIzLmNydDCBoAYDVR0g
# AQH/BIGVMIGSMIGPBgkrBgEEAYI3LgMwgYEwPQYIKwYBBQUHAgEWMWh0dHA6Ly93
# d3cubWljcm9zb2Z0LmNvbS9QS0kvZG9jcy9DUFMvZGVmYXVsdC5odG0wQAYIKwYB
# BQUHAgIwNB4yIB0ATABlAGcAYQBsAF8AUABvAGwAaQBjAHkAXwBTAHQAYQB0AGUA
# bQBlAG4AdAAuIB0wDQYJKoZIhvcNAQELBQADggIBAAfmiFEN4sbgmD+BcQM9naOh
# IW+z66bM9TG+zwXiqf76V20ZMLPCxWbJat/15/B4vceoniXj+bzta1RXCCtRgkQS
# +7lTjMz0YBKKdsxAQEGb3FwX/1z5Xhc1mCRWS3TvQhDIr79/xn/yN31aPxzymXlK
# kVIArzgPF/UveYFl2am1a+THzvbKegBvSzBEJCI8z+0DpZaPWSm8tv0E4XCfMkon
# /VWvL/625Y4zu2JfmttXQOnxzplmkIz/amJ/3cVKC5Em4jnsGUpxY517IW3DnKOi
# PPp/fZZqkHimbdLhnPkd/DjYlPTGpQqWhqS9nhquBEKDuLWAmyI4ILUl5WTs9/S/
# fmNZJQ96LjlXdqJxqgaKD4kWumGnEcua2A5HmoDF0M2n0O99g/DhO3EJ3110mCII
# YdqwUB5vvfHhAN/nMQekkzr3ZUd46PioSKv33nJ+YWtvd6mBy6cJrDm77MbL2IK0
# cs0d9LiFAR6A+xuJKlQ5slvayA1VmXqHczsI5pgt6o3gMy4SKfXAL1QnIffIrE7a
# KLixqduWsqdCosnPGUFN4Ib5KpqjEWYw07t0MkvfY3v1mYovG8chr1m1rtxEPJdQ
# cdeh0sVV42neV8HR3jDA/czmTfsNv11P6Z0eGTgvvM9YBS7vDaBQNdrvCScc1bN+
# NR4Iuto229Nfj950iEkSMIIE2TCCA8GgAwIBAgITMwAAAKlUcNl5wIRl4gAAAAAA
# qTANBgkqhkiG9w0BAQsFADB8MQswCQYDVQQGEwJVUzETMBEGA1UECBMKV2FzaGlu
# Z3RvbjEQMA4GA1UEBxMHUmVkbW9uZDEeMBwGA1UEChMVTWljcm9zb2Z0IENvcnBv
# cmF0aW9uMSYwJAYDVQQDEx1NaWNyb3NvZnQgVGltZS1TdGFtcCBQQ0EgMjAxMDAe
# Fw0xNjA5MDcxNzU2NTNaFw0xODA5MDcxNzU2NTNaMIGyMQswCQYDVQQGEwJVUzET
# MBEGA1UECBMKV2FzaGluZ3RvbjEQMA4GA1UEBxMHUmVkbW9uZDEeMBwGA1UEChMV
# TWljcm9zb2Z0IENvcnBvcmF0aW9uMQwwCgYDVQQLEwNBT0MxJzAlBgNVBAsTHm5D
# aXBoZXIgRFNFIEVTTjo4NDNELTM3RjYtRjEwNDElMCMGA1UEAxMcTWljcm9zb2Z0
# IFRpbWUtU3RhbXAgU2VydmljZTCCASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQoC
# ggEBAKyUhRim5VbTnd8DZy7bmJFHj5WJck2adPM0QN5rEafUx5J+Dv+fNTp/p2SM
# cZthxRlZPpRdkS9OwO3BQG4nB5HU5az2HjzOUBFTJ2iE0tJmpB9uHXspiybjCa50
# 50z8n4O3Rg3bFakN+1f3s5sQ3gwcpE0aw5YkRjYpkFzeHUfWlz9CjQf/qC8njusS
# ELFHQvcEvTk2xMW7wOy2vI6BnMndskA8PaPrG70wdf5bBXMdFDER1PA6v+zRE95E
# ycT+SOFXxC54CBV+80UGNkm2tf1YHRHdiGQDQhA5765TFkYRW1x9Elp3SHZwKWEh
# GpNTnCJpbpy0eXqOTDiEFRlsX6ECAwEAAaOCARswggEXMB0GA1UdDgQWBBQP1UH7
# u/Od9L5JUtqMN1fOZA/zfTAfBgNVHSMEGDAWgBTVYzpcijGQ80N7fEYbxTNoWoVt
# VTBWBgNVHR8ETzBNMEugSaBHhkVodHRwOi8vY3JsLm1pY3Jvc29mdC5jb20vcGtp
# L2NybC9wcm9kdWN0cy9NaWNUaW1TdGFQQ0FfMjAxMC0wNy0wMS5jcmwwWgYIKwYB
# BQUHAQEETjBMMEoGCCsGAQUFBzAChj5odHRwOi8vd3d3Lm1pY3Jvc29mdC5jb20v
# cGtpL2NlcnRzL01pY1RpbVN0YVBDQV8yMDEwLTA3LTAxLmNydDAMBgNVHRMBAf8E
# AjAAMBMGA1UdJQQMMAoGCCsGAQUFBwMIMA0GCSqGSIb3DQEBCwUAA4IBAQAImRil
# B4svciR1LI4ghAL9CqGvDuGwMhGGqsWGIJ276EQ7lcy1OueLRqUT04wgG6g6VxwV
# 93NtjQuyB0VuhkV2JEa6dEzxNm9Snbbk5JSMySmriaq+coLTuptVq6CCOeAZLtgR
# rUWJA0vAL+IAnrh7h9vK13W4LgS0jJM3ih4mROTZQWWO0UK5XhMQvBlndbvOhKnp
# H457zxuUuDldbVdZ7Ap+xtaVDTvn+ogvVqxVBFByZz+yAAPDjsL8PsiVq+DUZ7am
# NG20YAiyQonef2DaWCG804w4MlPyCszb3yS3AOuTSj8JejQ7S8Bza2pShFOhmwRE
# WWFCrXLwQMBu/JqyoYIDdzCCAl8CAQEwgeKhgbikgbUwgbIxCzAJBgNVBAYTAlVT
# MRMwEQYDVQQIEwpXYXNoaW5ndG9uMRAwDgYDVQQHEwdSZWRtb25kMR4wHAYDVQQK
# ExVNaWNyb3NvZnQgQ29ycG9yYXRpb24xDDAKBgNVBAsTA0FPQzEnMCUGA1UECxMe
# bkNpcGhlciBEU0UgRVNOOjg0M0QtMzdGNi1GMTA0MSUwIwYDVQQDExxNaWNyb3Nv
# ZnQgVGltZS1TdGFtcCBTZXJ2aWNloiUKAQEwCQYFKw4DAhoFAAMVAF06v1a94Q8p
# ynIOZPd1O3gaIuv0oIHBMIG+pIG7MIG4MQswCQYDVQQGEwJVUzETMBEGA1UECBMK
# V2FzaGluZ3RvbjEQMA4GA1UEBxMHUmVkbW9uZDEeMBwGA1UEChMVTWljcm9zb2Z0
# IENvcnBvcmF0aW9uMQwwCgYDVQQLEwNBT0MxJzAlBgNVBAsTHm5DaXBoZXIgTlRT
# IEVTTjoyNjY1LTRDM0YtQzVERTErMCkGA1UEAxMiTWljcm9zb2Z0IFRpbWUgU291
# cmNlIE1hc3RlciBDbG9jazANBgkqhkiG9w0BAQUFAAIFAN4fVSwwIhgPMjAxODAy
# MDIyMTIyNTJaGA8yMDE4MDIwMzIxMjI1MlowdzA9BgorBgEEAYRZCgQBMS8wLTAK
# AgUA3h9VLAIBADAKAgEAAgIkUwIB/zAHAgEAAgIZ3TAKAgUA3iCmrAIBADA2Bgor
# BgEEAYRZCgQCMSgwJjAMBgorBgEEAYRZCgMBoAowCAIBAAIDHoCYoQowCAIBAAID
# HoSAMA0GCSqGSIb3DQEBBQUAA4IBAQBlLgbvE0ZQuEQTChjEIzSmq2U87/nwfmRa
# J88pPz5xTvYGnF70vkAOaBFSpKPBWu82fs9eV8oPcJ6/ab9+Zr5iUFNK8pK3BoCE
# vaqaIL6Y5k/yKfU+sHyRflZxBqFoqan78xslzqfSesV99A6EzOPH77sxhHcc12Os
# rUcFg5Ab8hvTe+I+2Ms0+kWPy+x7WiPg+l1vaX0Z3jg7+tvh5K7x0qiGjFPWKCRD
# qXCcHPW94axP0qi34zxYP+7vsAphU8cUJ+W8qv1VvcSQh9DJ03RKlWWPDrayqFM1
# ReZEuzCj3HfeVPbLkHWsuDHsFXVdacE0Qef46HJu+Zd0TpMjFDuVMYIC9TCCAvEC
# AQEwgZMwfDELMAkGA1UEBhMCVVMxEzARBgNVBAgTCldhc2hpbmd0b24xEDAOBgNV
# BAcTB1JlZG1vbmQxHjAcBgNVBAoTFU1pY3Jvc29mdCBDb3Jwb3JhdGlvbjEmMCQG
# A1UEAxMdTWljcm9zb2Z0IFRpbWUtU3RhbXAgUENBIDIwMTACEzMAAACpVHDZecCE
# ZeIAAAAAAKkwDQYJYIZIAWUDBAIBBQCgggEyMBoGCSqGSIb3DQEJAzENBgsqhkiG
# 9w0BCRABBDAvBgkqhkiG9w0BCQQxIgQgnG+0QQkHDe3IsiflT5M/KrEjHrcjwv5H
# HdmGpNsixawwgeIGCyqGSIb3DQEJEAIMMYHSMIHPMIHMMIGxBBRdOr9WveEPKcpy
# DmT3dTt4GiLr9DCBmDCBgKR+MHwxCzAJBgNVBAYTAlVTMRMwEQYDVQQIEwpXYXNo
# aW5ndG9uMRAwDgYDVQQHEwdSZWRtb25kMR4wHAYDVQQKExVNaWNyb3NvZnQgQ29y
# cG9yYXRpb24xJjAkBgNVBAMTHU1pY3Jvc29mdCBUaW1lLVN0YW1wIFBDQSAyMDEw
# AhMzAAAAqVRw2XnAhGXiAAAAAACpMBYEFP7m3b+XG3WXwVux1QBpEOHoyHRhMA0G
# CSqGSIb3DQEBCwUABIIBAGsINUDOd4w9pHqh6JJtuDKiUCOsL08SapR2Jc1LJeQv
# gajuirYYT00uNmZqd90UN7bEukgEVQDteONfz2KZ37YncPJ0AXpoGx3F4wNL3NL1
# uRgIbJVIdQMy62bYLoSvw2iXdgixTFOyBAC+YnLnWhXxyibCJ4CfE7z78fKzpeRh
# 2kYNr1hcuJ5CM1I6DWYbVboPHrwJoHx5n8yRIKJeMdXDujRDeqmZF+OvX/b+fOEI
# /msHW444VwXQvRe6aU8PC5JFgoegBFHld0FnU6eaQPPz+liD5zrw7IfqKraJ2vp7
# r11rVX7AqGgk0/6lgb4TNPvjVvF3N0+PbUjrT7TJhoo=
# SIG # End signature block
