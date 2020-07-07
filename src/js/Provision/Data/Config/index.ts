import __ from '../../../Resources'
import { Site } from '@pnp/sp'
import ListConfig from './ListConfig'

/**
 * Retrieve list content configuration fron list
 */
export async function RetrieveListContentConfig(): Promise<ListConfig[]> {
    const list = new Site(_spPageContextInfo.siteAbsoluteUrl).rootWeb.lists.getByTitle(__.getResource('Lists_ListContentConfig_Title'))
    const configItems = await list.items.get()
    return configItems.map(item => new ListConfig(item))
}

export { ListConfig }

