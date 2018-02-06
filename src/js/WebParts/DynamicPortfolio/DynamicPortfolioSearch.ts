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
        const response = await sp.search({
            ...DEFAULT_SEARCH_SETTINGS,
            SelectProperties: configuration.columns.map(f => f.fieldName),
            Refiners: configuration.refiners.map(ref => ref.key).join(","),
            QueryTemplate: viewConfig.queryTemplate,
        });
        const primaryQueryResult = response.RawSearchResults.PrimaryQueryResult;
        const relevantResults = primaryQueryResult.RelevantResults;
        const resultRows = relevantResults.Table.Rows;
        const refinementResults = primaryQueryResult.RefinementResults;
        let primarySearchResults = (resultRows["results"] ? resultRows["results"] : resultRows).map(row => {
            let item: any = {};
            let cells: Array<{ Key: string, Value: string, ValueType: string }> = row.Cells["results"] ? row.Cells["results"] : row.Cells;
            return cells.reduce((obj, { Key, Value }) => {
                obj[Key] = Value;
                if (obj[Key] !== "" && (Key.indexOf("OWSNMBR") !== -1 || Key.indexOf("OWSCURR") !== -1)) {
                    obj[Key] = parseInt(item[Key], 10);
                }
                return obj;
            }, {});
        });
        let refiners = [];
        if (refinementResults) {
            refiners = refinementResults.Refiners["results"] ? refinementResults.Refiners["results"] : refinementResults.Refiners;
        }
        return ({ primarySearchResults, refiners });
    } catch (err) {
        throw err;
    }
}
