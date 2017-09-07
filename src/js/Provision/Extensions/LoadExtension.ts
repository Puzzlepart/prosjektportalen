import {
    Site,
    Logger,
    LogLevel,
} from "sp-pnp-js";
import IExtension from "./IExtension";

/**
 * Loads extension JSON
 *
 * @param {IExtension} file The extension file
 */
const LoadExtension = (extension: IExtension) => new Promise<IExtension>((resolve, reject) => {
    const rootWeb = new Site(_spPageContextInfo.siteAbsoluteUrl).rootWeb;
    const file = rootWeb.getFileByServerRelativeUrl(extension.FileRef);
    file.getText()
        .then(fileText => {
            let data = null;
            try {
                data = JSON.parse(fileText);
            } catch (e) {
                Logger.log({
                    message: `Extensions in file '${extension.LinkFilename}' contains invalid JSON.`,
                    data: { fileText },
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
