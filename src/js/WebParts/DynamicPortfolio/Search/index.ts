import { sp } from "sp-pnp-js";
import {
    IConfiguration,
    IViewConfig,
} from "../Configuration";

/**
 * Default Search Settings used for sp-pnp-js
 */
export const DEFAULT_SEARCH_SETTINGS = {
    Querytext: "*",
    RowLimit: 500,
    TrimDuplicates: false,
};

export interface IQueryResponse {
    primarySearchResults: any[];
    refiners: any[];
}

/**
 * Query the REST Search API using sp-pnp-js
 *
 * @param viewConfig View configuration
 * @param configuration Configuration
 */
export const query = (viewConfig: IViewConfig, configuration: IConfiguration) => new Promise<IQueryResponse>((resolve, reject) => {
    sp.search({
        ...DEFAULT_SEARCH_SETTINGS,
        SelectProperties: configuration.columns.map(f => f.fieldName),
        Refiners: configuration.refiners.map(ref => ref.key).join(","),
        QueryTemplate: viewConfig.queryTemplate,
    })
        .then((response: any) => {
            resolve({
                primarySearchResults: response.RawSearchResults.PrimaryQueryResult.RelevantResults.Table.Rows.results.map(({ Cells }) => {
                    let item: any = {};
                    Cells.results.forEach(({ Key, Value }) => {
                        item[Key] = Value ? Value : "";
                    });
                    return item;
                }),
                refiners: response.RawSearchResults.PrimaryQueryResult.RefinementResults ? response.RawSearchResults.PrimaryQueryResult.RefinementResults.Refiners.results : [],
            });
        })
        .catch(reject);
});
