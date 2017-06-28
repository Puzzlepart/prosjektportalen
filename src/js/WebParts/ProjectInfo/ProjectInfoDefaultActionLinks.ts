import { IModalLinkProps, ModalLinkIconPosition } from "../@Components/ModalLink";
import AudienceTargeting from "../AudienceTargeting";

const ProjectInfoDefaultActionLinks: IModalLinkProps[] = [{
    url: `${_spPageContextInfo.webAbsoluteUrl}/SitePages/Forms/DispForm.aspx?ID=3`,
    label: __("ProjectInfo_ViewProperties"),
    icon: { iconName: "PreviewLink", position: ModalLinkIconPosition.Left },
    options: {
        HideContentTypeChoice: true,
        HideWebPartMaintenancePageLink: true,
        HideRibbon: true,
    },
    reloadOnSubmit: false,
    showLabel: true,
},
{
    url: `${_spPageContextInfo.webAbsoluteUrl}/_layouts/versions.aspx?list=${_spPageContextInfo.pageListId}&ID=${_spPageContextInfo.pageItemId}&FileName=${_spPageContextInfo.serverRequestPath}`,
    label: __("ProjectInfo_ShowVersionHistory"),
    icon: { iconName: "History", position: ModalLinkIconPosition.Left },
    options: {
        HideRibbon: true,
    },
    reloadOnSubmit: false,
    showLabel: true,
    audienceTargeting: AudienceTargeting.Owners,
},
{
    url: `${_spPageContextInfo.webAbsoluteUrl}/SitePages/Forms/EditForm.aspx?ID=3`,
    label: __("ProjectInfo_EditProperties"),
    icon: { iconName: "EditMirrored", position: ModalLinkIconPosition.Left },
    options: {
        HideContentTypeChoice: true,
        HideWebPartMaintenancePageLink: true,
        HideRibbon: true,
        HideFormFields: "GtProjectPhase",
    },
    reloadOnSubmit: true,
    showLabel: true,
    audienceTargeting: AudienceTargeting.Owners,
},
{
    url: `${_spPageContextInfo.webAbsoluteUrl}/_layouts/15/prjsetng.aspx`,
    label: __("ProjectInfo_EditLogo"),
    icon: { iconName: "AppIconDefault", position: ModalLinkIconPosition.Left },
    reloadOnSubmit: true,
    showLabel: true,
    audienceTargeting: AudienceTargeting.Owners,
}];

export default ProjectInfoDefaultActionLinks;