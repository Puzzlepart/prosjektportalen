import ListConfig from "../../Provision/Data/Config/ListConfig";
import Extension from "../../Provision/Extensions/Extension";
import ITemplateFile from "../../Provision/Template/ITemplateFile";
export default interface INewProjectFormConfig {
    showSettings?: boolean;
    listData?: ListConfig[];
    extensions?: Extension[];
    templates?: ITemplateFile[];
    defaultTemplate?: ITemplateFile;
    inheritPermissions?: boolean;
    siteTemplateSelectorEnabled?: boolean;
}
