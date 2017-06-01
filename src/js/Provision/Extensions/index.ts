import { WebProvisioner } from "sp-pnp-provisioning/lib/webprovisioner";
import { sp, Logger, LogLevel } from "sp-pnp-js";
import { Schema } from "sp-pnp-provisioning/lib/schema";
import IProgressCallback from "../IProgressCallback";

export interface IExtension {
    Title: string;
    LinkFilename: string;
    FileRef: string;
    data?: Schema;
}


/**
 * Loads extension JSON
 *
 * @param file The extension file
 */
const LoadExtension = (extension: IExtension): Promise<IExtension> => new Promise<any>((resolve, reject) => {
    sp.web
        .getFileByServerRelativeUrl(extension.FileRef)
        .getText()
        .then(fileContents => {
            let data = null;
            try {
                data = JSON.parse(fileContents);
            } catch (e) {
                Logger.log({
                    message: `Extensions in file '${extension.LinkFilename}' contains invalid JSON.`,
                    data: { Text: fileContents },
                    level: LogLevel.Warning,
                });
            }
            resolve({
                ...extension,
                data,
            });
        }, reject);
});

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

export const ApplyExtensions = (web: any, onProgress: IProgressCallback) => new Promise<void>((resolve, reject) => {
    GetValidExtensions().then(extensions => {
        extensions.reduce((chain, extension) => chain.then(___ => {
            onProgress(__("ProvisionWeb_ApplyingExtensions"), extension.Title);
            return new WebProvisioner(web).applyTemplate(extension.data);
        }), Promise.resolve())
            .then(resolve)
            .catch(resolve);
    });
});
