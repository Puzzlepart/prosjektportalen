import RESOURCE_MANAGER from "../../@localization";
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
    const templatesLib = context.rootWeb.lists.getByTitle(RESOURCE_MANAGER.getResource("Lists_Templates_Title"));
    try {
        let template = context.template;
        if (template) {
            Logger.log({ message: "GetDefaultTemplate: Template present in context", level: LogLevel.Info });
        } else {
            Logger.log({ message: "GetDefaultTemplate: No template present in context. Retrieving default tempplate", level: LogLevel.Info });
            [template] = await templatesLib
                .items
                .select("Title", "LinkFilename", "FileRef")
                .filter("GtIsDefault eq 1 and GtIsEnabled eq 1")
                .orderBy("GtOrder")
                .top(1)
                .get();
            if (!template) {
                Logger.log({ message: "GetDefaultTemplate: No default template found", level: LogLevel.Info });
                throw new ProvisionError("No default template found.", "GetDefaultTemplate");
            }
            Logger.log({ message: "GetDefaultTemplate: Successfully retrieved default template", data: { template }, level: LogLevel.Info });
        }
        const templateFileText = await context.rootWeb.getFileByServerRelativeUrl(template.FileRef).getText();
        template.Schema = JSON.parse(templateFileText);
        return template;
    } catch (err) {
        Logger.log({ message: "GetDefaultTemplate: Failed to retrieve or parse template", level: LogLevel.Error });
        throw new ProvisionError(err, "GetDefaultTemplate");
    }
}
