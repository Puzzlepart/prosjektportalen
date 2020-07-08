import __ from '../Resources'
import { Site } from '@pnp/sp'

export default new class DataSourceService {
    /**
     * Get source by name
     *
     * @param {string} name Name
     * @param {string} url Url
     */
    public async getSourceByName(name: string, url = _spPageContextInfo.siteAbsoluteUrl): Promise<string> {
        const list = new Site(url).rootWeb.lists.getByTitle(__.getResource('Lists_DataSources_Title'))
        const [dataSource] = await list.items.filter(`Title eq '${name}'`).get<{ GtDpSearchQuery: string }[]>()
        if (dataSource) {
            return dataSource.GtDpSearchQuery
        } else {
            return null
        }
    }
}
