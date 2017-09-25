import RESOURCE_MANAGER from "localization";
import { Site } from "sp-pnp-js";
import IExtension from "./IExtension";
import LoadExtension from "./LoadExtension";

/**
 * Get extensions
 *
 * @param {string} extensionLibTitle Extension library title
 */
async function GetValidExtensions(extensionLibTitle = RESOURCE_MANAGER.getResource("Lists_Extensions_Title")): Promise<IExtension[]> {
    const rootWeb = new Site(_spPageContextInfo.siteAbsoluteUrl).rootWeb;
    const extensionLib = rootWeb.lists.getByTitle(extensionLibTitle);
    try {
        const extensionFiles = await extensionLib.items
            .select("Title", "LinkFilename", "FileRef")
            .filter("ExtensionEnabled eq 1")
            .orderBy("ExtensionOrder")
            .get();
        const extensions: any[] = await Promise.all(extensionFiles.map(file => LoadExtension(file)));
        const validExtensions = extensions.filter(ext => ext.isValid);
        return validExtensions;
    } catch (err) {
        return [];
    }
}

export default GetValidExtensions;
