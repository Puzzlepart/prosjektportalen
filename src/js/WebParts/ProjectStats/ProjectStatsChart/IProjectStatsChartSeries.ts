export default interface IProjectStatsChartSeries {
    name: string;
    static?: boolean;
    prop?: string;
    data?: any[];
    colorByPoint?: boolean;
    percentage?: boolean;
}