import { LogLevel, Logger } from '@pnp/logging'
import StatsFieldConfiguration from '../StatsFieldConfiguration'
import ProjectStatsChartDataItem from './ProjectStatsChartDataItem'


const LOG_TEMPLATE = '(ProjectStatsChartData) {0}: {1}'

export default class ProjectStatsChartData {
    private _items: Array<ProjectStatsChartDataItem>;

    /**
     * Constructor
     *
     * @param {Array<ProjectStatsChartDataItem>} items ITems
     */
    constructor(items: Array<ProjectStatsChartDataItem>) {
        this._items = items
    }

    /**
     * Get items
     */
    public getItems(): Array<ProjectStatsChartDataItem> {
        return this._items
    }

    /**
     * Get items with non zero value
    *
    * @param {StatsFieldConfiguration} field Field
     */
    public getItemsWithNonZeroValue(field: StatsFieldConfiguration): Array<ProjectStatsChartDataItem> {
        if (field.dataType === 'string') {
            Logger.log({
                message: String.format(LOG_TEMPLATE, 'getItemsWithNonZeroValue', `Data type '${field.dataType}' not supported.`),
                level: LogLevel.Error,
            })
        }
        return this._items.filter(i => i.getValue(field) !== 0)
    }

    /**
    * Get items with the specified string value
    *
    * @param {StatsFieldConfiguration} field Field
    * @param {string} value Value
    */
    public getItemsWithStringValue(field: StatsFieldConfiguration, value: string): Array<ProjectStatsChartDataItem> {
        if (field.dataType !== 'string') {
            Logger.log({
                message: String.format(LOG_TEMPLATE, 'getItemsWithStringValue', `Data type '${field.dataType}' not supported.`),
                level: LogLevel.Error,
            })
        }
        return this._items.filter(i => i.getValue(field) === value)
    }

    /**
     * Get item at index
     *
     * @param {number} index Index
     */
    public getItem(index: number): ProjectStatsChartDataItem {
        return this._items[index]
    }

    /**
     * Get count
     */
    public getCount(): number {
        return this._items.length
    }

    /**
    * Get average
    *
    * @param {StatsFieldConfiguration} field Field
    */
    public getAverage(field: StatsFieldConfiguration) {
        return (this.getTotal(field) / this.getCount())
    }

    /**
    * Get values
    *
    * @param {StatsFieldConfiguration} field Field
    */
    public getValues(field: StatsFieldConfiguration) {
        return this._items.map(i => i.getValue(field))
    }

    /**
    * Get values unique
    *
    * @param {StatsFieldConfiguration} field Field
    */
    public getValuesUnique(field: StatsFieldConfiguration): Array<string> {
        if (field.dataType !== 'string') {
            Logger.log({
                message: String.format(LOG_TEMPLATE, 'getValuesUnique', `Data type '${field.dataType}' not supported.`),
                level: LogLevel.Error,
            })
        }
        return this.getValues(field).filter((value, index, self) => self.indexOf(value) === index)
    }

    /**
     * Get names
     */
    public getNames() {
        return this._items.map(i => i.name)
    }

    /**
     * Get total
     *
     * @param {StatsFieldConfiguration} field Field
     */
    public getTotal(field: StatsFieldConfiguration) {
        if (field.dataType !== 'number') {
            Logger.log({
                message: String.format(LOG_TEMPLATE, 'getTotal', `Data type '${field.dataType}' not supported.`),
                level: LogLevel.Error,
            })
        }
        return this._items
            .filter(i => i.hasValue(field))
            .map(i => i.getValue(field))
            .reduce((prev, curr) => prev += curr, 0)
    }

    /**
     * Get percentage
     *
     * @param {StatsFieldConfiguration} field Field
     * @param {number} index Index
     */
    public getPercentage(field: StatsFieldConfiguration, index: number) {
        if (field.dataType !== 'number') {
            Logger.log({
                message: String.format(LOG_TEMPLATE, 'getPercentage', `Data type '${field.dataType}' not supported.`),
                level: LogLevel.Error,
            })
        }
        return ((this._items[index].getValue(field) / this.getTotal(field)) * 100)
    }
}
