import {
    Site,
    Logger,
    LogLevel,
} from "sp-pnp-js";
import IExtension from "./IExtension";
import ProvisionError from "../ProvisionError";
import SpListLogger from "../../Util/SpListLogger";

const listLogger = new SpListLogger();

/**
 * Loads extension JSON
 *
 * @param {IExtension} file The extension file
 */
async function LoadExtension(extension: IExtension): Promise<IExtension> {
    const rootWeb = new Site(_spPageContextInfo.siteAbsoluteUrl).rootWeb;
    const file = rootWeb.getFileByServerRelativeUrl(extension.FileRef);
    try {
        const fileText = await file.getText();
        try {
            const data = JSON.parse(fileText);
            extension.isValid = true;
            extension.data = data;
        } catch (e) {
            extension.isValid = false;
            listLogger.log({ Message: `Extension ${extension.LinkFilename} is invalid.`, Source: "LoadExtension", LogLevel: LogLevel.Warning });
            Logger.log({
                message: `Extensions in file '${extension.LinkFilename}' contains invalid JSON.`,
                data: { fileText },
                level: LogLevel.Warning,
            });
        }
        return extension;
    } catch (err) {
        throw new ProvisionError(err, "LoadExtension");
    }
}

export default LoadExtension;
