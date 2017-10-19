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
 * Parse search response
 *
 * @param {any} response Response object
 */
function parseSearchResponse(response: any, selectProperties: string[]): IQueryResult[] {
    return response.RawSearchResults.PrimaryQueryResult.RelevantResults.Table.Rows.results.map(({ Cells }) => {
        let item: any = {};
        Cells.results.forEach(({ Key, Value }) => {
            if (Array.contains(selectProperties, Key)) {
                item[Key] = Value ? Value : "";
            }
        });
        return item;
    });
}

/**
 * Query the REST Search API using sp-pnp-js
 *
 * @param {number} rowLimit Row limit
 */
export async function queryProjects(rowLimit?: number, selectProperties = ["Title", "Path", "SiteLogo", "RefinableString52", "RefinableString53", "RefinableString54", "GtProjectManagerOWSUSER", "GtProjectOwnerOWSUSER", "ViewsLifeTime"]): Promise<IQueryResult[]> {
    try {
        const response: any = await sp.search({
            Querytext: "*",
            RowLimit: rowLimit,
            TrimDuplicates: false,
            SelectProperties: selectProperties,
            Properties: [{
                Name: "SourceName",
                Value: { StrVal: RESOURCE_MANAGER.getResource("ResultSourceName_Projects"), QueryPropertyValueTypeIndex: 1 },
            },
            {
                Name: "SourceLevel",
                Value: { StrVal: RESOURCE_MANAGER.getResource("ResultSourceLevel_Projects"), QueryPropertyValueTypeIndex: 1 },
            }],
        });
        return parseSearchResponse(response, selectProperties);
    } catch (err) {
        throw err;
    }
}
