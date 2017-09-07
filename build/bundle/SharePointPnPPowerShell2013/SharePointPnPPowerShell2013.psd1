@{
    RootModule = 'SharePointPnP.PowerShell.2013.Commands.dll'
    ModuleVersion = '2.17.1708.1'
    Description = 'SharePoint Patterns and Practices PowerShell Cmdlets for SharePoint 2013'
    GUID = '8f1147be-a8e4-4bd2-a705-841d5334edc0'
    Author = 'SharePoint Patterns and Practices'
    CompanyName = 'SharePoint Patterns and Practices'
    DotNetFrameworkVersion = '4.5'
    ProcessorArchitecture = 'None'
    FunctionsToExport = '*'
    CmdletsToExport = 'Add-PnPContentType','Add-PnPContentTypeToDocumentSet','Add-PnPContentTypeToList','Add-PnPCustomAction','Add-PnPDataRowsToProvisioningTemplate','Add-PnPDocumentSet','Add-PnPEventReceiver','Add-PnPField','Add-PnPFieldFromXml','Add-PnPFieldToContentType','Add-PnPFile','Add-PnPFileToProvisioningTemplate','Add-PnPFolder','Add-PnPHtmlPublishingPageLayout','Add-PnPIndexedProperty','Add-PnPJavaScriptBlock','Add-PnPJavaScriptLink','Add-PnPListFoldersToProvisioningTemplate','Add-PnPListItem','Add-PnPMasterPage','Add-PnPNavigationNode','Add-PnPPublishingImageRendition','Add-PnPPublishingPage','Add-PnPPublishingPageLayout','Add-PnPTaxonomyField','Add-PnPUserToGroup','Add-PnPView','Add-PnPWebPartToWebPartPage','Add-PnPWebPartToWikiPage','Add-PnPWikiPage','Add-PnPWorkflowDefinition','Add-PnPWorkflowSubscription','Apply-PnPProvisioningTemplate','Set-PnPSitePolicy','Clear-PnpRecycleBinItem','Connect-PnPOnline','Connect-PnPMicrosoftGraph','Convert-PnPProvisioningTemplate','Convert-PnPFolderToProvisioningTemplate','Copy-PnPFile','Disable-PnPFeature','Disable-PnPResponsiveUI','Disconnect-PnPOnline','Enable-PnPFeature','Enable-PnPResponsiveUI','Ensure-PnPFolder','Get-PnPProperty','Execute-PnPQuery','Export-PnPTaxonomy','Export-PnPTermGroupToXml','Find-PnPFile','Get-PnPAppInstance','Get-PnPAuditing','Get-PnPAuthenticationRealm','Get-PnPAzureADManifestKeyCredentials','Get-PnPContentType','Get-PnPContentTypePublishingHubUrl','Get-PnPCustomAction','Get-PnPDefaultColumnValues','Get-PnPDocumentSetTemplate','Get-PnPEventReceiver','Get-PnPFeature','Get-PnPField','Get-PnPFile','Get-PnPFolder','Get-PnPFolderItem','Get-PnPGroup','Get-PnPGroupPermissions','Get-PnPHealthScore','Get-PnPHomePage','Get-PnPIndexedPropertyKeys','Get-PnPJavaScriptLink','Get-PnPList','Get-PnPListItem','Get-PnPMasterPage','Get-PnPAccessToken','Get-PnPSiteCollectionTermStore','Get-PnPPropertyBag','Get-PnPProvisioningTemplate','Get-PnPProvisioningTemplateFromGallery','Get-PnPPublishingImageRendition','Get-PnPRecycleBinItem','Get-PnPSearchConfiguration','Get-PnPSite','Get-PnPSiteClosure','Get-PnPSitePolicy','Get-PnPSiteSearchQueryResults','Get-PnPContext','Get-PnPStoredCredential','Get-PnPSubWebs','Get-PnPTaxonomyItem','Get-PnPTaxonomySession','Get-PnPTerm','Get-PnPTermGroup','Get-PnPTermSet','Get-PnPTheme','Get-PnPTimeZoneId','Get-PnPUnifiedGroup','Get-PnPUser','Get-PnPUserProfileProperty','Get-PnPView','Get-PnPWeb','Get-PnPWebPart','Get-PnPWebPartProperty','Get-PnPWebPartXml','Get-PnPWikiPageContent','Get-PnPWorkflowDefinition','Get-PnPWorkflowSubscription','Import-PnPAppPackage','Import-PnPTaxonomy','Import-PnPTermGroupFromXml','Import-PnPTermSet','Install-PnPSolution','Invoke-PnPWebAction','Load-PnPProvisioningTemplate','Move-PnPFile','Move-PnPListItemToRecycleBin','New-PnPExtensbilityHandlerObject','New-PnPGroup','New-PnPList','New-PnPUnifiedGroup','New-PnPProvisioningTemplate','New-PnPProvisioningTemplateFromFolder','New-PnPTenantSite','New-PnPTerm','New-PnPTermGroup','New-PnPTermSet','New-PnPUser','New-PnPWeb','Remove-PnPContentType','Remove-PnPContentTypeFromDocumentSet','Remove-PnPContentTypeFromList','Remove-PnPCustomAction','Remove-PnPIndexedProperty','Remove-PnPEventReceiver','Remove-PnPField','Remove-PnPFieldFromContentType','Remove-PnPFile','Remove-PnPFileFromProvisioningTemplate','Remove-PnPFolder','Remove-PnPGroup','Remove-PnPJavaScriptLink','Remove-PnPList','Remove-PnPListItem','Remove-PnPNavigationNode','Remove-PnPPropertyBagValue','Remove-PnPPublishingImageRendition','Remove-PnPTaxonomyItem','Remove-PnPTermGroup','Remove-PnPUnifiedGroup','Remove-PnPUserFromGroup','Remove-PnPView','Remove-PnPWeb','Remove-PnPWebPart','Remove-PnPWikiPage','Remove-PnPWorkflowDefinition','Remove-PnPWorkflowSubscription','Rename-PnPFile','Request-PnPReIndexList','Request-PnPReIndexWeb','Restore-PnpRecycleBinItem','Resume-PnPWorkflowInstance','Save-PnPProvisioningTemplate','Send-PnPMail','Set-PnPAppSideLoading','Set-PnPAuditing','Set-PnPAvailablePageLayouts','Set-PnPContext','Set-PnPDefaultColumnValues','Set-PnPDefaultContentTypeToList','Set-PnPDefaultPageLayout','Set-PnPDocumentSetField','Set-PnPFileCheckedIn','Set-PnPFileCheckedOut','Set-PnPGroup','Set-PnPGroupPermissions','Set-PnPHomePage','Set-PnPIndexedProperties','Set-PnPList','Set-PnPListItem','Set-PnPListItemPermission','Set-PnPListPermission','Set-PnPMasterPage','Set-PnPMinimalDownloadStrategy','Set-PnPPropertyBagValue','Set-PnPProvisioningTemplateMetadata','Set-PnPSearchConfiguration','Set-PnPSiteClosure','Set-PnPTaxonomyFieldValue','Set-PnPTheme','Set-PnPTraceLog','Set-PnPUnifiedGroup','Set-PnPWeb','Set-PnPWebPartProperty','Set-PnPWebPermission','Set-PnPWikiPageContent','Copy-PnPItemProxy','Move-PnPItemProxy','Stop-PnPWorkflowInstance','Submit-PnPSearchQuery','Uninstall-PnPAppInstance','Uninstall-PnPSolution'
    VariablesToExport = '*'
    FormatsToProcess = 'SharePointPnP.PowerShell.2013.Commands.Format.ps1xml' 
}
# SIG # Begin signature block
# MIITCwYJKoZIhvcNAQcCoIIS/DCCEvgCAQExCzAJBgUrDgMCGgUAMGkGCisGAQQB
# gjcCAQSgWzBZMDQGCisGAQQBgjcCAR4wJgIDAQAABBAfzDtgWUsITrck0sYpfvNR
# AgEAAgEAAgEAAgEAAgEAMCEwCQYFKw4DAhoFAAQUV/53/elq7BLy6wMDULwTBeoq
# fmyggg4tMIIEmTCCA4GgAwIBAgIPFojwOSVeY45pFDkH5jMLMA0GCSqGSIb3DQEB
# BQUAMIGVMQswCQYDVQQGEwJVUzELMAkGA1UECBMCVVQxFzAVBgNVBAcTDlNhbHQg
# TGFrZSBDaXR5MR4wHAYDVQQKExVUaGUgVVNFUlRSVVNUIE5ldHdvcmsxITAfBgNV
# BAsTGGh0dHA6Ly93d3cudXNlcnRydXN0LmNvbTEdMBsGA1UEAxMUVVROLVVTRVJG
# aXJzdC1PYmplY3QwHhcNMTUxMjMxMDAwMDAwWhcNMTkwNzA5MTg0MDM2WjCBhDEL
# MAkGA1UEBhMCR0IxGzAZBgNVBAgTEkdyZWF0ZXIgTWFuY2hlc3RlcjEQMA4GA1UE
# BxMHU2FsZm9yZDEaMBgGA1UEChMRQ09NT0RPIENBIExpbWl0ZWQxKjAoBgNVBAMT
# IUNPTU9ETyBTSEEtMSBUaW1lIFN0YW1waW5nIFNpZ25lcjCCASIwDQYJKoZIhvcN
# AQEBBQADggEPADCCAQoCggEBAOnpPd/XNwjJHjiyUlNCbSLxscQGBGue/YJ0UEN9
# xqC7H075AnEmse9D2IOMSPznD5d6muuc3qajDjscRBh1jnilF2n+SRik4rtcTv6O
# KlR6UPDV9syR55l51955lNeWM/4Og74iv2MWLKPdKBuvPavql9LxvwQQ5z1IRf0f
# aGXBf1mZacAiMQxibqdcZQEhsGPEIhgn7ub80gA9Ry6ouIZWXQTcExclbhzfRA8V
# zbfbpVd2Qm8AaIKZ0uPB3vCLlFdM7AiQIiHOIiuYDELmQpOUmJPv/QbZP7xbm1Q8
# ILHuatZHesWrgOkwmt7xpD9VTQoJNIp1KdJprZcPUL/4ygkCAwEAAaOB9DCB8TAf
# BgNVHSMEGDAWgBTa7WR0FJwUPKvdmam9WyhNizzJ2DAdBgNVHQ4EFgQUjmstM2v0
# M6eTsxOapeAK9xI1aogwDgYDVR0PAQH/BAQDAgbAMAwGA1UdEwEB/wQCMAAwFgYD
# VR0lAQH/BAwwCgYIKwYBBQUHAwgwQgYDVR0fBDswOTA3oDWgM4YxaHR0cDovL2Ny
# bC51c2VydHJ1c3QuY29tL1VUTi1VU0VSRmlyc3QtT2JqZWN0LmNybDA1BggrBgEF
# BQcBAQQpMCcwJQYIKwYBBQUHMAGGGWh0dHA6Ly9vY3NwLnVzZXJ0cnVzdC5jb20w
# DQYJKoZIhvcNAQEFBQADggEBALozJEBAjHzbWJ+zYJiy9cAx/usfblD2CuDk5oGt
# Joei3/2z2vRz8wD7KRuJGxU+22tSkyvErDmB1zxnV5o5NuAoCJrjOU+biQl/e8Vh
# f1mJMiUKaq4aPvCiJ6i2w7iH9xYESEE9XNjsn00gMQTZZaHtzWkHUxY93TYCCojr
# QOUGMAu4Fkvc77xVCf/GPhIudrPczkLv+XZX4bcKBUCYWJpdcRaTcYxlgepv84n3
# +3OttOe/2Y5vqgtPJfO44dXddZhogfiqwNGAwsTEOYnB9smebNd0+dmX+E/CmgrN
# Xo/4GengpZ/E8JIh5i15Jcki+cPwOoRXrToW9GOUEB1d0MYwggSZMIIDgaADAgEC
# AhBxoLc2ld2xr8I7K5oY7lTLMA0GCSqGSIb3DQEBCwUAMIGpMQswCQYDVQQGEwJV
# UzEVMBMGA1UEChMMdGhhd3RlLCBJbmMuMSgwJgYDVQQLEx9DZXJ0aWZpY2F0aW9u
# IFNlcnZpY2VzIERpdmlzaW9uMTgwNgYDVQQLEy8oYykgMjAwNiB0aGF3dGUsIElu
# Yy4gLSBGb3IgYXV0aG9yaXplZCB1c2Ugb25seTEfMB0GA1UEAxMWdGhhd3RlIFBy
# aW1hcnkgUm9vdCBDQTAeFw0xMzEyMTAwMDAwMDBaFw0yMzEyMDkyMzU5NTlaMEwx
# CzAJBgNVBAYTAlVTMRUwEwYDVQQKEwx0aGF3dGUsIEluYy4xJjAkBgNVBAMTHXRo
# YXd0ZSBTSEEyNTYgQ29kZSBTaWduaW5nIENBMIIBIjANBgkqhkiG9w0BAQEFAAOC
# AQ8AMIIBCgKCAQEAm1UCTBcF6dBmw/wordPA/u/g6X7UHvaqG5FG/fUW7ZgHU/q6
# hxt9nh8BJ6u50mfKtxAlU/TjvpuQuO0jXELvZCVY5YgiGr71x671voqxERGTGiKp
# dGnBdLZoh6eDMPlk8bHjOD701sH8Ev5zVxc1V4rdUI0D+GbNynaDE8jXDnEd5GPJ
# uhf40bnkiNIsKMghIA1BtwviL8KA5oh7U2zDRGOBf2hHjCsqz1v0jElhummF/WsA
# eAUmaRMwgDhO8VpVycVQ1qo4iUdDXP5Nc6VJxZNp/neWmq/zjA5XujPZDsZC0wN3
# xLs5rZH58/eWXDpkpu0nV8HoQPNT8r4pNP5f+QIDAQABo4IBFzCCARMwLwYIKwYB
# BQUHAQEEIzAhMB8GCCsGAQUFBzABhhNodHRwOi8vdDIuc3ltY2IuY29tMBIGA1Ud
# EwEB/wQIMAYBAf8CAQAwMgYDVR0fBCswKTAnoCWgI4YhaHR0cDovL3QxLnN5bWNi
# LmNvbS9UaGF3dGVQQ0EuY3JsMB0GA1UdJQQWMBQGCCsGAQUFBwMCBggrBgEFBQcD
# AzAOBgNVHQ8BAf8EBAMCAQYwKQYDVR0RBCIwIKQeMBwxGjAYBgNVBAMTEVN5bWFu
# dGVjUEtJLTEtNTY4MB0GA1UdDgQWBBRXhptUuL6mKYrk9sLiExiJhc3ctzAfBgNV
# HSMEGDAWgBR7W0XPr87Lev0xkhpqtvNG61dIUDANBgkqhkiG9w0BAQsFAAOCAQEA
# JDv116A2E8dD/vAJh2jRmDFuEuQ/Hh+We2tMHoeei8Vso7EMe1CS1YGcsY8sKbfu
# +ZEFuY5B8Sz20FktmOC56oABR0CVuD2dA715uzW2rZxMJ/ZnRRDJxbyHTlV70oe7
# 3dww78bUbMyZNW0c4GDTzWiPKVlLiZYIRsmO/HVPxdwJzE4ni0TNB7ysBOC1M6WH
# n/TdcwyR6hKBb+N18B61k2xEF9U+l8m9ByxWdx+F3Ubov94sgZSj9+W3p8E3n3XK
# VXdNXjYpyoXYRUFyV3XAeVv6NBAGbWQgQrc6yB8dRmQCX8ZHvvDEOihU2vYeT5qi
# GUOkb0n4/F5CICiEi0cgbjCCBO8wggPXoAMCAQICEHIoSkWRC19RggztNyphOa4w
# DQYJKoZIhvcNAQELBQAwTDELMAkGA1UEBhMCVVMxFTATBgNVBAoTDHRoYXd0ZSwg
# SW5jLjEmMCQGA1UEAxMddGhhd3RlIFNIQTI1NiBDb2RlIFNpZ25pbmcgQ0EwHhcN
# MTUxMTI2MDAwMDAwWhcNMTcxMTI1MjM1OTU5WjCBiDELMAkGA1UEBhMCRkkxCjAI
# BgNVBAgTAS0xETAPBgNVBAcUCEhlbHNpbmtpMSQwIgYDVQQKFBtObyBPcmdhbml6
# YXRpb24gQWZmaWxpYXRpb24xHTAbBgNVBAsUFEluZGl2aWR1YWwgRGV2ZWxvcGVy
# MRUwEwYDVQQDFAxWZXNhIEp1dm9uZW4wggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAw
# ggEKAoIBAQCY9JrCTPO16gouA5pjo+bNmoo6/3j8FqBDos+Ejvz0ZsolKyl3XqeY
# E/L65exDkxr5w65RRWjGE6iSX/aPDYBX+KfZRmD7RomiLItAM5ZYcPZCmkwSJ3X/
# ooCLRp/AdG23yIEKMQ9knluGqH7WKFsEdRvURnZtzuJ2MwrHIGHsdIltP5fpaHjJ
# OoxIop/OhBnZ+uu0YkwCsVvOa2spI5i3ay2HH9D+la8IpY0XxXndzNhWrp2lTTPm
# WH3s5cCLriDseuaMnxcISqAt8rD9x0uQleeTtkyhNLQJk/fycdTd4Ru0BEl5vYvJ
# trfDkkQmRfxA1CZ4RakaebxVMbBXlAhxAgMBAAGjggGOMIIBijAJBgNVHRMEAjAA
# MB8GA1UdIwQYMBaAFFeGm1S4vqYpiuT2wuITGImFzdy3MB0GA1UdDgQWBBR6rbE5
# xBDtJfVwYDDCkGQVr05gxzArBgNVHR8EJDAiMCCgHqAchhpodHRwOi8vdGwuc3lt
# Y2IuY29tL3RsLmNybDAOBgNVHQ8BAf8EBAMCB4AwEwYDVR0lBAwwCgYIKwYBBQUH
# AwMwcwYDVR0gBGwwajBoBgtghkgBhvhFAQcwAjBZMCYGCCsGAQUFBwIBFhpodHRw
# czovL3d3dy50aGF3dGUuY29tL2NwczAvBggrBgEFBQcCAjAjDCFodHRwczovL3d3
# dy50aGF3dGUuY29tL3JlcG9zaXRvcnkwHQYDVR0EBBYwFDAOMAwGCisGAQQBgjcC
# ARYDAgeAMFcGCCsGAQUFBwEBBEswSTAfBggrBgEFBQcwAYYTaHR0cDovL3RsLnN5
# bWNkLmNvbTAmBggrBgEFBQcwAoYaaHR0cDovL3RsLnN5bWNiLmNvbS90bC5jcnQw
# DQYJKoZIhvcNAQELBQADggEBAG52DgNLkshRLNKuqHtRkJo3k+6W5ZOXMLNP92Ni
# XLRh7CVKAASqQl0dLqX2zTJtMjSL0lFNfFaRSvUgSEK9pZaXX12kCNCLz6hjyGje
# W1xf1zFOI+6aJWd5u9zVvabdmr5jxkYIDF26sMGEox+ulBWwyQxYr6xaF6k1+x2V
# wpKP+NLycYFUn2IN+g5NfGnLNrZf2TiFeixaLf2Rq5mFsFuyz7C1hicV64g7k6xA
# dn0AX67Lp5ZOs+C19LQSVY4eMCpJTvSBGDEX61cWjw/2vSBKVaYyvBTaIMeZg+Ly
# Gul8e+rp0yMo6hLIED8373oA4IqhFQhRqK0DjHEXDg5OtzsxggRIMIIERAIBATBg
# MEwxCzAJBgNVBAYTAlVTMRUwEwYDVQQKEwx0aGF3dGUsIEluYy4xJjAkBgNVBAMT
# HXRoYXd0ZSBTSEEyNTYgQ29kZSBTaWduaW5nIENBAhByKEpFkQtfUYIM7TcqYTmu
# MAkGBSsOAwIaBQCgeDAYBgorBgEEAYI3AgEMMQowCKACgAChAoAAMBkGCSqGSIb3
# DQEJAzEMBgorBgEEAYI3AgEEMBwGCisGAQQBgjcCAQsxDjAMBgorBgEEAYI3AgEW
# MCMGCSqGSIb3DQEJBDEWBBQsqSmtg/ldKfKhU8nn5OhPJXdcdzANBgkqhkiG9w0B
# AQEFAASCAQCPPcyPjBookUSob6uKiVm4yRSB18+8GEeVsOFapgemKwU7oM5b94QY
# FrcArtZbOKa4rvr35IyliVfp5eOnM4xfk27Ak2Gddv4UFEyEBRyLWFLAg85a8Gbv
# s+NyxjrMPsm1F//4+d9RCx1Iijs6AKysuNXkXhdbKZ+Mx7oOacWsFydV+MGvq6Lv
# D5RYb4uL4mv0UYXrg9zChIDBjpa8MO+KEPdKJWexX0DZsYoUMeQyn6MAPRcvotLI
# vvl/paWcVQXZzUDvzEdGSMRT0iMn8MxdrrhBwyl3UJ+I9KthsiIW2thx6OoVZ1do
# 9c/zyyLGnAbMjWXzHhvpJdRw69xvXVBeoYICQzCCAj8GCSqGSIb3DQEJBjGCAjAw
# ggIsAgEBMIGpMIGVMQswCQYDVQQGEwJVUzELMAkGA1UECBMCVVQxFzAVBgNVBAcT
# DlNhbHQgTGFrZSBDaXR5MR4wHAYDVQQKExVUaGUgVVNFUlRSVVNUIE5ldHdvcmsx
# ITAfBgNVBAsTGGh0dHA6Ly93d3cudXNlcnRydXN0LmNvbTEdMBsGA1UEAxMUVVRO
# LVVTRVJGaXJzdC1PYmplY3QCDxaI8DklXmOOaRQ5B+YzCzAJBgUrDgMCGgUAoF0w
# GAYJKoZIhvcNAQkDMQsGCSqGSIb3DQEHATAcBgkqhkiG9w0BCQUxDxcNMTcwODA4
# MTExOTM2WjAjBgkqhkiG9w0BCQQxFgQUp/mSdN+4zqohTWdDLDowSyhxP9MwDQYJ
# KoZIhvcNAQEBBQAEggEA2I0cPerLXhA7X0qH/Ctxxdt/DdoS9lgQHpr/udwMznws
# cxuabJGiXxyW8unJ906H7q+GaJhnigID4loyNJIZfCY6IJ1v+u8vomoKlqTmcXHr
# jJNG48u62nah2vJ4uzRceNxsYr5Su3p3MW/Y0l5KluqK6YqyULBiHJhQE7WnfIQj
# Dw7p/lRv/6QMzBwb5jLWpTkS47+b8t3l/yszIwx5JKZENjCM3rc6oMQKHm0U9GUs
# KdSqK5yKoVHy85SeO2txIjDhE1FRNuZtSHfluKyg1p2qYVwv4baWUlXP4xdeI1ZU
# l+W1mIFjx/tzCqDQGW7Wfb+ge7uTsUZlj+t2HcBkyw==
# SIG # End signature block
