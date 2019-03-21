/// <reference types="react" />
import { IDynamicPortfolioColumnConfig, IDynamicPortfolioConfiguration } from "../DynamicPortfolioConfiguration";
/**
 * Render item column
 *
 * @param {any} item The item
 * @param {number} index Index
 * @param {IDynamicPortfolioColumnConfig} column Column
 * @param {IDynamicPortfolioConfiguration} configuration Configuration
 * @param {Function} titleOnClick Title column on click
 */
declare const DynamicPortfolioItemColumn: (item: any, index: number, column: IDynamicPortfolioColumnConfig, configuration: IDynamicPortfolioConfiguration, titleOnClick: (evt: any) => void) => JSX.Element;
export default DynamicPortfolioItemColumn;
