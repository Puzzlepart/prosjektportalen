import RESOURCE_MANAGER from "../../@localization";
import { Logger, LogLevel } from "sp-pnp-js";
import { WebProvisioner } from "sp-pnp-provisioning/lib/webprovisioner";
import IProvisionContext from "../IProvisionContext";
import ProvisionError from "../ProvisionError";
import ApplyTemplateProgressMap from "./ApplyTemplateProgressMap";

/**
 * Applies the template to the specified web
 *
 * @param {IProvisionContext} context Provisioning context
 */
export default async function ApplyTemplate(context: IProvisionContext): Promise<void> {
    context.progressCallbackFunc(RESOURCE_MANAGER.getResource("ProvisionWeb_ApplyingTemplate"), "");
    const callbackFunc = objHandler => context.progressCallbackFunc(RESOURCE_MANAGER.getResource("ProvisionWeb_ApplyingTemplate"), ApplyTemplateProgressMap[objHandler]);
    try {
        const template = {
            ...context.template.Schema,
            WebSettings: {
                ...context.template.Schema.WebSettings,
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
