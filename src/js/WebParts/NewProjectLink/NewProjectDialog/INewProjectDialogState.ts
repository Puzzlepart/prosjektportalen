import * as ListDataConfig from "../../../Provision/Data/Config";
import { IProjectModel } from "../../../Model";

interface INewProjectDialogState {
    model: IProjectModel;
    showAdvancedSettings: boolean;
    urlInputEnabled: boolean;
    formValid: boolean;
    listDataConfig?: { [key: string]: ListDataConfig.IListConfig };
}

export default INewProjectDialogState;
