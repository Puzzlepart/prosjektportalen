import * as React  from "react";
import ProjectInfoRenderMode from "./ProjectInfoRenderMode";
import IProjectInfoModalOptions from "./IProjectInfoModalOptions";

interface IProjectInfoProps {
    showEditLink?: boolean;
    showMissingPropsWarning?: boolean;
    filterField?: string;
    labelSize?: string;
    valueSize?: string;
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
}

export default IProjectInfoProps;
