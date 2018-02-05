import RESOURCE_MANAGER from "../../@localization";
import { WebProvisioner } from "sp-pnp-provisioning/lib/webprovisioner";
import IProvisionContext from "../IProvisionContext";
import ProvisionError from "../ProvisionError";
import FullTemplate from "./FullTemplate";

/**
 * Maps the current handler to a text explaining the current handlers action
 */
const PROGRESS_MAP = {
    Files: RESOURCE_MANAGER.getResource("ProvisionWeb_Progress_Handler_Files"),
    Lists: RESOURCE_MANAGER.getResource("ProvisionWeb_Progress_Handler_Lists"),
    Navigation: RESOURCE_MANAGER.getResource("ProvisionWeb_Progress_Handler_Navigation"),
    WebSettings: RESOURCE_MANAGER.getResource("ProvisionWeb_Progress_Handler_WebSettings"),
    ComposedLook: RESOURCE_MANAGER.getResource("ProvisionWeb_Progress_Handler_ComposedLook"),
    PropertyBagEntries: RESOURCE_MANAGER.getResource("ProvisionWeb_Progress_Handler_PropertyBagEntries"),
};

/**
 * Applies the template to the specified web
 *
 * @param {IProvisionContext} context Provisioning context
 */
export async function ApplyProvisioningTemplate(context: IProvisionContext): Promise<void> {
    context.progressCallbackFunc(RESOURCE_MANAGER.getResource("ProvisionWeb_ApplyingTemplate"), "");
    const webProvisioner = new WebProvisioner(context.web);
    const callbackFunc = objHandler => context.progressCallbackFunc(RESOURCE_MANAGER.getResource("ProvisionWeb_ApplyingTemplate"), PROGRESS_MAP[objHandler]);
    try {
        const template = {
            ...FullTemplate,
            WebSettings: {
                ...FullTemplate.WebSettings,
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
        await webProvisioner.applyTemplate(template, callbackFunc);
        return;
    } catch (err) {
        throw new ProvisionError(err, "ApplyProvisioningTemplate");
    }
}


