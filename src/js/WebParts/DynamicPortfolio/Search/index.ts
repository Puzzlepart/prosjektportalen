import { sp } from "sp-pnp-js";
import { IViewConfig } from "../Configuration";

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
 * @param selectProperties Select properties
 * @param refiners Refiners
 */
export const query = (viewConfig: IViewConfig, selectProperties: string[], refiners: string) => new Promise<IQueryResponse>((resolve, reject) => {
    sp.search({
        ...DEFAULT_SEARCH_SETTINGS,
        SelectProperties: selectProperties,
        Refiners: refiners,
        QueryTemplate: viewConfig.queryTemplate,
    }).then(({ RawSearchResults: { PrimaryQueryResult } }) => {
        resolve({
            primarySearchResults: PrimaryQueryResult.RelevantResults.Table.Rows.results.map(({ Cells }) => {
                let item: any = {};
                Cells.results.forEach(({ Key, Value }) => {
                    item[Key] = Value ? Value : "";
                });
                return item;
            }),
            refiners: PrimaryQueryResult.RefinementResults ? PrimaryQueryResult.RefinementResults.Refiners.results : [],
        });
    }).catch(reject);
});
