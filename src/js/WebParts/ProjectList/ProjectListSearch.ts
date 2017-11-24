import RESOURCE_MANAGER from "../../@localization";
import { sp } from "sp-pnp-js";

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
 * @param {number} rowLimit Row limit
 * @param {Array<string>} selectProperties Select properties
 */
export async function queryProjects(rowLimit?: number, selectProperties = []): Promise<any[]> {
    try {
        const { PrimarySearchResults } = await sp.search({
            Querytext: "*",
            RowLimit: rowLimit,
            TrimDuplicates: false,
            SelectProperties: ["Title", "Path", "SiteLogo", "RefinableString52", "RefinableString53", "RefinableString54", "GtProjectManagerOWSUSER", "GtProjectOwnerOWSUSER", "ViewsLifeTime", ...selectProperties],
            Properties: [{
                Name: "SourceName",
                Value: { StrVal: RESOURCE_MANAGER.getResource("ResultSourceName_Projects"), QueryPropertyValueTypeIndex: 1 },
            },
            {
                Name: "SourceLevel",
                Value: { StrVal: RESOURCE_MANAGER.getResource("ResultSourceLevel_Projects"), QueryPropertyValueTypeIndex: 1 },
            }],
        });
        return PrimarySearchResults;
    } catch (err) {
        throw err;
    }
}
