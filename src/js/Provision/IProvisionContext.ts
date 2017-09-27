import ICreateWebResult from "./Subsite/ICreateWebResult";
import { IProjectModel } from "../Model/ProjectModel";
import IProgressCallback from "./IProgressCallback";

export default interface IProvisionContext {
    model: IProjectModel;
    progressCallbackFunc: IProgressCallback;
    webCreationResult?: ICreateWebResult;
    webProperties?: { pp_assetssiteurl: string, pp_datasourcesiteurl: string, pp_version: string };
}
