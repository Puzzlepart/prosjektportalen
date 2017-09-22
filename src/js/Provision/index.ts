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
import SpListLogger, { LogLevel } from "../Util/SpListLogger";
import IProgressCallback from "./IProgressCallback";

const __listLogger = new SpListLogger();


/**
 * Provisions a project web
 *
 * @param {IProjectModel} model The project model
 * @param {IProgressCallback} onUpdateProgress Progress callback function
 *
 * @returns {string} Redirect URL
 */
async function ProvisionWeb(project: IProjectModel, onUpdateProgress: IProgressCallback): Promise<string> {
    try {
        onUpdateProgress(RESOURCE_MANAGER.getResource("ProvisionWeb_CreatingWeb"), "");
        const createWebResult = await CreateWeb(project.Title, project.Url, project.Description, _spPageContextInfo.webLanguage, project.InheritPermissions);
        const webProperties = await GetAllProperties();
        onUpdateProgress(RESOURCE_MANAGER.getResource("ProvisionWeb_ApplyingTemplate"), "");
        await ApplyProvisioningTemplate(createWebResult.web, webProperties.get_fieldValues(), onUpdateProgress);
        await ApplyExtensions(createWebResult.web, onUpdateProgress);
        await CopyDefaultData(createWebResult.url, project.IncludeContent, onUpdateProgress);
        return createWebResult.redirectUrl;
    } catch (err) {
        let Message, ErrorTraceCorrelationId, ErrorTypeName;
        if (err.hasOwnProperty("sender") && err.hasOwnProperty("args")) {
            const { args } = err;
            ErrorTraceCorrelationId = args.get_errorTraceCorrelationId();
            ErrorTypeName = args.get_errorTypeName();
            Message = args.get_message();
        } else {
            Message = err;
        }
        __listLogger.log({ Message, LogLevel: LogLevel.Error, ErrorTraceCorrelationId, ErrorTypeName, LogURL: project.Url });
    }
}

export { DoesWebExist };

export default ProvisionWeb;
