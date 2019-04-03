import __ from "../Resources";
import { Site } from "@pnp/sp";

export default new class DataSourceService {
    public async getSourceByName(dataSourceName: string, url = _spPageContextInfo.siteAbsoluteUrl): Promise<string> {
        const list = new Site(url).rootWeb.lists.getByTitle(__.getResource("Lists_DataSources_Title"));
        const [dataSource] = await list.items.filter(`Title eq '${dataSourceName}'`).get<{ GtDpSearchQuery: string }[]>();
        if (dataSource) {
            return dataSource.GtDpSearchQuery;
        } else {
            return null;
        }
    }
};
