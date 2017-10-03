import { IProjectModel } from "../../../Model";

export default interface INewProjectDialogState {
    model: IProjectModel;
    errorMessages?: any;
    showListContentSettings?: boolean;
    urlInputEnabled?: boolean;
    formValid?: boolean;
    provisioning: {
        isCreating: boolean;
        step?: string;
        progress?: string;
        error?: any;
    };
}

