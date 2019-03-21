import IProvisionContext from "../IProvisionContext";
import ITemplateFile from "./ITemplateFile";
/**
 * Get template from templates library
 *
 * @param {IProvisionContext} context Provisioning context
 */
export default function GetTemplate(context: IProvisionContext): Promise<ITemplateFile>;
