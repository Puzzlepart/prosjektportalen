import { sp } from "sp-pnp-js";
import {
    IDynamicPortfolioConfiguration,
    IDynamicPortfolioViewConfig,
} from "./DynamicPortfolioConfiguration";

/**
 * Default Search Settings used for sp-pnp-js
 */
export const DEFAULT_SEARCH_SETTINGS = { Querytext: "*", RowLimit: 500, TrimDuplicates: false };

export interface IProjectsQueryResponse {
    primarySearchResults: any[];
    refiners: any[];
}

/**
 * Query the REST Search API using sp-pnp-js
 *
 * @param {IDynamicPortfolioViewConfig} viewConfig View configuration
 * @param {IDynamicPortfolioConfiguration} configuration DynamicPortfolioConfiguration
 */
export async function queryProjects(viewConfig: IDynamicPortfolioViewConfig, configuration: IDynamicPortfolioConfiguration): Promise<IProjectsQueryResponse> {
    try {
        const searchResults = await sp.search({
            ...DEFAULT_SEARCH_SETTINGS,
            SelectProperties: configuration.columns.map(f => f.fieldName),
            Refiners: configuration.refiners.map(ref => ref.key).join(","),
            QueryTemplate: viewConfig.queryTemplate,
        });
        const refinementResults = searchResults.RawSearchResults.PrimaryQueryResult.RefinementResults;
        let refiners = [];
        if (refinementResults) {
            refiners = refinementResults.Refiners;
            if (refiners["results"]) {
                refiners = refiners["results"];
            }
        }
        return {
            primarySearchResults: searchResults.PrimarySearchResults,
            refiners,
        };
    } catch (err) {
        throw err;
    }
}
