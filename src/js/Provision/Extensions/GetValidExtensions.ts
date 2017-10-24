import RESOURCE_MANAGER from "../../@localization";
import { Site } from "sp-pnp-js";
import IExtension from "./IExtension";
import LoadExtension from "./LoadExtension";

/**
 * Get extensions
 *
 * @param {string} extensionLibTitle Extension library title
 */

export default async function GetValidExtensions(extensionLibTitle = RESOURCE_MANAGER.getResource("Lists_Extensions_Title")): Promise<IExtension[]> {
    const rootWeb = new Site(_spPageContextInfo.siteAbsoluteUrl).rootWeb;
    const extensionLib = rootWeb.lists.getByTitle(extensionLibTitle);
    try {
        const files = await extensionLib.items.select("Title", "LinkFilename", "FileRef").filter("GtIsEnabled eq 1").orderBy("GtOrder").get();
        const extensions: any[] = await Promise.all(files.map(file => LoadExtension(file)));
        if (extensions && extensions.length) {
            const validExtensions = extensions.filter(ext => ext.isValid);
            return validExtensions;
        }
        return [];
    } catch (err) {
        return [];
    }
}
