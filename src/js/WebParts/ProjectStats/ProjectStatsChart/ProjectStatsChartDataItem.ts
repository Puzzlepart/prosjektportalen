import StatsFieldConfiguration from "../StatsFieldConfiguration";

export default class ProjectStatsChartDataItem {
    public data: { [key: string]: any };
    public name: string;

    constructor(name: string, data: { [key: string]: any }) {
        this.name = name;
        this.data = data;
    }

    public getValue(field: StatsFieldConfiguration) {
        const rawValue = this.data[field.managedPropertyName];
        switch (field.dataType) {
            case "percentage": {
                return Math.floor((parseFloat(rawValue) * 100));
            }
            case "number": {
                return parseInt(rawValue, 10);
            }
            default: {
                return rawValue;
            }
        }
    }

    public isValid(): boolean {
        return false;
    }
}
