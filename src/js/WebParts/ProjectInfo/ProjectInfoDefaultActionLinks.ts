import __ from "../../Resources";
import { IModalLinkProps } from "../@Components/ModalLink";
import {
    SetMetadataDefaultsForLibrary,
    EnsureLocationBasedMetadataDefaultsReceiverForLibrary,
} from "../../Project";

const ProjectInfoDefaultActionLinks: IModalLinkProps[] = [{
    url: `${_spPageContextInfo.webAbsoluteUrl}/Lists/Properties/DispForm.aspx?ID=1`,
    label: __.getResource("ProjectInfo_ViewProperties"),
    icon: { iconName: "PreviewLink" },
    options: {
        HideRibbon: true,
    },
    reloadOnSubmit: false,
    showLabel: true,
},
{
    url: `${_spPageContextInfo.webAbsoluteUrl}/_layouts/versions.aspx?list=Properties&ID=1`,
    label: __.getResource("ProjectInfo_ShowVersionHistory"),
    icon: { iconName: "History" },
    options: {
        HideRibbon: true,
    },
    reloadOnSubmit: false,
    showLabel: true,
    permissionKind: 31,
},
{
    url: `${_spPageContextInfo.webAbsoluteUrl}/Lists/Properties/EditForm.aspx?ID=1`,
    label: __.getResource("ProjectInfo_EditProperties"),
    icon: { iconName: "EditMirrored" },
    options: {
        HideRibbon: true,
        HideFormFields: "GtProjectPhase",
    },
    onDialogReturnValueCallback: result => {
        Promise.all([
            SetMetadataDefaultsForLibrary([{
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
            EnsureLocationBasedMetadataDefaultsReceiverForLibrary(),
        ])
            .then(() => {
                SP.Utilities.HttpUtility.navigateTo(_spPageContextInfo.serverRequestPath);
            })
            .catch(() => {
                SP.Utilities.HttpUtility.navigateTo(_spPageContextInfo.serverRequestPath);
            });
    },
    showLabel: true,
    permissionKind: 31,
},
{
    url: `${_spPageContextInfo.webAbsoluteUrl}/_layouts/15/prjsetng.aspx`,
    label: __.getResource("ProjectInfo_EditLogo"),
    icon: { iconName: "AppIconDefault" },
    showLabel: true,
    permissionKind: 31,
}];

export default ProjectInfoDefaultActionLinks;
