import ListConfig from "../../../Provision/Data/Config/ListConfig";
import Extension from "../../../Provision/Extensions/Extension";
export default interface INewProjectFormSettingsSectionProps {
    className: string;
    toggleSectionClassName?: string;
    listData: ListConfig[];
    extensions: Extension[];
    toggleListContentHandler: (lc: ListConfig, checked: boolean) => void;
    toggleExtensionHandler: (extension: Extension, checked: boolean) => void;
}
