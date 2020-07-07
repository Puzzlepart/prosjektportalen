import __ from '../../Resources'
import { Site } from '@pnp/sp'
import DoesWebExist from './DoesWebExist'
import SetSharedNavigation from './SetSharedNavigation'
import IProvisionContext from '../IProvisionContext'
import ProvisionError from '../ProvisionError'

/**
 * Get redirect URL. Appends permsetup.aspx if the web has unique permissions
 *
 * @param {string} url Url
 * @param {boolean} inheritPermissions Inherit permissions
 */
const GetRedirectUrl = (url: string, inheritPermissions: boolean): string => {
    return inheritPermissions ? url : String.format('{0}/_layouts/15/permsetup.aspx?next={1}', url, encodeURIComponent(url))
}

/**
 * Creates a new subsite
 *
 * @param {IProvisionContext} context Provisioning context
 */
async function CreateWeb(context: IProvisionContext): Promise<IProvisionContext> {
    context.progressCallbackFunc(__.getResource('ProvisionWeb_CreatingWeb'), '')
    const rootWeb = new Site(_spPageContextInfo.siteAbsoluteUrl).rootWeb
    try {
        const createWebResult = await rootWeb.webs.add(context.model.title, context.model.url.toLowerCase(), context.model.description, 'STS#0', _spPageContextInfo.webLanguage, context.model.inheritPermissions)
        await SetSharedNavigation(createWebResult.data.Url)
        return {
            ...context,
            web: createWebResult.web,
            url: createWebResult.data.Url,
            redirectUrl: GetRedirectUrl(createWebResult.data.Url, context.model.inheritPermissions),
        }
    } catch (err) {
        throw new ProvisionError(err, 'CreateWeb')
    }
}

export {
    DoesWebExist,
    SetSharedNavigation,
    CreateWeb,
}
