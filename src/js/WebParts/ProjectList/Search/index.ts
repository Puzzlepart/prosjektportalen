import { sp } from "sp-pnp-js";

/**
 * Default Search Settings used for sp-pnp-js
 */
export const DEFAULT_SEARCH_SETTINGS = {
    Querytext: "*",
    QueryTemplate: "ContentTypeId:0x010109010058561f86d956412b9dd7957bbcd67aae0100* Path:{Site.URL} contentclass:STS_Web *",
    RowLimit: 500,
    TrimDuplicates: false,
};

export interface IQueryResponse {
    primarySearchResults: any[];
}

/**
 * Query the REST Search API using sp-pnp-js
 */
export const query = () => new Promise<IQueryResponse>((resolve, reject) => {
    sp.search({
        ...DEFAULT_SEARCH_SETTINGS,
    }).then(({ RawSearchResults: { PrimaryQueryResult } }) => {
        resolve({
            primarySearchResults: PrimaryQueryResult.RelevantResults.Table.Rows.results.map(({ Cells }) => {
                let item: any = {};
                Cells.results.forEach(({ Key, Value }) => {
                    item[Key] = Value ? Value : "";
                });
                return item;
            }),
        });
    }).catch(reject);
});
