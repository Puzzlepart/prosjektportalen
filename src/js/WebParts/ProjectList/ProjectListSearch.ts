import RESOURCE_MANAGER from "../../Resources";
import { sp, Site } from "sp-pnp-js";

export interface IQueryResult {
    Title: string;
    Path: string;
    SiteLogo: string;
    RefinableString52: string;
    RefinableString53: string;
    RefinableString54: string;
    GtProjectManagerOWSUSER: string;
    GtProjectOwnerOWSUSER: string;
    ViewsLifeTime: string;
}

/**
 * Query the REST Search API using sp-pnp-js
 *
 * @param {string} dataSourceName Data source name
 * @param {number} rowLimit Row limit
 * @param {Array<string>} selectProperties Select properties
 */
export async function queryProjects(dataSourceName: string, rowLimit?: number, selectProperties = []): Promise<any[]> {
    try {
        const dataSourcesList = new Site(_spPageContextInfo.siteAbsoluteUrl).rootWeb.lists.getByTitle(RESOURCE_MANAGER.getResource("Lists_DataSources_Title"));
        const [dataSource] = await dataSourcesList.items.filter(`Title eq '${dataSourceName}'`).get();
        if (dataSource) {
            const { PrimarySearchResults } = await sp.search({
                Querytext: "*",
                QueryTemplate: dataSource.GtDpSearchQuery,
                SelectProperties: ["Title", "Path", "SiteLogo", "RefinableString52", "RefinableString53", "RefinableString54", "GtProjectManagerOWSUSER", "GtProjectOwnerOWSUSER", "ViewsLifeTime", ...selectProperties],
                RowLimit: rowLimit,
                TrimDuplicates: false,
            });
            return PrimarySearchResults;
        } else {
            return [];
        }
    } catch (err) {
        throw err;
    }
}
