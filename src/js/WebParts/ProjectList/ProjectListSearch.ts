import __ from "../../Resources";
import { sp, Site } from "@pnp/sp";

/**
 * Query the REST Search API using @pnp/sp. Find all project content types in the specified data source
 *
 * @param {string} dataSourceName Data source name
 * @param {number} rowLimit Row limit
 * @param {Array<string>} selectProperties Select properties
 */
export async function queryProjects(dataSourceName: string, rowLimit?: number, selectProperties = []): Promise<any[]> {
    try {
        const dataSourcesList = new Site(_spPageContextInfo.siteAbsoluteUrl).rootWeb.lists.getByTitle(__.getResource("Lists_DataSources_Title"));
        const [dataSource] = await dataSourcesList.items.filter(`Title eq '${dataSourceName}'`).get();
        if (dataSource) {
            const { PrimarySearchResults } = await sp.search({
                Querytext: "*",
                QueryTemplate: dataSource.GtDpSearchQuery,
                SelectProperties: ["Path", "SiteTitle", "RefinableString52", "RefinableString53", "RefinableString54", "GtProjectManagerOWSUSER", "GtProjectOwnerOWSUSER", "LastModifiedTime", ...selectProperties],
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

/**
 * Query the REST Search API using @pnp/sp. Find all webs in the specified data source
 *
 * @param {string} dataSourceName Data source name
 * @param {number} rowLimit Row limit
 */
export async function queryProjectWebs(dataSourceName: string, rowLimit?: number): Promise<any[]> {
    try {
        const dataSourcesList = new Site(_spPageContextInfo.siteAbsoluteUrl).rootWeb.lists.getByTitle(__.getResource("Lists_DataSources_Title"));
        const [dataSource] = await dataSourcesList.items.filter(`Title eq '${dataSourceName}'`).get();
        if (dataSource) {
            const dataSourceWithWebs = dataSource.GtDpSearchQuery.toString().toUpperCase().replace("CONTENTTYPEID:" + __.getResource("ContentTypes_Prosjektegenskaper_ContentTypeId").toUpperCase() + "*", "contentclass:STS_Web");
            const { PrimarySearchResults } = await sp.search({
                Querytext: "*",
                QueryTemplate: dataSourceWithWebs,
                SelectProperties: ["Title", "Path", "SiteLogo", "ViewsLifeTime"],
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
