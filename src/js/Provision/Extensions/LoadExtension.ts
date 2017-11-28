import { Site, Logger, LogLevel } from "sp-pnp-js";
import Extension from "./Extension";
import ProvisionError from "../ProvisionError";
import SpListLogger from "../../Util/SpListLogger";

const listLogger = new SpListLogger();

/**
 * Loads extension JSON
 *
 * @param {any} fileInfo The extension file
 */
async function LoadExtension(fileInfo): Promise<Extension> {
    const rootWeb = new Site(_spPageContextInfo.siteAbsoluteUrl).rootWeb;
    const fileObject = rootWeb.getFileByServerRelativeUrl(fileInfo.FileRef);
    const extension = new Extension(fileInfo.Title, fileInfo.Comments, fileInfo.Filename, fileInfo.FileRef, fileInfo.GtIsEnabled);
    try {
        const fileSchemaText = await fileObject.getText();
        try {
            const data = JSON.parse(fileSchemaText);
            extension.IsValid = true;
            extension.Schema = data;
        } catch (e) {
            extension.IsValid = false;
            listLogger.log({ Message: `Extension ${extension.Filename} is invalid.`, Source: "LoadExtension", LogLevel: LogLevel.Warning });
            Logger.log({
                message: `Extensions in file '${extension.Filename}' contains invalid JSON.`,
                data: { fileSchemaText },
                level: LogLevel.Warning,
            });
        }
        return extension;
    } catch (err) {
        throw new ProvisionError(err, "LoadExtension");
    }
}

export default LoadExtension;
