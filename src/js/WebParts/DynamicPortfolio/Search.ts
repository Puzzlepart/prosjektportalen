import { sp } from "sp-pnp-js";

/**
 * Search Settings used for sp-pnp-js
 */
export const SearchSettings = {
    Querytext: "*",
    RowLimit: 500,
    TrimDuplicates: false,
    Properties: [{
        Name: "SourceName",
        Value: { StrVal: __("ResultSourceName_Projects"), QueryPropertyValueTypeIndex: 1 },
    },
    {
        Name: "SourceLevel",
        Value: { StrVal: __("ResultSourceLevel_Projects"), QueryPropertyValueTypeIndex: 1 },
    }],
};

/**
 * Query the REST Search API using sp-pnp-js
 *
 * @param selectProperties Select properties
 * @param refiners Refiners
 */
export const query = (selectProperties: string[], refiners: string) => new Promise<{ primarySearchResults: any[], refiners: any[] }>((resolve, reject) => {
    sp.search({
        ...SearchSettings,
        SelectProperties: selectProperties,
        Refiners: refiners,
    }).then(({ PrimarySearchResults, RawSearchResults: { PrimaryQueryResult } }) => {
        resolve({
            primarySearchResults: PrimarySearchResults,
            refiners: PrimaryQueryResult.RefinementResults ? PrimaryQueryResult.RefinementResults.Refiners.results : [],
        });
    }).catch(reject);
});
