import ListConfig from "../../../Provision/Data/Config/ListConfig";
import { IProjectModel } from "../../../Model";

interface INewProjectDialogState {
    model: IProjectModel;
    errorMessages?: any;
    showAdvancedSettings: boolean;
    urlInputEnabled: boolean;
    formValid: boolean;
    listDataConfig?: { [key: string]: ListConfig };
    showCreationModal: boolean;
    provisioning: {
        isCreating: boolean;
        step?: string;
        progress?: string;
        error?: any;
    };
}

export default INewProjectDialogState;
