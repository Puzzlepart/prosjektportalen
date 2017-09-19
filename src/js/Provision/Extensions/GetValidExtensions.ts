import Localization from "localization";
import { Site } from "sp-pnp-js";
import IExtension from "./IExtension";
import LoadExtension from "./LoadExtension";

/**
 * Get extensions
 *
 * @param {string} extensionLibTitle Extension library title
 */
const GetValidExtensions = (extensionLibTitle = Localization.getResource("Lists_Extensions_Title")) => new Promise<IExtension[]>((resolve, reject) => {
    const rootWeb = new Site(_spPageContextInfo.siteAbsoluteUrl).rootWeb;
    const extensionLib = rootWeb.lists.getByTitle(extensionLibTitle);
    extensionLib.items
        .select("Title", "LinkFilename", "FileRef")
        .filter("ExtensionEnabled eq 1")
        .orderBy("ExtensionOrder")
        .get()
        .then(items => {
            Promise.all(items.map(item => LoadExtension(item)))
                .then((extensions: any[]) => {
                    const validExtensions = (extensions as IExtension[]).filter(ext => ext.isValid);
                    resolve(validExtensions);
                })
                .catch(reject);
        })
        .catch(reject);
});

export default GetValidExtensions;
