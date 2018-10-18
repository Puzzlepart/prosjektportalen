import __ from "../../Resources";
import {  Logger, LogLevel } from "@pnp/logging";
import { WebProvisioner } from "sp-js-provisioning/lib/webprovisioner";
import IProvisionContext from "../IProvisionContext";
import ProvisionError from "../ProvisionError";
import ApplyTemplateProgressMap from "./ApplyTemplateProgressMap";

/**
 * Applies the template to the specified web
 *
 * @param {IProvisionContext} context Provisioning context
 */
export default async function ApplyTemplate(context: IProvisionContext): Promise<void> {
    context.progressCallbackFunc(__.getResource("ProvisionWeb_ApplyingTemplate"), "");
    const callbackFunc = objHandler => context.progressCallbackFunc(__.getResource("ProvisionWeb_ApplyingTemplate"), ApplyTemplateProgressMap[objHandler]);
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
            },
            {
                Key: "pp_template",
                Value: context.template.Title,
                Overwrite: true,
                Indexed: true,
            }],
        };
        await new WebProvisioner(context.web).applyTemplate(template, callbackFunc);
        Logger.log({ message: "(ApplyTemplate) Template applied successfully", data: {}, level: LogLevel.Info });
    } catch (err) {
        Logger.log({ message: "(ApplyTemplate) Failed to apply template", data: {}, level: LogLevel.Error });
        throw new ProvisionError(err, "ApplyTemplate");
    }
}
