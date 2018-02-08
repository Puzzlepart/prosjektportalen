import { Web } from "sp-pnp-js";
import { IProjectModel } from "../Model/ProjectModel";
import IProgressCallback from "./IProgressCallback";
import ITemplateFile from "./Template/ITemplateFile";

export default interface IProvisionContext {
    model: IProjectModel;
    progressCallbackFunc: IProgressCallback;
    rootWeb: Web;
    web?: Web;
    url?: string;
    redirectUrl?: string;
    template?: ITemplateFile;
    webProperties?: { pp_assetssiteurl: string, pp_datasourcesiteurl: string, pp_version: string };
}
