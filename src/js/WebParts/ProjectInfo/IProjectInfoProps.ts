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
    welcomePageId?: number;
    renderMode?: ProjectInfoRenderMode;
    modalOptions?: IProjectInfoModalOptions;
}

export default IProjectInfoProps;
