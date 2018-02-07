import RESOURCE_MANAGER from "../../@localization";
import { Logger, LogLevel } from "sp-pnp-js";
import { WebProvisioner } from "sp-pnp-provisioning/lib/webprovisioner";
import IProvisionContext from "../IProvisionContext";
import ProvisionError from "../ProvisionError";
import IProvisionTemplate from "../IProvisionTemplate";
import ApplyTemplateProgressMap from "./ApplyTemplateProgressMap";

/**
 * Get default template from templates library
 *
 * @param {IProvisionContext} context Provisioning context
 */
export async function GetDefaultTemplate(context: IProvisionContext): Promise<IProvisionTemplate> {
    const templatesLib = context.rootWeb.lists.getByTitle(RESOURCE_MANAGER.getResource("Lists_Templates_Title"));
    try {
        const [defaultTemplate] = await templatesLib
            .items
            .select("Title", "LinkFilename", "FileRef")
            .filter("GtIsDefault eq 1")
            .orderBy("GtOrder")
            .top(1)
            .get();
        if (defaultTemplate) {
            const fileRef = defaultTemplate.FileRef;
            const defaultTemplateFile = context.rootWeb.getFileByServerRelativeUrl(fileRef);
            const defaultTemplateFileText = await defaultTemplateFile.getText();
            const defaultTemplateFileJson = JSON.parse(defaultTemplateFileText);
            Logger.log({ message: "GetDefaultTemplate: Successfully retrieved default template", data: { fileRef }, level: LogLevel.Info });
            return { fileRef, schema: defaultTemplateFileJson };
        } else {
            Logger.log({ message: "GetDefaultTemplate: No default template found", level: LogLevel.Info });
            throw new ProvisionError("No default template found.", "GetDefaultTemplate");
        }
    } catch (err) {
        Logger.log({ message: "GetDefaultTemplate: Failed to retrieve default template", level: LogLevel.Error });
        throw new ProvisionError(err, "GetDefaultTemplate");
    }
}

/**
 * Applies the template to the specified web
 *
 * @param {IProvisionContext} context Provisioning context
 */
export async function ApplyTemplate(context: IProvisionContext): Promise<void> {
    context.progressCallbackFunc(RESOURCE_MANAGER.getResource("ProvisionWeb_ApplyingTemplate"), "");
    const callbackFunc = objHandler => context.progressCallbackFunc(RESOURCE_MANAGER.getResource("ProvisionWeb_ApplyingTemplate"), ApplyTemplateProgressMap[objHandler]);
    try {
        const template = {
            ...context.template.schema,
            WebSettings: {
                ...context.template.schema.WebSettings,
                AlternateCssUrl: `${context.webProperties.pp_assetssiteurl}/SiteAssets/pp/css/pp.main.css`,
                SiteLogoUrl: `${context.webProperties.pp_assetssiteurl}/SiteAssets/pp/img/ICO-Site-Project-11.png`,
            },
            PropertyBagEntries: [{
                Key: "pp_version",
                Value: context.webProperties.pp_version,
                Overwrite: true,
                Indexed: true,
            }],
        };
        await new WebProvisioner(context.web).applyTemplate(template, callbackFunc);
        Logger.log({ message: "ApplyTemplate: Template applied successfully", data: {}, level: LogLevel.Info });
    } catch (err) {
        Logger.log({ message: "ApplyTemplate: Failed to apply template", data: {}, level: LogLevel.Error });
        throw new ProvisionError(err, "ApplyTemplate");
    }
}


