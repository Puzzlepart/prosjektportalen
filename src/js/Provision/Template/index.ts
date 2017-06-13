import { WebProvisioner } from "sp-pnp-provisioning/lib/webprovisioner";
import { Schema } from "sp-pnp-provisioning/lib/schema";
import {
    Files,
    Lists,
    Navigation,
    WebSettings,
    ComposedLook,
    PropertyBagEntries,
} from "./Objects";
import IProgressCallback from "../IProgressCallback";

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

let Template: Schema = {
    Files,
    Lists,
    Navigation,
    WebSettings,
    ComposedLook,
    PropertyBagEntries,
    Features: [{
        id: "87294c72-f260-42f3-a41b-981a2ffce37a",
        deactivate: true,
        force: true,
    }],
};

/**
 * Applies the template to the specified web
 *
 * @param web The web
 * @param assetsUrl Assets URL
 * @param progressCallback Callback function for progress
 */
export const Apply = (web, assetsUrl: string, onProgress: IProgressCallback) => new Promise<void>((resolve, reject) => {
    Template.WebSettings.AlternateCssUrl = `${assetsUrl}/siteassets/pp/css/pp.main.css`;
    Template.WebSettings.SiteLogoUrl = `${assetsUrl}/SiteAssets/pp/img/ICO-Site-Project-11.png`;
    new WebProvisioner(web).applyTemplate(Template, msg => onProgress(__("ProvisionWeb_ApplyingTemplate"), PROGRESS_MAP[msg]))
        .then(resolve)
        .catch(reject);
});

