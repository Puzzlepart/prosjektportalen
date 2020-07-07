import { Site } from '@pnp/sp'
import { CreateWeb, DoesWebExist } from './Subsite'
import { ProjectModel } from '../Model/ProjectModel'
import { CopyDefaultData } from './Data'
import { ApplyTemplate, GetTemplate } from './Template'
import { ApplyExtensions } from './Extensions'
import { GetAllProperties } from '../Util/PropertyBag'
import SpListLogger, { LogLevel } from '../Util/SpListLogger'
import IProgressCallback from './IProgressCallback'
import IProvisionContext from './IProvisionContext'
import ITemplateFile from './Template/ITemplateFile'
import { GetSettings } from '../Settings'

/**
 * Provisions a project web
 *
 * @param {ProjectModel} model The project model
 * @param {IProgressCallback} progressCallbackFunc Progress callback function
 * @param {ITemplateFile} templateFile Template file
 *
 * @returns {string} Redirect URL
 */
export default async function ProvisionWeb(model: ProjectModel, progressCallbackFunc: IProgressCallback, templateFile: ITemplateFile): Promise<string> {
    try {
        const settings = await GetSettings()
        const rootWeb = new Site(_spPageContextInfo.siteAbsoluteUrl).rootWeb
        let context: IProvisionContext = { model, progressCallbackFunc, rootWeb, template: templateFile }
        context = await CreateWeb(context)
        context.webProperties = await GetAllProperties()
        context.template = await GetTemplate(context)
        await ApplyTemplate(context)
        await ApplyExtensions(context)
        await CopyDefaultData(context)
        if (settings.ADD_EVERYONE_VISITORS === 'On') {
            try {
                await context.web.createDefaultAssociatedGroups()
                const { data } = await context.web.ensureUser(`c:0-.f|rolemanager|spo-grid-all-users/${_spPageContextInfo.siteSubscriptionId}`)
                await context.web.associatedVisitorGroup.users.add(data.LoginName)
            } catch (error) { }
        }
        return context.redirectUrl
    } catch (err) {
        await new SpListLogger().log({
            ...err,
            url: model.url,
            level: LogLevel.Error,
        })
        throw err
    }
}

export { DoesWebExist, IProvisionContext }
