import { SearchResult } from "@pnp/sp";
import { IDynamicPortfolioConfiguration, IDynamicPortfolioViewConfig } from "./DynamicPortfolioConfiguration";
import SearchService from "../../Services/SearchService";
import { getObjectValue } from "../../Helpers";

export interface IProjectsQueryResponse {
    primarySearchResults: SearchResult[];
    refiners: any[];
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
            SelectProperties: configuration.columns.map(f => f.fieldName).concat(["SiteTitle"]),
            Refiners: configuration.refiners.map(ref => ref.key).join(","),
            QueryTemplate: [queryText, viewConfig.queryTemplate].filter(q => q).join(" "),
            RowLimit: 500,
             TrimDuplicates: false,
        };
        const { items, RawSearchResults } = await SearchService.search<any[]>(query);
        let refiners = getObjectValue(RawSearchResults, "PrimaryQueryResult.RefinementResults.Refiners", []);
        if (refiners["results"]) {
            refiners = refiners["results"];
        }
        return {
            primarySearchResults: items.map(res => ({ ...res, Title: res["SiteTitle"], Path: res.Path.split("/Lists")[0] })),
            refiners,
        };
    } catch (err) {
        console.log(err);
        throw err;
    }
}
