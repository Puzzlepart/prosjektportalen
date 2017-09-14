import {
    CreateWeb,
    DoesWebExist,
    ICreateWebResult,
} from "./Subsite";
import { IProjectModel } from "../Model/ProjectModel";
import { CopyDefaultData } from "./Data";
import { ApplyJsTemplate } from "./Template";
import { ApplyExtensions } from "./Extensions";
import { GetAllProperties } from "../Util/PropertyBag";
import SpListLogger, { LogLevel } from "../Util/SpListLogger";
import IProgressCallback from "./IProgressCallback";

const listLogger = new SpListLogger();


/**
 * Provisions a project web
 *
 * @param {IProjectModel} model The project model
 * @param {IProgressCallback} onUpdateProgress Progress callback function
 *
 * @returns {string} Redirect URL
 */
const ProvisionWeb = (project: IProjectModel, onUpdateProgress: IProgressCallback) => new Promise<string>((resolve, reject) => {
    onUpdateProgress(__("ProvisionWeb_CreatingWeb"), "");
    CreateWeb(project.Title, project.Url, project.Description, project.InheritPermissions)
        .then((result: ICreateWebResult) => {
            GetAllProperties()
                .then(propBagAllProps => {
                    onUpdateProgress(__("ProvisionWeb_ApplyingTemplate"), "");
                    ApplyJsTemplate(result.web, propBagAllProps.get_fieldValues(), onUpdateProgress)
                        .then(() => {
                            ApplyExtensions(result.web, onUpdateProgress)
                                .then(() => {
                                    CopyDefaultData(result.url, project.IncludeContent, onUpdateProgress)
                                        .then(() => {
                                            resolve(result.redirectUrl);
                                        })
                                        .catch(err => OnProvisionWebFail("CopyDefaultData", err, reject, resolve, result.url, result.redirectUrl));
                                })
                                .catch(err => OnProvisionWebFail("ApplyExtensions", err, reject, resolve, result.url));
                        })
                        .catch(err => OnProvisionWebFail("ApplyJsTemplate", err, reject, resolve, result.url));
                })
                .catch(err => OnProvisionWebFail("GetAllProperties", err, reject, resolve, result.url));
        })
        .catch(err => OnProvisionWebFail("CreateWeb", err, reject, resolve));
});

/**
 * On provision web fail function
 *
 * @param {string} func Function the error occured in
 * @param {any} err Error details
 * @param {Function} rejectFunc Reject callback
 * @param {Function} resolveFunc Resolve callback
 * @param {string} url URL
 * @param {any} resolveData Resolve data
 */
const OnProvisionWebFail = (func: string, err: any, rejectFunc: (reason) => void, resolveFunc: (resolveData?: any) => void, url?: string, resolveData?: any): void => {
    let Message, ErrorTraceCorrelationId, ErrorTypeName, LogURL;

    if (err.hasOwnProperty("sender") && err.hasOwnProperty("args")) {
        const { args } = err;
        ErrorTraceCorrelationId = args.get_errorTraceCorrelationId();
        ErrorTypeName = args.get_errorTypeName();
        Message = args.get_message();
    } else {
        Message = err;
    }

    if (url) {
        LogURL = url;
    }

    const isWarning = Array.contains(["CopyDefaultData", "ApplyExtensions"], func);

    listLogger.log({ Message, Source: func, LogLevel: isWarning ? LogLevel.Warning : LogLevel.Error, ErrorTraceCorrelationId, ErrorTypeName, LogURL });

    if (isWarning) {
        resolveFunc(resolveData);
    } else {
        rejectFunc(err);
    }
};

export { DoesWebExist };

export default ProvisionWeb;
