import ListConfig from '../../Provision/Data/Config/ListConfig'
import ProjectType from '../../Provision/Data/ProjectTypes/ProjectType'
import Extension from '../../Provision/Extensions/Extension'
import ITemplateFile from '../../Provision/Template/ITemplateFile'

export default interface INewProjectFormConfig {
    showSettings?: boolean;
    showProjectTypes?: boolean;
    listData?: ListConfig[];
    projectTypes?: ProjectType[];
    extensions?: Extension[];
    templates?: ITemplateFile[];
    defaultTemplate?: ITemplateFile;
    inheritPermissions?: boolean;
    siteTemplateSelectorEnabled?: boolean;
}
