import { IProjectModel } from "../../../Model";

export default interface INewProjectDialogState {
    model: IProjectModel;
    errorMessages?: any;
    showAdvancedSettings?: boolean;
    urlInputEnabled?: boolean;
    formValid?: boolean;
    provisioning: {
        isCreating: boolean;
        step?: string;
        progress?: string;
        error?: any;
    };
}

