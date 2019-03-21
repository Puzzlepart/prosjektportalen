import StatsFieldConfiguration from "../StatsFieldConfiguration";
import ProjectStatsChartDataItem from "./ProjectStatsChartDataItem";
export default class ProjectStatsChartData {
    private _items;
    /**
     * Constructor
     *
     * @param {Array<ProjectStatsChartDataItem>} items ITems
     */
    constructor(items: Array<ProjectStatsChartDataItem>);
    /**
     * Get items
     */
    getItems(): Array<ProjectStatsChartDataItem>;
    /**
     * Get items with non zero value
    *
    * @param {StatsFieldConfiguration} field Field
     */
    getItemsWithNonZeroValue(field: StatsFieldConfiguration): Array<ProjectStatsChartDataItem>;
    /**
    * Get items with the specified string value
    *
    * @param {StatsFieldConfiguration} field Field
    * @param {string} value Value
    */
    getItemsWithStringValue(field: StatsFieldConfiguration, value: string): Array<ProjectStatsChartDataItem>;
    /**
     * Get item at index
     *
     * @param {number} index Index
     */
    getItem(index: number): ProjectStatsChartDataItem;
    /**
     * Get count
     */
    getCount(): number;
    /**
    * Get average
    *
    * @param {StatsFieldConfiguration} field Field
    */
    getAverage(field: StatsFieldConfiguration): number;
    /**
    * Get values
    *
    * @param {StatsFieldConfiguration} field Field
    */
    getValues(field: StatsFieldConfiguration): any[];
    /**
    * Get values unique
    *
    * @param {StatsFieldConfiguration} field Field
    */
    getValuesUnique(field: StatsFieldConfiguration): Array<string>;
    /**
     * Get names
     */
    getNames(): string[];
    /**
     * Get total
     *
     * @param {StatsFieldConfiguration} field Field
     */
    getTotal(field: StatsFieldConfiguration): any;
    /**
     * Get percentage
     *
     * @param {StatsFieldConfiguration} field Field
     * @param {number} index Index
     */
    getPercentage(field: StatsFieldConfiguration, index: number): number;
}
