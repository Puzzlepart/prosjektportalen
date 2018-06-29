import RESOURCE_MANAGER from "../../Resources";
import pnp, { Site } from "sp-pnp-js";
import DeliveryElement from "./DeliveryElement";

/**
 * Query the REST Search API using sp-pnp-js
 *
 * @param {string} dataSourceName Data source name
 * @param {string[]} selectProperties Select properties
 */
export async function queryDeliveryElements(dataSourceName: string, selectProperties: string[]): Promise<DeliveryElement[]> {
    const dataSourcesList = new Site(_spPageContextInfo.siteAbsoluteUrl).rootWeb.lists.getByTitle(RESOURCE_MANAGER.getResource("Lists_DataSources_Title"));
    const [dataSource] = await dataSourcesList.items.filter(`Title eq '${dataSourceName}'`).get();
    if (dataSource) {
        try {
            const { PrimarySearchResults } = await pnp.sp.search({
                Querytext: "*",
                QueryTemplate: dataSource.GtDpSearchQuery,
                RowLimit: 500,
                TrimDuplicates: false,
                SelectProperties: ["Path", "SPWebUrl", ...selectProperties],
            });
            return PrimarySearchResults.map(r => new DeliveryElement(r));
        } catch (err) {
            throw err;
        }
    } else {
        return [];
    }
}
