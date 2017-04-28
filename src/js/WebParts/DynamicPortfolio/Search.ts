import { sp } from "sp-pnp-js";
import { IQueryConfig } from "./Configuration";

/**
 * Default Search Settings used for sp-pnp-js
 */
export const DEFAULT_SEARCH_SETTINGS = {
    Querytext: "*",
    RowLimit: 500,
    TrimDuplicates: false,
};

/**
 * Query the REST Search API using sp-pnp-js
 *
 * @param queryConfig Query configuration
 * @param selectProperties Select properties
 * @param refiners Refiners
 */
export const query = (queryConfig: IQueryConfig, selectProperties: string[], refiners: string) => new Promise<{ primarySearchResults: any[], refiners: any[] }>((resolve, reject) => {
    sp.search({
        ...DEFAULT_SEARCH_SETTINGS,
        SelectProperties: selectProperties,
        Refiners: refiners,
        QueryTemplate: queryConfig.queryTemplate,
    }).then(({ PrimarySearchResults, RawSearchResults: { PrimaryQueryResult } }) => {
        resolve({
            primarySearchResults: PrimarySearchResults,
            refiners: PrimaryQueryResult.RefinementResults ? PrimaryQueryResult.RefinementResults.Refiners.results : [],
        });
    }).catch(reject);
});
