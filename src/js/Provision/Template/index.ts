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
export const ApplyJsTemplate = (web, propBag: { [key: string]: string }, onUpdateProgress: IProgressCallback) => new Promise<void>((resolve, reject) => {
    Template.WebSettings.AlternateCssUrl = `${propBag.pp_assetssiteurl}/siteassets/pp/css/pp.main.css`;
    Template.WebSettings.SiteLogoUrl = `${propBag.pp_assetssiteurl}/SiteAssets/pp/img/ICO-Site-Project-11.png`;
    Template.PropertyBagEntries = [{
        Key: "pp_version",
        Value: propBag.pp_version,
        Overwrite: true,
        Indexed: true,
    }];
    new WebProvisioner(web).applyTemplate(Template, msg => onUpdateProgress(__("ProvisionWeb_ApplyingTemplate"), PROGRESS_MAP[msg]))
        .then(resolve)
        .catch(reject);
});

