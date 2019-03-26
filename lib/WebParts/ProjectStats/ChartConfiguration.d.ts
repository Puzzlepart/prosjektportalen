import { List } from "@pnp/sp";
import { ProjectStatsChartData } from "./ProjectStatsChart";
import StatsFieldConfiguration from "./StatsFieldConfiguration";
export default class ChartConfiguration {
    contentTypeId: string;
    id: number;
    order: number;
    title: string;
    subTitle: string;
    typeIndex: number;
    type: string;
    width: {
        [key: string]: number;
    };
    stacking: string;
    yAxisTitle: string;
    yAxisMin: number;
    yAxisMax: number;
    yAxisTickInterval: number;
    height: number;
    valueSuffix: string;
    showLegend: boolean;
    showAverage: boolean;
    showPercentage: boolean;
    showItemSelector: boolean;
    private _pnpList;
    private _statsFields;
    private _data;
    private _widthFields;
    private _supportedChartTypes;
    /**
     * Constructor
     *
     * @param {any} spItem SharePoint item
     * @param {List} pnpList PnP list
     * @param {any[]} contentTypes Content types
     */
    constructor(spItem: any, pnpList: List, contentTypes: any);
    /**
     * Get data
     */
    getData(): ProjectStatsChartData;
    /**
     * Get data
     */
    getStatsFields(): StatsFieldConfiguration[];
    /**
     * Initialize or update ChartConfiguration with data/fields
     *
     * @param {ProjectStatsChartData} data Data
     * @param {StatsFieldConfiguration[]} statsFields Stats fields
     */
    initOrUpdate(data: ProjectStatsChartData, statsFields?: StatsFieldConfiguration[]): ChartConfiguration;
    /**
     * Set width
     *
     * @param {string} breakpoint Breakpoint
     * @param {number} width Width
     */
    setWidth(breakpoint: string, width: number): Promise<ChartConfiguration>;
    /**
     * Generate Highcharts chart config
     */
    getConfig(): any;
    /**
     * Get edit form url
     */
    getEditFormUrl(listUrl: string): string;
    /**
     * Get Y axis
     */
    private _getYAxis;
    /**
     * Get X axis based on type
     */
    private _getXAxis;
    /**
     * Get legend
     */
    private _getLegend;
    /**
     * Get chart base (chart, title, subtitle, tooltip, credits)
     */
    private _getBase;
    /**
     * Get series
     */
    private _generateSeries;
    /**
     * Update item
     *
     * @param {any} updateValues Update values
     */
    private _updateItem;
    /**
     * Get chart type from content type id
     */
    private _setChartTypeFromContentType;
}
