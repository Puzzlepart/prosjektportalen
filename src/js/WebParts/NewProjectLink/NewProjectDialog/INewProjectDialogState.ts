import * as ListDataConfig from "../../../Provision/Data/Config";
import { IProjectModel } from "../../../Model";

interface INewProjectDialogState {
    model: IProjectModel;
    errorMessages?: any;
    showAdvancedSettings: boolean;
    urlInputEnabled: boolean;
    formValid: boolean;
    listDataConfig?: { [key: string]: ListDataConfig.IListConfig };
    showCreationModal: boolean;
    provisioning: {
        isCreating: boolean;
        step?: string;
        progress?: string;
        error?: any;
    };
}

export default INewProjectDialogState;
