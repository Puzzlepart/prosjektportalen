import StatsFieldConfiguration from "../StatsFieldConfiguration";
export default class ProjectStatsChartDataItem {
    data: {
        [key: string]: any;
    };
    name: string;
    constructor(name: string, data: {
        [key: string]: any;
    });
    /**
     * Has value
     *
     * @param {StatsFieldConfiguration} field Field
     */
    hasValue(field: StatsFieldConfiguration): boolean;
    /**
     * Get value
     *
     * @param {StatsFieldConfiguration} field Field
     */
    getValue(field: StatsFieldConfiguration): any;
}
