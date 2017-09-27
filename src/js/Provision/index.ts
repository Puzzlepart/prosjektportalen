import RESOURCE_MANAGER from "localization";
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

const __listLogger = new SpListLogger();


/**
 * Provisions a project web
 *
 * @param {IProjectModel} model The project model
 * @param {IProgressCallback} progressCallbackFunc Progress callback function
 *
 * @returns {string} Redirect URL
 */
async function ProvisionWeb(project: IProjectModel, progressCallbackFunc: IProgressCallback): Promise<string> {
    try {
        let context: IProvisionContext = {
            model: project,
            progressCallbackFunc,
        };
        context.webCreationResult = await CreateWeb(context);
        context.webProperties = await GetAllProperties();
        await ApplyProvisioningTemplate(context);
        await ApplyExtensions(context);
        await CopyDefaultData(context);
        return context.webCreationResult.redirectUrl;
    } catch (err) {
        const logEntry: ILogEntry = {
            ...err,
            LogURL: project.Url,
            LogLevel: LogLevel.Error,
        };
        __listLogger.log(logEntry);
        throw err;
    }
}

export { DoesWebExist };

export default ProvisionWeb;
