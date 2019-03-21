import { Web } from "@pnp/sp";
import IDynamicPortfolioConfiguration, { IDynamicPortfolioViewConfig, IDynamicPortfolioColumnConfig, IDynamicPortfolioRefinerConfig, IStatusFieldsConfig } from "./IDynamicPortfolioConfiguration";
/**
 * Get fields config from list
 *
 * @param {string} orderBy Order by property
 * @param {Web} configWeb Config web
 */
export declare function getFieldsConfig(orderBy: string, configWeb: Web): Promise<any[]>;
/**
 * Get refiner config from list
 *
 * @param {string} orderBy Order by property
 * @param {Web} configWeb Config web
 */
export declare function getRefinersConfig(orderBy: string, configWeb: Web): Promise<any[]>;
/**
 * Get view config from list
 *
 * @param {string} orderBy Order by property
 * @param {Web} configWeb Config web
 */
export declare function getViewsConfig(orderBy: string, configWeb: Web): Promise<any[]>;
/**
 * Get config from lists
 *
 * @param {string} orderBy Order by property
 * @param {string} configWebUrl URL for config lists
 */
export declare function getConfig(orderBy?: string, configWebUrl?: string): Promise<IDynamicPortfolioConfiguration>;
export { IDynamicPortfolioConfiguration, IDynamicPortfolioViewConfig, IDynamicPortfolioColumnConfig, IDynamicPortfolioRefinerConfig, IStatusFieldsConfig, };
