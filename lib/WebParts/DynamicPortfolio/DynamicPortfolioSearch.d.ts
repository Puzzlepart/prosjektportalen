import { SearchResult } from "@pnp/sp";
import { IDynamicPortfolioConfiguration, IDynamicPortfolioViewConfig } from "./DynamicPortfolioConfiguration";
/**
 * Default Search Settings used for @pnp/sp
 */
export declare const DEFAULT_SEARCH_SETTINGS: {
    Querytext: string;
    RowLimit: number;
    TrimDuplicates: boolean;
};
export interface IProjectsQueryResponse {
    primarySearchResults: SearchResult[];
    refiners: any[];
}
/**
 * Query the REST Search API using @pnp/sp
 *
 * @param {IDynamicPortfolioViewConfig} viewConfig View configuration
 * @param {IDynamicPortfolioConfiguration} configuration DynamicPortfolioConfiguration
 */
export declare function queryProjects(viewConfig: IDynamicPortfolioViewConfig, configuration: IDynamicPortfolioConfiguration): Promise<IProjectsQueryResponse>;
