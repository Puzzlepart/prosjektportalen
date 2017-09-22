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
        progressCallbackFunc(RESOURCE_MANAGER.getResource("ProvisionWeb_CreatingWeb"), "");
        const createWebResult = await CreateWeb(project.Title, project.Url, project.Description, _spPageContextInfo.webLanguage, project.InheritPermissions);
        const webProperties = await GetAllProperties();
        progressCallbackFunc(RESOURCE_MANAGER.getResource("ProvisionWeb_ApplyingTemplate"), "");
        await ApplyProvisioningTemplate(createWebResult.web, webProperties.get_fieldValues(), progressCallbackFunc);
        await ApplyExtensions(createWebResult.web, progressCallbackFunc);
        await CopyDefaultData(createWebResult.url, project.IncludeContent, progressCallbackFunc);
        return createWebResult.redirectUrl;
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
