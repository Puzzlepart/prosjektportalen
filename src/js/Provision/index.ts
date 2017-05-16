import * as Subsite from "./Subsite";
import { IProjectModel } from "../Model/ProjectModel";
import * as Data from "./Data";
import * as Template from "./Template";

/**
 * Maps the current handler to a text explaining the current handlers action
 */
const PROGRESS_MAP = {
    Files: __("ProvisionWeb_Progress_Handler_Files"),
    Lists: __("ProvisionWeb_Progress_Handler_Lists"),
    Navigation: __("ProvisionWeb_Progress_Handler_Navigation"),
    WebSettings: __("ProvisionWeb_Progress_Handler_WebSettings"),
    ComposedLook: __("ProvisionWeb_Progress_Handler_ComposedLook"),
    PropertyBagEntries: __("ProvisionWeb_Progress_Handler_PropertyBagEntries"),
};

/**
 * Provisions a project web
 *
 * @param model The project model
 * @param onProgress Progress callback function
 *
 * @returns Redirect URL
 */
const ProvisionWeb = (project: IProjectModel, onProgress: (step: string, progress: string) => void) => new Promise<string>((resolve, reject) => {
    onProgress(__("ProvisionWeb_CreatingWeb"), "");
    Subsite.Create(project.Title, project.Url, project.Description, project.InheritPermissions)
        .then((result: Subsite.ICreateResult) => {
            onProgress(__("ProvisionWeb_ApplyingTemplate"), "");
            Template.Apply(result.web, true, progress => onProgress(__("ProvisionWeb_ApplyingTemplate"), PROGRESS_MAP[progress]))
                .then(() => {
                    Data.CopyListContents(result.url, project.IncludeContent, msg => {
                        onProgress(__("ProvisionWeb_CopyListContent"), msg);
                    })
                        .then(() => {
                            resolve(result.redirectUrl);
                        })
                        .catch(reject);
                })
                .catch(reject);
        })
        .catch(reject);
});


export default ProvisionWeb;
