import ListConfig from "../../../Provision/Data/Config/ListConfig";
import { IProjectModel } from "../../../Model";

export default interface INewProjectDialogState {
    isLoading: boolean;
    model: IProjectModel;
    errorMessages?: any;
    showAdvancedSettings?: boolean;
    urlInputEnabled?: boolean;
    formValid?: boolean;
    listDataConfig?: { [key: string]: ListConfig };
    provisioning: {
        isCreating: boolean;
        step?: string;
        progress?: string;
        error?: any;
    };
}

