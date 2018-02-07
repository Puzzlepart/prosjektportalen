import { Site } from "sp-pnp-js";
import { CreateWeb, DoesWebExist } from "./Subsite";
import { IProjectModel } from "../Model/ProjectModel";
import { CopyDefaultData } from "./Data";
import { ApplyTemplate, GetDefaultTemplate } from "./Template";
import { ApplyExtensions } from "./Extensions";
import { GetAllProperties } from "../Util/PropertyBag";
import SpListLogger, { LogLevel, ILogEntry } from "../Util/SpListLogger";
import IProgressCallback from "./IProgressCallback";
import IProvisionContext from "./IProvisionContext";

/**
 * Provisions a project web
 *
 * @param {IProjectModel} model The project model
 * @param {IProgressCallback} progressCallbackFunc Progress callback function
 * @param {string} templateFileRef Template file reference (site relative URL)
 *
 * @returns {string} Redirect URL
 */
export default async function ProvisionWeb(model: IProjectModel, progressCallbackFunc: IProgressCallback, templateFileRef?: string): Promise<string> {
    try {
        const rootWeb = new Site(_spPageContextInfo.siteAbsoluteUrl).rootWeb;
        let context: IProvisionContext = { model, progressCallbackFunc, rootWeb, template: { fileRef: templateFileRef } };
        context = await CreateWeb(context);
        context.webProperties = await GetAllProperties();
        context.template = await GetDefaultTemplate(context);
        await ApplyTemplate(context);
        await ApplyExtensions(context);
        await CopyDefaultData(context);
        return context.redirectUrl;
    } catch (err) {
        const logEntry: ILogEntry = { ...err, LogURL: model.Url, LogLevel: LogLevel.Error };
        new SpListLogger().log(logEntry);
        throw err;
    }
}

export {
    DoesWebExist,
    IProvisionContext,
};
