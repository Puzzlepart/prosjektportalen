import { ProjectModel } from "../../Model";
import INewProjectFormConfig from "./INewProjectFormConfig";
import ITemplateFile from "../../Provision/Template/ITemplateFile";

export enum ProvisionStatus { Idle, Creating, Error }

interface INewProjectFormState {
    isLoading: boolean;
    model: ProjectModel;
    errorMessages: { [key: string]: string };
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
