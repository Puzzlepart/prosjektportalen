import RESOURCE_MANAGER from "localization";
import { sp } from "sp-pnp-js";

/**
 * Default Search Settings used for sp-pnp-js
 */
export const DEFAULT_SEARCH_SETTINGS = {
    Querytext: "*",
    RowLimit: 500,
    TrimDuplicates: false,
    SelectProperties: ["Title", "Path", "SiteLogo", "RefinableString52", "RefinableString53", "RefinableString54", "GtProjectManagerOWSUSER", "GtProjectOwnerOWSUSER", "ViewsLifeTime"],
    Properties: [{
        Name: "SourceName",
        Value: { StrVal: RESOURCE_MANAGER.getResource("ResultSourceName_Projects"), QueryPropertyValueTypeIndex: 1 },
    },
    {
        Name: "SourceLevel",
        Value: { StrVal: RESOURCE_MANAGER.getResource("ResultSourceLevel_Projects"), QueryPropertyValueTypeIndex: 1 },
    }],
};

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

export interface IQueryResponse {
    primarySearchResults: IQueryResult[];
}

/**
 * Query the REST Search API using sp-pnp-js
 */
export const queryProjects = () => new Promise<IQueryResponse>((resolve, reject) => {
    sp.search({
        ...DEFAULT_SEARCH_SETTINGS,
    })
        .then((response: any) => {
            resolve({
                primarySearchResults: response.RawSearchResults.PrimaryQueryResult.RelevantResults.Table.Rows.results.map(({ Cells }) => {
                    let item: any = {};
                    Cells.results.forEach(({ Key, Value }) => {
                        if (Array.contains(DEFAULT_SEARCH_SETTINGS.SelectProperties, Key)) {
                            item[Key] = Value ? Value : "";
                        }
                    });
                    return item;
                }),
            });
        })
        .catch(reject);
});
