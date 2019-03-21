import { ProjectModel } from "../../Model";
import INewProjectFormConfig from "./INewProjectFormConfig";
import ITemplateFile from "../../Provision/Template/ITemplateFile";
export declare enum ProvisionStatus {
    Idle = 0,
    Creating = 1,
    Error = 2
}
interface INewProjectFormState {
    isLoading: boolean;
    model: ProjectModel;
    errorMessages: {
        [key: string]: string;
    };
    provisioning: {
        status: ProvisionStatus;
        step?: string;
        progress?: string;
        error?: any;
    };
    formValid?: boolean;
    showListContentSettings?: boolean;
    config?: INewProjectFormConfig;
    selectedTemplate?: ITemplateFile;
}
export default INewProjectFormState;
