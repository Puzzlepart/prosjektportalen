import {
    CreateWeb,
    DoesWebExist,
    ICreateWebResult,
} from "./Subsite";
import { IProjectModel } from "../Model/ProjectModel";
import * as Data from "./Data";
import * as Template from "./Template";
import * as Extensions from "./Extensions";
import * as PropertyBag from "../Util/PropertyBag";
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
            PropertyBag.GetAllProperties().then(propBagAllProps => {
                onUpdateProgress(__("ProvisionWeb_ApplyingTemplate"), "");
                Template.Apply(result.web, propBagAllProps.get_fieldValues(), onUpdateProgress)
                    .then(() => {
                        Extensions.ApplyExtensions(result.web, onUpdateProgress)
                            .then(() => {
                                Data.CopyListContents(result.url, project.IncludeContent, onUpdateProgress)
                                    .then(() => {
                                        resolve(result.redirectUrl);
                                    }).catch(reject);
                            }).catch(reject);
                    }).catch(reject);
            }).catch(reject);
        }).catch(reject);
});

export { DoesWebExist };

export default ProvisionWeb;
