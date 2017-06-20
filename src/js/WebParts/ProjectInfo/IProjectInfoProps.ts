import * as React from "react";
import ProjectInfoRenderMode from "./ProjectInfoRenderMode";
import IProjectInfoModalOptions from "./IProjectInfoModalOptions";
import { IModalLinkProps, ModalLinkIconPosition } from "../@Components/ModalLink";

interface IProjectInfoProps {
    showActionLinks?: boolean;
    showMissingPropsWarning?: boolean;
    filterField?: string;
    labelSize?: "mi" | "xs" | "s" | "s-plus" | "m" | "m-plus" | "l" | "xl" | "xxl";
    valueSize?: "mi" | "xs" | "s" | "s-plus" | "m" | "m-plus" | "l" | "xl" | "xxl";
    hideChrome?: boolean;
    webUrl?: string;
    rootSiteUrl?: string;
    welcomePageId?: number;
    renderMode?: ProjectInfoRenderMode;
    modalOptions?: IProjectInfoModalOptions;
    containerClassName?: string;
    errorIconProps?: {
        iconName?: string;
        style?: React.CSSProperties;
    };
    infoIconProps?: {
        iconName?: string;
        style?: React.CSSProperties;
    };
    actionLinks?: IModalLinkProps[];
}

export const ProjectInfoDefaultProps: Partial<IProjectInfoProps> = {
    hideChrome: false,
    showActionLinks: true,
    showMissingPropsWarning: true,
    webUrl: _spPageContextInfo.webAbsoluteUrl,
    rootSiteUrl: _spPageContextInfo.siteAbsoluteUrl,
    welcomePageId: 3,
    renderMode: ProjectInfoRenderMode.Normal,
    containerClassName: "pp-projectInfo",
    actionLinks: [{
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
    },
    {
        url: `${_spPageContextInfo.webAbsoluteUrl}/_layouts/15/prjsetng.aspx`,
        label: __("ProjectInfo_EditLogo"),
        icon: { iconName: "AppIconDefault", position: ModalLinkIconPosition.Left },
        reloadOnSubmit: true,
        showLabel: true,
    }],
};

export default IProjectInfoProps;
