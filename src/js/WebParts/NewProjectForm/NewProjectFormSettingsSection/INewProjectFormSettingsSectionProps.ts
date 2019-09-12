//#region Imports
import ListConfig from "../../../Provision/Data/Config/ListConfig";
import ListProjectType from "../../../Provision/Data/ProjectTypes/ListProjectType";
import Extension from "../../../Provision/Extensions/Extension";
//#endregion

export default interface INewProjectFormSettingsSectionProps {
    className: string;
    toggleSectionClassName?: string;
    listData: ListConfig[];
    listProjectTypes: ListProjectType[];
    extensions: Extension[];
    toggleListContentHandler: (lc: ListConfig, checked: boolean) => void;
    toggleListProjectTypeContent: (pt: ListProjectType, checked: boolean) => void;
    toggleExtensionHandler: (extension: Extension, checked: boolean) => void;
}
