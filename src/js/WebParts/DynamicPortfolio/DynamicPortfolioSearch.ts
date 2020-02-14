import { TypedHash } from "@pnp/common";
import { getObjectValue } from "../../Helpers";
import SearchService from "../../Services/SearchService";
import { IDynamicPortfolioColumnConfig, IDynamicPortfolioConfiguration, IDynamicPortfolioViewConfig } from "./DynamicPortfolioConfiguration";

export interface IProjectsQueryResponse {
    primarySearchResults: TypedHash<any>[];
    refiners: any[];
}

/**
 * Transform result based on type
 *
 * @param {TypedHash<any>} res Result
 * @param {IDynamicPortfolioColumnConfig[]} columns Column configuration
 */
export function transformResult(res: TypedHash<any>, columns: IDynamicPortfolioColumnConfig[]) {
    let result = Object.keys(res).reduce((obj: TypedHash<any>, key: string) => {
        let value = res[key];
        let [col] = columns.filter(c => c.fieldName === key);
        if (col) {
            switch (col.render) {
                case "Date": {
                    obj[key] = new Date(value);
                }
                    break;
                default: {
                    obj[key] = value;
                }
            }
        } else {
            obj[key] = value;
        }
        return obj;
    }, { ...res });
    result.Title = res.Title === "DispForm.aspx" ? res.SiteTitle : res.Title;
    result.Path = res.Path.indexOf("/Lists/Properties/") > -1 ? res.Path.split("/Lists")[0] : res.Path;
    return result;
}

/**
 * Query the REST Search API using @pnp/sp
 *
 * @param {string} queryText Query text
 * @param {IDynamicPortfolioViewConfig} viewConfig View configuration
 * @param {IDynamicPortfolioConfiguration} configuration DynamicPortfolioConfiguration
 */
export async function queryProjects(queryText: string, viewConfig: IDynamicPortfolioViewConfig, configuration: IDynamicPortfolioConfiguration): Promise<IProjectsQueryResponse> {
    try {
        const query = {
            Querytext: "*",
            SelectProperties: ["SiteTitle", ...configuration.columns.map(f => f.fieldName)],
            Refiners: configuration.refiners.map(ref => ref.key).join(","),
            QueryTemplate: [queryText, viewConfig.queryTemplate].filter(q => q).join(" "),
            RowLimit: 500,
            TrimDuplicates: false,
        };
        const { items, RawSearchResults } = await SearchService.search<TypedHash<any>[]>(query);
        let refiners = getObjectValue(RawSearchResults, "PrimaryQueryResult.RefinementResults.Refiners.results", []);
        return {
            primarySearchResults: items.map(res => transformResult(res, configuration.columns)),
            refiners,
        };
    } catch (err) {
        throw err;
    }
}
