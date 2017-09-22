import RESOURCE_MANAGER from "localization";
import { WebProvisioner } from "sp-pnp-provisioning/lib/webprovisioner";
import { Schema } from "sp-pnp-provisioning/lib/schema";
import {
    Files,
    Lists,
    Navigation,
    WebSettings,
    ComposedLook,
} from "./Objects";
import IProgressCallback from "../IProgressCallback";
import ProvisionError from "../ProvisionError";

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

let Template: Schema = {
    Files,
    Lists,
    Navigation,
    WebSettings,
    ComposedLook,
    Features: [{
        id: "87294c72-f260-42f3-a41b-981a2ffce37a",
        deactivate: true,
        force: true,
    }],
};

/**
 * Applies the template to the specified web
 *
 * @param {any} web The web
 * @param {Object} propBag Property bag values
 * @param {IProgressCallback} onUpdateProgress Callback function for progress
 */
async function ApplyProvisioningTemplate(web, propBag: { [key: string]: string }, onUpdateProgress: IProgressCallback): Promise<void> {
    const webProvisioner = new WebProvisioner(web);
    const callbackFunc = objHandler => onUpdateProgress(RESOURCE_MANAGER.getResource("ProvisionWeb_ApplyingTemplate"), PROGRESS_MAP[objHandler]);
    try {
        await webProvisioner.applyTemplate({
            ...Template,
            WebSettings: {
                ...Template.WebSettings,
                AlternateCssUrl: `${propBag.pp_assetssiteurl}/siteassets/pp/css/pp.main.css`,
                SiteLogoUrl: `${propBag.pp_assetssiteurl}/SiteAssets/pp/img/ICO-Site-Project-11.png`,
            },
            PropertyBagEntries: [{
                Key: "pp_version",
                Value: propBag.pp_version,
                Overwrite: true,
                Indexed: true,
            }],
        }, callbackFunc);
        return;
    } catch (err) {
        throw new ProvisionError(err, "ApplyProvisioningTemplate");
    }
}

export { ApplyProvisioningTemplate };


