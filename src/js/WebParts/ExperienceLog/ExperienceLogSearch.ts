import pnp from "sp-pnp-js";
import ISearchResultSource from "../ISearchResultSource";
import LogElement from "./LogElement";

/**
 * Query the REST Search API using sp-pnp-js
 *
 * @param {ISearchResultSource} resultSource Result source
 * @param {string[]} SelectProperties Select properties
 */
export async function queryLogElements(resultSource: ISearchResultSource, SelectProperties: string[]): Promise<LogElement[]> {
    SelectProperties = SelectProperties.concat(["Path", "SPWebUrl"]);
    try {
        const response = await pnp.sp.search({
            Querytext: "*",
            RowLimit: 500,
            TrimDuplicates: false,
            Properties: [{
                Name: "SourceName",
                Value: { StrVal: resultSource.Name, QueryPropertyValueTypeIndex: 1 },
            },
            {
                Name: "SourceLevel",
                Value: { StrVal: resultSource.Level, QueryPropertyValueTypeIndex: 1 },
            }],
            SelectProperties,
        });
        return response.PrimarySearchResults.map(r => new LogElement(r));
    } catch (err) {
        throw err;
    }
}
