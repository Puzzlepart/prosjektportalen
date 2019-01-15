import * as React from "react";
import __ from "../../Resources";
import { IBaseWebPartProps } from "../@BaseWebPart";
import ProjectInfoRenderMode from "./ProjectInfoRenderMode";
import IProjectInfoModalOptions from "./IProjectInfoModalOptions";
import { IModalLinkProps } from "../@Components/ModalLink";
import ProjectInfoDefaultActionLinks from "./ProjectInfoDefaultActionLinks";

export default interface IProjectInfoProps extends IBaseWebPartProps {
    chromeTitle?: string;
    loadingText?: string;
    missingPropertiesMessage?: string;
    noPropertiesMessage?: string;
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
    innerClassName?: string;
    actionsClassName?: string;
    errorIconProps?: { iconName?: string; style?: React.CSSProperties; };
    infoIconProps?: { iconName?: string; style?: React.CSSProperties; };
    actionLinks?: IModalLinkProps[];
}

export const ProjectInfoDefaultProps: Partial<IProjectInfoProps> = {
    chromeTitle: __.getResource("WebPart_ProjectInfo_Title"),
    missingPropertiesMessage: __.getResource("ProjectInfo_MissingProperties"),
    noPropertiesMessage: __.getResource("ProjectInfo_NoProperties"),
    loadingText: __.getResource("ProjectInfo_LoadingText"),
    hideChrome: false,
    showActionLinks: true,
    showMissingPropsWarning: true,
    webUrl: _spPageContextInfo.webAbsoluteUrl,
    rootSiteUrl: _spPageContextInfo.siteAbsoluteUrl,
    welcomePageId: 3,
    renderMode: ProjectInfoRenderMode.Normal,
    containerClassName: "pp-projectInfo",
    innerClassName: "pp-projectInfoInner",
    actionsClassName: "pp-project-actions",
    actionLinks: ProjectInfoDefaultActionLinks,
};
