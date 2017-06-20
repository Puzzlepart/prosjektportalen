import { sp } from "sp-pnp-js";
import IExtension from "./IExtension";
import LoadExtension from "./LoadExtension";
/**
 * Get extensions
 */
const GetValidExtensions = (extensionLib = __("Lists_Extensions_Title")) => new Promise<IExtension[]>((resolve, reject) => {
    sp.web
        .lists
        .getByTitle(extensionLib)
        .items
        .select("Title", "LinkFilename", "FileRef")
        .filter("ExtensionEnabled eq 1")
        .orderBy("ExtensionOrder")
        .get()
        .then(items => {
            Promise.all(items.map(item => LoadExtension(item)))
                .then((extensions: any[]) => {
                    const validExtensions = extensions.filter(ext => ext.data !== null);
                    resolve(validExtensions);
                })
                .catch(_ => resolve([]));
        })
        .catch(_ => resolve([]));
});

export default GetValidExtensions;
