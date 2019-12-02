//#region Imports
import ListConfig from "../../../Provision/Data/Config/ListConfig";
import ProjectType from "../../../Provision/Data/ProjectTypes/ProjectType";
import Extension from "../../../Provision/Extensions/Extension";
import INewProjectFormConfig from "../INewProjectFormConfig";
import { ProjectModel } from "model";
//#endregion

export default interface INewProjectFormSettingsSectionProps {
    className: string;
    toggleSectionClassName?: string;
    config: INewProjectFormConfig;
    model: ProjectModel;
    onListContentChanged: (lc: ListConfig, checked: boolean) => void;
    onProjectTypeChanged: (pt: ProjectType) => void;
    onExtensionsChanged: (extension: Extension, checked: boolean) => void;
}
