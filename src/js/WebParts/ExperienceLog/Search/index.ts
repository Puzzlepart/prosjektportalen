import Localization from "localization";
import { sp } from "sp-pnp-js";

/**
 * Default Search Settings used for sp-pnp-js
 */
export const DEFAULT_SEARCH_SETTINGS = {
    Querytext: "*",
    RowLimit: 500,
    TrimDuplicates: false,
    Properties: [{
        Name: "SourceName",
        Value: { StrVal: Localization.getResource("ResultSourceName_ExperienceLog"), QueryPropertyValueTypeIndex: 1 },
    },
    {
        Name: "SourceLevel",
        Value: { StrVal: Localization.getResource("ResultSourceLevel_ExperienceLog"), QueryPropertyValueTypeIndex: 1 },
    }],
};

export interface IQueryResult {
    Path: string;
    Title: string;
    SiteTitle: string;
    SPWebUrl: string;
    GtProjectLogDescriptionOWSMTXT: string;
    GtProjectLogResponsibleOWSCHCS: string;
    GtProjectLogConsequenceOWSMTXT: string;
    GtProjectLogRecommendationOWSMTXT: string;
    GtProjectLogActorsOWSCHCM: string;
}

export interface IQueryResponse {
    primarySearchResults: IQueryResult[];
}

/**
 * Query the REST Search API using sp-pnp-js
 */
export const query = (SelectProperties: string[]) => new Promise<IQueryResponse>((resolve, reject) => {
    SelectProperties = SelectProperties.concat(["Path", "SPWebUrl"]);
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
