import { Site } from '@pnp/sp'
import { Logger, LogLevel, LogEntry } from '@pnp/logging'
import Extension from './Extension'
import ProvisionError from '../ProvisionError'
import SpListLogger from '../../Util/SpListLogger'

const spListLogger = new SpListLogger()

/**
 * Loads extension JSON
 *
 * @param {any} fileInfo The extension file
 */
async function LoadExtension(fileInfo: any): Promise<Extension> {
    const rootWeb = new Site(_spPageContextInfo.siteAbsoluteUrl).rootWeb
    const fileObject = rootWeb.getFileByServerRelativeUrl(fileInfo.FileRef)
    const extension = new Extension(fileInfo.Id, fileInfo.Title, fileInfo.Comments, fileInfo.Filename, fileInfo.FileRef, fileInfo.GtIsEnabled)
    try {
        const fileSchemaText = await fileObject.getText()
        try {
            const data = JSON.parse(fileSchemaText)
            extension.IsValid = true
            extension.Schema = data
        } catch (e) {
            extension.IsValid = false
            const logElement: LogEntry = {
                message: `(LoadExtension) Extensions in file '${extension.Filename}' contains invalid JSON.`,
                data: { fileSchemaText },
                level: LogLevel.Warning,
            }
            spListLogger.log({ ...logElement, source: 'LoadExtension' })
            Logger.log(logElement)
        }
        return extension
    } catch (err) {
        throw new ProvisionError(err, 'LoadExtension')
    }
}

export default LoadExtension
