import {
    CreateWeb,
    DoesWebExist,
} from "./Subsite";
import { IProjectModel } from "../Model/ProjectModel";
import { CopyDefaultData } from "./Data";
import { ApplyProvisioningTemplate } from "./Template";
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
 *
 * @returns {string} Redirect URL
 */
export default async function ProvisionWeb(project: IProjectModel, progressCallbackFunc: IProgressCallback): Promise<string> {
    try {
        let context: IProvisionContext = {
            model: project,
            progressCallbackFunc,
        };
        context = await CreateWeb(context);
        context.webProperties = await GetAllProperties();
        await ApplyProvisioningTemplate(context);
        await ApplyExtensions(context);
        await CopyDefaultData(context);
        return context.redirectUrl;
    } catch (err) {
        const logEntry: ILogEntry = {
            ...err,
            LogURL: project.Url,
            LogLevel: LogLevel.Error,
        };
        new SpListLogger().log(logEntry);
        throw err;
    }
}

export {
    DoesWebExist,
    IProvisionContext,
};
