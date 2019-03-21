import * as React from "react";
import { IBaseWebPartProps } from "../@BaseWebPart";
import ProjectInfoRenderMode from "./ProjectInfoRenderMode";
import IProjectInfoModalOptions from "./IProjectInfoModalOptions";
export default interface IProjectInfoProps extends IBaseWebPartProps {
    chromeTitle?: string;
    loadingText?: string;
    showActionLinks?: boolean;
    showMissingPropsWarning?: boolean;
    filterField?: string;
    labelSize?: "mi" | "xs" | "s" | "s-plus" | "m" | "m-plus" | "l" | "xl" | "xxl";
    valueSize?: "mi" | "xs" | "s" | "s-plus" | "m" | "m-plus" | "l" | "xl" | "xxl";
    hideChrome?: boolean;
    webUrl?: string;
    rootSiteUrl?: string;
    renderMode?: ProjectInfoRenderMode;
    modalOptions?: IProjectInfoModalOptions;
    containerClassName?: string;
    innerClassName?: string;
    actionsClassName?: string;
    errorIconProps?: {
        iconName?: string;
        style?: React.CSSProperties;
    };
    infoIconProps?: {
        iconName?: string;
        style?: React.CSSProperties;
    };
}
export declare const ProjectInfoDefaultProps: Partial<IProjectInfoProps>;
