import { IProjectModel } from "../../Model";

import INewProjectFormConfig from "./INewProjectFormConfig";

export enum ProvisionStatus {
    Idle,
    Creating,
    Error,
}

export default interface INewProjectFormState {
    model: IProjectModel;
    errorMessages: any;
    provisioning: {
        status: ProvisionStatus;
        step?: string;
        progress?: string;
        error?: any;
    };
    formValid?: boolean;
    showListContentSettings?: boolean;
    config: INewProjectFormConfig;
}

