import { sp, Logger, LogLevel } from "sp-pnp-js";
import IExtension from "./IExtension";

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

export default LoadExtension;
