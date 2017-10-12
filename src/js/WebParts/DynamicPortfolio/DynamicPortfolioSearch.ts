import { sp } from "sp-pnp-js";
import {
    IDynamicPortfolioConfiguration,
    IDynamicPortfolioViewConfig,
} from "./DynamicPortfolioConfiguration";

/**
 * Default Search Settings used for sp-pnp-js
 */
export const DEFAULT_SEARCH_SETTINGS = {
    Querytext: "*",
    RowLimit: 500,
    TrimDuplicates: false,
};

export interface IQueryResponse {
    primarySearchResults: any[];
    refiners: any[];
}

/**
 * Query the REST Search API using sp-pnp-js
 *
 * @param {IDynamicPortfolioViewConfig} viewConfig View configuration
 * @param {IDynamicPortfolioConfiguration} configuration DynamicPortfolioConfiguration
 */
export async function queryProjects(viewConfig: IDynamicPortfolioViewConfig, configuration: IDynamicPortfolioConfiguration): Promise<IQueryResponse> {
    try {
        const response: any = await sp.search({
            ...DEFAULT_SEARCH_SETTINGS,
            SelectProperties: configuration.columns.map(f => f.fieldName),
            Refiners: configuration.refiners.map(ref => ref.key).join(","),
            QueryTemplate: viewConfig.queryTemplate,
        });
        let primarySearchResults = response.RawSearchResults.PrimaryQueryResult.RelevantResults.Table.Rows.results
            .map(({ Cells }) => {
                let item: any = {};
                Cells.results.forEach(({ Key, Value }) => {
                    item[Key] = Value ? Value : "";
                    /**
                     * Using parseInt if we have a Currency or Number field
                     */
                    if (item[Key] !== "" && (Key.indexOf("OWSNMBR") !== -1 || Key.indexOf("OWSCURR") !== -1)) {
                        item[Key] = parseInt(item[Key], 10);
                    }
                });
                return item;
            });
        let refiners = response.RawSearchResults.PrimaryQueryResult.RefinementResults ? response.RawSearchResults.PrimaryQueryResult.RefinementResults.Refiners.results : [];
        return ({
            primarySearchResults,
            refiners,
        });
    } catch (err) {
        throw err;
    }
}
