import { sp } from "sp-pnp-js";

/**
 * Default Search Settings used for sp-pnp-js
 */
export const DEFAULT_SEARCH_SETTINGS = {
    Querytext: "*",
    QueryTemplate: "ContentTypeId:0x010088578e7470cc4aa68d5663464831070206* Path:{SiteCollection.URL} GtProjectLogExperienceOWSBOOL=1",
    RowLimit: 500,
    TrimDuplicates: false,
};

export interface IQueryResponse {
    primarySearchResults: any[];
}

/**
 * Query the REST Search API using sp-pnp-js
 */
export const query = (SelectProperties: string[]) => new Promise<IQueryResponse>((resolve, reject) => {
    sp.search({
        ...DEFAULT_SEARCH_SETTINGS,
        SelectProperties,
    })
        .then((response: any) => {
            resolve({
                primarySearchResults: response.RawSearchResults.PrimaryQueryResult.RelevantResults.Table.Rows.results.map(({ Cells }) => {
                    let item: any = {};
                    Cells.results.forEach(({ Key, Value }) => {
                        if (Array.contains(SelectProperties, Key)) {
                            item[Key] = Value ? Value : "";
                        }
                    });
                    return item;
                }),
            });
        })
        .catch(reject);
});
