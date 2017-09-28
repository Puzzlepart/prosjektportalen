import { Web } from "sp-pnp-js";
import { IProjectModel } from "../Model/ProjectModel";
import IProgressCallback from "./IProgressCallback";

export default interface IProvisionContext {
    model: IProjectModel;
    progressCallbackFunc: IProgressCallback;
    web?: Web;
    url?: string;
    redirectUrl?: string;
    webProperties?: { pp_assetssiteurl: string, pp_datasourcesiteurl: string, pp_version: string };
}
