//#region Imports
import ListConfig from "../../../Provision/Data/Config/ListConfig";
import ListProjectType from "../../../Provision/Data/ProjectTypes/ListProjectType";
import Extension from "../../../Provision/Extensions/Extension";
//#endregion

export default interface INewProjectFormSettingsSectionProps {
    className: string;
    toggleSectionClassName?: string;
    listData: ListConfig[];
    projectTypes: ListProjectType[];
    extensions: Extension[];
    onListContentChanged: (lc: ListConfig, checked: boolean) => void;
    onProjectTypeChanged: (pt: ListProjectType) => void;
    onExtensionsChanged: (extension: Extension, checked: boolean) => void;
}
