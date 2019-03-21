"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const logging_1 = require("@pnp/logging");
const LOG_TEMPLATE = "(ProjectStatsChartData) {0}: {1}";
class ProjectStatsChartData {
    /**
     * Constructor
     *
     * @param {Array<ProjectStatsChartDataItem>} items ITems
     */
    constructor(items) {
        this._items = items;
    }
    /**
     * Get items
     */
    getItems() {
        return this._items;
    }
    /**
     * Get items with non zero value
    *
    * @param {StatsFieldConfiguration} field Field
     */
    getItemsWithNonZeroValue(field) {
        if (field.dataType === "string") {
            logging_1.Logger.log({
                message: String.format(LOG_TEMPLATE, "getItemsWithNonZeroValue", `Data type '${field.dataType}' not supported.`),
                level: 3 /* Error */,
            });
        }
        return this._items.filter(i => i.getValue(field) !== 0);
    }
    /**
    * Get items with the specified string value
    *
    * @param {StatsFieldConfiguration} field Field
    * @param {string} value Value
    */
    getItemsWithStringValue(field, value) {
        if (field.dataType !== "string") {
            logging_1.Logger.log({
                message: String.format(LOG_TEMPLATE, "getItemsWithStringValue", `Data type '${field.dataType}' not supported.`),
                level: 3 /* Error */,
            });
        }
        return this._items.filter(i => i.getValue(field) === value);
    }
    /**
     * Get item at index
     *
     * @param {number} index Index
     */
    getItem(index) {
        return this._items[index];
    }
    /**
     * Get count
     */
    getCount() {
        return this._items.length;
    }
    /**
    * Get average
    *
    * @param {StatsFieldConfiguration} field Field
    */
    getAverage(field) {
        return (this.getTotal(field) / this.getCount());
    }
    /**
    * Get values
    *
    * @param {StatsFieldConfiguration} field Field
    */
    getValues(field) {
        return this._items.map(i => i.getValue(field));
    }
    /**
    * Get values unique
    *
    * @param {StatsFieldConfiguration} field Field
    */
    getValuesUnique(field) {
        if (field.dataType !== "string") {
            logging_1.Logger.log({
                message: String.format(LOG_TEMPLATE, "getValuesUnique", `Data type '${field.dataType}' not supported.`),
                level: 3 /* Error */,
            });
        }
        return this.getValues(field).filter((value, index, self) => self.indexOf(value) === index);
    }
    /**
     * Get names
     */
    getNames() {
        return this._items.map(i => i.name);
    }
    /**
     * Get total
     *
     * @param {StatsFieldConfiguration} field Field
     */
    getTotal(field) {
        if (field.dataType !== "number") {
            logging_1.Logger.log({
                message: String.format(LOG_TEMPLATE, "getTotal", `Data type '${field.dataType}' not supported.`),
                level: 3 /* Error */,
            });
        }
        return this._items
            .filter(i => i.hasValue(field))
            .map(i => i.getValue(field))
            .reduce((prev, curr, index) => prev += curr, 0);
    }
    /**
     * Get percentage
     *
     * @param {StatsFieldConfiguration} field Field
     * @param {number} index Index
     */
    getPercentage(field, index) {
        if (field.dataType !== "number") {
            logging_1.Logger.log({
                message: String.format(LOG_TEMPLATE, "getPercentage", `Data type '${field.dataType}' not supported.`),
                level: 3 /* Error */,
            });
        }
        return ((this._items[index].getValue(field) / this.getTotal(field)) * 100);
    }
}
exports.default = ProjectStatsChartData;
