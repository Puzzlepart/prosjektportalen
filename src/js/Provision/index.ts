import * as Subsite from "./Subsite";
import { IProjectModel } from "../Model/ProjectModel";
import * as Data from "./Data";
import * as Template from "./Template";
import * as Util from "../Util";

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

let [DlgTitle, DlgMessage] = __("ProvisionWeb_CreatingWeb").split(",");
const waitDlg = new Util.WaitDialog(DlgTitle, DlgMessage, 120, 550);

/**
 * Provisions a project web
 *
 * @param model The project model
 *
 * @returns Redirect URL
 */
const ProvisionWeb = (project: IProjectModel): Promise<string> => {
    return new Promise<string>((resolve, reject) => {
        waitDlg.start();
        Subsite.Create(project.Title, project.Url, project.Description, project.InheritPermissions)
            .then((result: Subsite.ICreateResult) => {
                waitDlg.update(__("ProvisionWeb_ApplyingTemplate"));
                Template.Apply(result.web, true, progress => waitDlg.updateMessage(PROGRESS_MAP[progress])).then(() => {
                    Data.CopyListContents(result.url, project.IncludeContent, msg => {
                        waitDlg.update(__("ProvisionWeb_CopyListContent"), msg);
                    }).then(() => {
                        waitDlg.end();
                        resolve(result.redirectUrl);
                    }).catch(_ => {
                        waitDlg.end();
                        reject(_);
                    });
                }).catch(_ => {
                    waitDlg.end();
                    reject(_);
                });
            }).catch(_ => {
                waitDlg.end();
                reject(_);
            });
    });
};


export default ProvisionWeb;
