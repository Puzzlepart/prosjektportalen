import StatsFieldConfiguration from "../StatsFieldConfiguration";

export default class ProjectStatsChartDataItem {
    public data: { [key: string]: any };
    public name: string;

    constructor(name: string, data: { [key: string]: any }) {
        this.name = name;
        this.data = data;
    }

    /**
     * Has value
     *
     * @param {StatsFieldConfiguration} field Field
     */
    public hasValue(field: StatsFieldConfiguration): boolean {
        const rawValue = this.data[field.managedPropertyName];
        return rawValue != null;
    }

    /**
     * Get value
     *
     * @param {StatsFieldConfiguration} field Field
     */
    public getValue(field: StatsFieldConfiguration): any {
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
