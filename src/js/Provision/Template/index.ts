import { Schema } from "sp-pnp-provisioning/lib/schema";
import { default as Files } from "./Objects/Files";
import { default as Lists } from "./Objects/Lists";
import { default as Navigation } from "./Objects/Navigation";
import { default as WebSettings } from "./Objects/WebSettings";
import { default as ComposedLook } from "./Objects/ComposedLook";
import { default as PropertyBagEntries } from "./Objects/PropertyBagEntries";
import { WebProvisioner } from "sp-pnp-provisioning/lib/webprovisioner";
import { MergeExtensions } from "../Extensions";
import * as PropertyBag from "../../Util/PropertyBag";

let Template: Schema = {
    Files: Files,
    Lists: Lists,
    Navigation: Navigation,
    WebSettings: WebSettings,
    ComposedLook: ComposedLook,
    PropertyBagEntries: PropertyBagEntries,
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
 * @param includeExtensions Include extensions
 * @param progressCallback Callback function for progress
 */
export const Apply = (web, includeExtensions = false, progressCallback?: (progress: string) => void) => new Promise<void>((resolve, reject) => {
    PropertyBag.GetAllProperties().then(({ pp_assetssiteurl }) => {
        Template.WebSettings.AlternateCssUrl = `${pp_assetssiteurl}/siteassets/pp/css/pp.main.css`;
        if (includeExtensions) {
            MergeExtensions(Template).then(t => {
                new WebProvisioner(web).applyTemplate(t, progressCallback)
                    .then(resolve)
                    .catch(_ => {
                        reject(_);
                    });
            });
        } else {
            new WebProvisioner(web).applyTemplate(Template)
                .then(resolve)
                .catch(_ => {
                    reject("");
                });
        }
    });
});

