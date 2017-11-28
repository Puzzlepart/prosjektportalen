import RESOURCE_MANAGER from "../../@localization";
import { Site } from "sp-pnp-js";
import Extension from "./Extension";
import LoadExtension from "./LoadExtension";

/**
 * Get selectable extensions
 */
export default async function GetSelectableExtensions(): Promise<Extension[]> {
    const rootWeb = new Site(_spPageContextInfo.siteAbsoluteUrl).rootWeb;
    const extensionLib = rootWeb.lists.getByTitle(RESOURCE_MANAGER.getResource("Lists_Extensions_Title"));
    try {
        const files = await extensionLib.items.select("Title", "Comments", "LinkFilename", "FileRef", "GtIsEnabled").filter("GtShowInNewForm eq 1").orderBy("GtOrder").get();
        const extensions: Extension[] = await Promise.all(files.map(file => LoadExtension(file)));
        if (extensions && extensions.length) {
            const validExtensions = extensions.filter(ext => ext.IsValid);
            return validExtensions;
        }
        return [];
    } catch (err) {
        return [];
    }
}
