import ListConfig from "../../Provision/Data/Config/ListConfig";
import ListProjectType from "../../Provision/Data/ProjectTypes/ListProjectType";
import Extension from "../../Provision/Extensions/Extension";
import ITemplateFile from "../../Provision/Template/ITemplateFile";

export default interface INewProjectFormConfig {
    showSettings?: boolean;
    showProjectTypes?: boolean;
    listData?: ListConfig[];
    listProjectTypes?: ListProjectType[];
    extensions?: Extension[];
    templates?: ITemplateFile[];
    defaultTemplate?: ITemplateFile;
    inheritPermissions?: boolean;
    siteTemplateSelectorEnabled?: boolean;
}
