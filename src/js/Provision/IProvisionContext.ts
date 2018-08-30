import { Web } from "sp-pnp-js";
import { ProjectModel } from "../Model/ProjectModel";
import IProgressCallback from "./IProgressCallback";
import ITemplateFile from "./Template/ITemplateFile";

interface IProvisionContext {
    model: ProjectModel;
    progressCallbackFunc: IProgressCallback;
    rootWeb: Web;
    web?: Web;
    url?: string;
    redirectUrl?: string;
    template?: ITemplateFile;
    webProperties?: { pp_assetssiteurl: string, pp_datasourcesiteurl: string, pp_version: string };
}

export default IProvisionContext;

