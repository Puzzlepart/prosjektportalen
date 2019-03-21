import { DoesWebExist } from "./Subsite";
import { ProjectModel } from "../Model/ProjectModel";
import IProgressCallback from "./IProgressCallback";
import IProvisionContext from "./IProvisionContext";
import ITemplateFile from "./Template/ITemplateFile";
/**
 * Provisions a project web
 *
 * @param {ProjectModel} model The project model
 * @param {IProgressCallback} progressCallbackFunc Progress callback function
 * @param {ITemplateFile} templateFile Template file
 *
 * @returns {string} Redirect URL
 */
export default function ProvisionWeb(model: ProjectModel, progressCallbackFunc: IProgressCallback, templateFile: ITemplateFile): Promise<string>;
export { DoesWebExist, IProvisionContext };
