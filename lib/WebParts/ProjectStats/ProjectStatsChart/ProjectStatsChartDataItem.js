"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ProjectStatsChartDataItem {
    constructor(name, data) {
        this.name = name;
        this.data = data;
    }
    /**
     * Has value
     *
     * @param {StatsFieldConfiguration} field Field
     */
    hasValue(field) {
        const rawValue = this.data[field.managedPropertyName];
        return rawValue != null;
    }
    /**
     * Get value
     *
     * @param {StatsFieldConfiguration} field Field
     */
    getValue(field) {
        const rawValue = this.data[field.managedPropertyName];
        switch (field.dataType) {
            case "percentage": {
                if (this.hasValue(field)) {
                    return Math.floor((parseFloat(rawValue) * 100));
                }
                return 0;
            }
            case "number": {
                if (this.hasValue(field)) {
                    return parseInt(rawValue, 10);
                }
                return 0;
            }
            default: {
                return rawValue;
            }
        }
    }
}
exports.default = ProjectStatsChartDataItem;
