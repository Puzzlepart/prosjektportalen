import {
    CreateWeb,
    DoesWebExist,
    ICreateWebResult,
} from "./Subsite";
import { IProjectModel } from "../Model/ProjectModel";
import { CopyListContents } from "./Data";
import { ApplyJsTemplate } from "./Template";
import { ApplyExtensions } from "./Extensions";
import { GetAllProperties } from "../Util/PropertyBag";
import IProgressCallback from "./IProgressCallback";


/**
 * Provisions a project web
 *
 * @param {IProjectModel} model The project model
 * @param {IProgressCallback} onUpdateProgress Progress callback function
 *
 * @returns Redirect URL
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
                                    CopyListContents(result.url, project.IncludeContent, onUpdateProgress)
                                        .then(() => {
                                            resolve(result.redirectUrl);
                                        })
                                        .catch(reject);
                                })
                                .catch(reject);
                        })
                        .catch(reject);
                })
                .catch(reject);
        })
        .catch(reject);
});

export { DoesWebExist };

export default ProvisionWeb;
