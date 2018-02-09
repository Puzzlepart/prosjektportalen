import { Logger, LogLevel } from "sp-pnp-js";
import IProvisionContext from "../IProvisionContext";
import ProvisionError from "../ProvisionError";
import ITemplateFile from "./ITemplateFile";

/**
 * Get template from templates library
 *
 * @param {IProvisionContext} context Provisioning context
 */
export default async function GetTemplate(context: IProvisionContext): Promise<ITemplateFile> {
    try {
        let template = context.template;
        const templateFileText = await context.rootWeb.getFileByServerRelativeUrl(template.FileRef).getText();
        template.Schema = JSON.parse(templateFileText);
        return template;
    } catch (err) {
        Logger.log({ message: "(GetTemplate) Failed to retrieve or parse template", level: LogLevel.Error });
        throw new ProvisionError(err, "GetTemplate");
    }
}
