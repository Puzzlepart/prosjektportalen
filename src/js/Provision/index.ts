import { Site } from "sp-pnp-js";
import { CreateWeb, DoesWebExist } from "./Subsite";
import { IProjectModel } from "../Model/ProjectModel";
import { CopyDefaultData } from "./Data";
import { ApplyTemplate, GetTemplate } from "./Template";
import { ApplyExtensions } from "./Extensions";
import { GetAllProperties } from "../Util/PropertyBag";
import SpListLogger, { LogLevel, ILogEntry } from "../Util/SpListLogger";
import IProgressCallback from "./IProgressCallback";
import IProvisionContext from "./IProvisionContext";
import ITemplateFile from "./Template/ITemplateFile";

/**
 * Provisions a project web
 *
 * @param {IProjectModel} model The project model
 * @param {IProgressCallback} progressCallbackFunc Progress callback function
 * @param {ITemplateFile} templateFile Template file
 *
 * @returns {string} Redirect URL
 */
export default async function ProvisionWeb(model: IProjectModel, progressCallbackFunc: IProgressCallback, templateFile: ITemplateFile): Promise<string> {
    try {
        const rootWeb = new Site(_spPageContextInfo.siteAbsoluteUrl).rootWeb;
        let context: IProvisionContext = { model, progressCallbackFunc, rootWeb, template: templateFile };
        context = await CreateWeb(context);
        context.webProperties = await GetAllProperties();
        context.template = await GetTemplate(context);
        await ApplyTemplate(context);
        await ApplyExtensions(context);
        await CopyDefaultData(context);
        return context.redirectUrl;
    } catch (err) {
        const logEntry: ILogEntry = { ...err, LogURL: model.Url, LogLevel: LogLevel.Error };
        await new SpListLogger().log(logEntry);
        throw err;
    }
}

export { DoesWebExist, IProvisionContext };
