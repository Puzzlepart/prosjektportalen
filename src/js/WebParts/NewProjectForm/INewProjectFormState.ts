import ListConfig from "../../Provision/Data/Config/ListConfig";
import { IProjectModel } from "../../Model";

export enum ProvisionStatus {
    Idle,
    Creating,
    Error,
}

export default interface INewProjectFormState {
    model?: IProjectModel;
    errorMessages?: any;
    showListContentSettings?: boolean;
    formValid?: boolean;
    provisioning: {
        status: ProvisionStatus;
        step?: string;
        progress?: string;
        error?: any;
    };
    listDataConfig?: { [key: string]: ListConfig };
}

