import __ from '../../Resources'
import IProvisionContext from '../IProvisionContext'
import Extension from './Extension'
import LoadExtension from './LoadExtension'

/**
 * Get activated extensions
 *
 * @param {IProvisionContext} context Provisioning context
 */
export default async function GetActivatedExtensions(context: IProvisionContext): Promise<Extension[]> {
    const extensionLib = context.rootWeb.lists.getByTitle(__.getResource('Lists_Extensions_Title'))
    try {
        const files = await extensionLib.items.select('Id', 'Title', 'Comments', 'LinkFilename', 'FileRef', 'GtIsEnabled').filter('GtIsEnabled eq 1 and GtShowInNewForm ne 1').orderBy('GtOrder').get()
        const extensions: Extension[] = await Promise.all(files.map(file => LoadExtension(file)))
        if (extensions && extensions.length) {
            const validExtensions = extensions.filter(ext => ext.IsValid)
            return validExtensions
        }
        return []
    } catch (err) {
        return []
    }
}
