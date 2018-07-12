import pnp from "sp-pnp-js";
import ProjectResource from "./ProjectResource";

/**
 * Query the REST Search API using sp-pnp-js
 *
 * @param {string} dataSourceName Data source name
 * @param {string[]} selectProperties Select properties
 */
export async function queryProjectResources(dataSourceName: string, selectProperties: string[]): Promise<Array<ProjectResource>> {
    try {
        const { PrimarySearchResults } = await pnp.sp.search({
            Querytext: "*",
            QueryTemplate: "ContentTypeId:0x010088578E7470CC4AA68D5663464831070209* Path:{SiteCollection.URL}",
            RowLimit: 500,
            TrimDuplicates: false,
            SelectProperties: ["Path", "SPWebUrl", ...selectProperties],
        });
        return PrimarySearchResults.map(r => new ProjectResource(r));
    } catch (err) {
        throw err;
    }
}
