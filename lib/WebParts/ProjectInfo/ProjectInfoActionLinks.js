"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Resources_1 = require("../../Resources");
const Project_1 = require("../../Project");
exports.ProjectInfoActionLinks = (state) => ([
    state.hasPropertiesItem && {
        url: `${_spPageContextInfo.webAbsoluteUrl}/Lists/Properties/DispForm.aspx?ID=1`,
        label: Resources_1.default.getResource("ProjectInfo_ViewProperties"),
        icon: { iconName: "PreviewLink" },
        options: { HideRibbon: true },
        reloadOnSubmit: false,
        showLabel: true,
    },
    state.hasPropertiesItem && {
        url: `${_spPageContextInfo.webAbsoluteUrl}/_layouts/versions.aspx?list=${state.propertiesList.Id}&ID=1`,
        label: Resources_1.default.getResource("ProjectInfo_ShowVersionHistory"),
        icon: { iconName: "History" },
        options: { HideRibbon: true },
        reloadOnSubmit: false,
        showLabel: true,
        permissionKind: 31,
    },
    {
        url: state.hasPropertiesItem ? `${_spPageContextInfo.webAbsoluteUrl}/Lists/Properties/EditForm.aspx?ID=1` : `${_spPageContextInfo.webAbsoluteUrl}/Lists/Properties/NewForm.aspx`,
        label: Resources_1.default.getResource("ProjectInfo_EditProperties"),
        icon: { iconName: "EditMirrored" },
        options: { HideRibbon: true, HideFormFields: "GtProjectPhase" },
        onDialogReturnValueCallback: (result) => {
            if (result === SP.UI.DialogResult.OK) {
                Promise.all([
                    Project_1.SetMetadataDefaultsForLibrary([{
                            fieldName: "GtProjectPhase",
                            fieldType: "Taxonomy",
                        },
                        {
                            fieldName: "GtProjectType",
                            fieldType: "TaxonomyMulti",
                        },
                        {
                            fieldName: "GtProjectServiceArea",
                            fieldType: "TaxonomyMulti",
                        },
                        {
                            fieldName: "GtProjectFinanceName",
                            fieldType: "Text",
                        },
                        {
                            fieldName: "GtProjectNumber",
                            fieldType: "Text",
                        },
                        {
                            fieldName: "GtArchiveReference",
                            fieldType: "Text",
                        }]),
                    Project_1.EnsureLocationBasedMetadataDefaultsReceiverForLibrary(),
                ])
                    .then(() => {
                    SP.Utilities.HttpUtility.navigateTo(_spPageContextInfo.serverRequestPath);
                })
                    .catch(() => {
                    SP.Utilities.HttpUtility.navigateTo(_spPageContextInfo.serverRequestPath);
                });
            }
        },
        showLabel: true,
        permissionKind: 31,
    },
    {
        url: `${_spPageContextInfo.webAbsoluteUrl}/_layouts/15/prjsetng.aspx`,
        label: Resources_1.default.getResource("ProjectInfo_EditLogo"),
        icon: { iconName: "AppIconDefault" },
        showLabel: true,
        permissionKind: 31,
    },
].filter(a => a));
