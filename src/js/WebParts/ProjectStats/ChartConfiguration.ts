import { List, LogLevel, Logger } from "sp-pnp-js";
import { ProjectStatsChartData } from "./ProjectStatsChart";
import StatsField from "./StatsField";
import * as strings from "./strings";

const LOG_TEMPLATE = "(ChartConfiguration) {0}: {1} ({2})";

export default class ChartConfiguration {
    public contentTypeId: string;
    public id: number;
    public order: number;
    public title: string;
    public subTitle: string;
    public typeIndex: number;
    public type: string;
    public width: { [key: string]: number };
    public stacking: string;
    public yAxisTitle: string;
    public yAxisMin: number;
    public yAxisMax: number;
    public yAxisTickInterval: number;
    public valueSuffix: string;
    public showLegend: boolean;
    public showAverage: boolean;
    public showItemSelector: boolean;
    public marginTop: number;
    private _pnpList: List;
    private _statsFields: StatsField[];
    private _data: ProjectStatsChartData;
    private _widthFields = {
        sm: "WidthSm",
        md: "WidthMd",
        lg: "WidthLg",
        xl: "WidthXl",
        xxl: "WidthXxl",
        xxxl: "WidthXxxl",
    };
    private _supportedChartTypes = ["bar", "column", "pie"];

    /**
     * Constructor
     *
     * @param {any} spItem SharePoint item
     * @param {string} fieldPrefix Field prefix
     * @param {string} baseContentTypeId Base content type id
     * @param {List} pnpList PnP list
     */
    constructor(spItem, fieldPrefix: string, baseContentTypeId: string, pnpList: List) {
        this._pnpList = pnpList;
        this.contentTypeId = spItem.ContentTypeId;
        this.id = spItem.ID;
        this.title = spItem.Title;
        this.order = spItem[`${fieldPrefix}Order`];
        this.subTitle = spItem[`${fieldPrefix}SubTitle`];
        this.width = Object.keys(this._widthFields).reduce((obj, key) => {
            obj[key] = spItem[`${fieldPrefix}${this._widthFields[key]}`];
            return obj;
        }, {});
        this.stacking = spItem[`${fieldPrefix}Stacking`];
        this.yAxisTitle = spItem[`${fieldPrefix}YAxisTitle`];
        this.yAxisMin = spItem[`${fieldPrefix}YMin`];
        this.yAxisMax = spItem[`${fieldPrefix}YMax`];
        this.yAxisTickInterval = spItem[`${fieldPrefix}YTickInterval`];
        this.valueSuffix = spItem[`${fieldPrefix}ValueSuffix`];
        this.showLegend = spItem[`${fieldPrefix}ShowLegend`];
        this.showAverage = spItem[`${fieldPrefix}ShowAverage`];
        this.showItemSelector = spItem[`${fieldPrefix}ShowItemSelector`];
        this.marginTop = spItem[`${fieldPrefix}MarginTop`];
        this._setChartTypeFromContentType(baseContentTypeId);
    }

    /**
     * Get data
     */
    public getData() {
        return this._data;
    }

    /**
     * Get data
     */
    public getStatsFields() {
        return this._statsFields;
    }

    /**
     * Set data/fields
     *
     * @param {ProjectStatsChartData} data Data
     * @param {StatsField[]} statsFields Stats fields
     */
    public set(data: ProjectStatsChartData, statsFields?: StatsField[]): ChartConfiguration {
        this._data = data;
        if (statsFields) {
            this._statsFields = statsFields;
        }
        return this;
    }

    /**
     * Set width
     *
     * @param {string} breakpoint Breakpoint
     * @param {number} width Width
     */
    public async setWidth(breakpoint: string, width: number): Promise<ChartConfiguration> {
        Logger.log({
            message: String.format(LOG_TEMPLATE, "setWidth", `Setting width to ${width} for ${breakpoint}.`, this.title),
            level: LogLevel.Info,
        });
        this.width[breakpoint] = width;
        const widthField = this._widthFields[breakpoint];
        let updateValues: any = {};
        updateValues[widthField] = width;
        await this._updateItem(updateValues);
        return this;
    }

    /**
     * Generate Highcharts chart config
     */
    public getConfig() {
        Logger.log({
            message: String.format(LOG_TEMPLATE, "getConfig", `Generating chart config`, this.title),
            level: LogLevel.Info,
        });

        let chartConfig = {
            ...this._getBase(),
            series: this._generateSeries(),
        };
        switch (this.type) {
            case "bar": {
                chartConfig.xAxis = this._getXAxis();
                chartConfig.yAxis = this._getYAxis();
                chartConfig.plotOptions = {
                    bar: {
                        dataLabels: { enabled: true },
                    },
                };
                chartConfig.legend = this._getLegend();
                break;
            }
            case "column": {
                chartConfig.xAxis = this._getXAxis();
                chartConfig.yAxis = this._getYAxis();
                chartConfig.plotOptions = { series: { stacking: this.stacking } };
                chartConfig.legend = this._getLegend();
                break;
            }
            case "pie": {
                chartConfig.plotOptions = {
                    pie: {
                        allowPointSelect: true,
                        cursor: "pointer",
                        dataLabels: {
                            enabled: true,
                            format: "<b>{point.name}</b>: {point.percentage: .1f} %",
                            style: { color: "black" },
                        },
                    },
                };
                chartConfig.tooltip = { pointFormat: "<b>{point.percentage: .1f}%</b>" };
                break;
            }
        }
        return chartConfig;
    }

    /**
     * Get Y axis
     */
    private _getYAxis() {
        let yAxis: any = {
            title: { text: this.yAxisTitle, align: "high" },
            labels: { overflow: "justify" },
        };
        if (this.yAxisMin) {
            yAxis.min = this.yAxisMin;
        }
        if (this.yAxisMax) {
            yAxis.max = this.yAxisMax;
        }
        if (this.yAxisTickInterval) {
            yAxis.tickInterval = this.yAxisTickInterval;
        }
        return yAxis;
    }

    /**
     * Get X axis
     */
    private _getXAxis() {
        return {
            categories: this._data.getNames(),
            title: { text: null },
        };
    }

    /**
     * Get legend
     */
    private _getLegend() {
        if (this.showLegend) {
            switch (this.type) {
                case "bar": {
                    return { layout: "vertical" };
                }
                case "column": {
                    return { reversed: true };
                }
            }
        }
        return { enabled: false };
    }

    /**
     * Get chart base (chart, title, subtitle, tooltip, credits)
     */
    private _getBase() {
        let base: any = {};
        base.chart = { type: this.type };
        base.title = { text: this.showItemSelector ? `${this.title} - ${this.getData().getItem(0).name}` : this.title };
        base.subtitle = { text: this.subTitle };
        base.tooltip = { valueSuffix: this.valueSuffix };
        base.credits = { enabled: false };
        return base;
    }

    /**
     * Get series
     */
    private _generateSeries() {
        switch (this.type) {
            case "column": case "bar": {
                return this._statsFields.map(sf => {
                    return {
                        name: sf.title,
                        data: this._data.getValues(sf),
                    };
                });
            }
            case "pie": {
                if (this._statsFields.length === 1) {
                    const [field] = this._statsFields;
                    switch (field.dataType) {
                        case "number": {
                            return ([{
                                colorByPoint: true,
                                data: this._data.getItems().map((i, index) => ({
                                    name: i.name,
                                    y: this._data.getPercentage(this._statsFields[0], index),
                                })),
                            }]);
                        }
                        case "string": {
                            return ([{
                                colorByPoint: true,
                                data: this._data.getValuesUnique(field).map((value, index) => ({
                                    name: value || strings.NOT_SET,
                                    y: (this._data.getItemsWithValue(field, value).length / this._data.getCount()) * 100,
                                })),
                            }]);
                        }
                    }
                }
                if (this.showAverage) {
                    return [{
                        colorByPoint: true,
                        data: this._statsFields.map(sf => {
                            return {
                                name: sf.title,
                                y: this._data.getAverage(sf),
                            };
                        }),
                    }];
                } else {
                    return [{
                        colorByPoint: true,
                        data: this._statsFields.map(sf => {
                            return {
                                name: sf.title,
                                y: this.getData().getItem(0).getValue(sf),
                            };
                        }),
                    }];
                }
            }
        }
    }

    /**
     * Update item
     *
     * @param {any} updateValues Update values
     */
    private async _updateItem(updateValues) {
        await this._pnpList.items.getById(this.id).update(updateValues);
    }

    /**
     * Get chart type from content type id
     *
     * @param {string} baseContentTypeId Base content type id
     */
    private _setChartTypeFromContentType(baseContentTypeId: string) {
        this.typeIndex = parseInt(this.contentTypeId.replace(baseContentTypeId, "").substring(0, 2), 10) - 1;
        this.type = this._supportedChartTypes[this.typeIndex];
        Logger.log({
            message: String.format(LOG_TEMPLATE, "_getChartTypeFromContentType", "Getting chart type based on content type id", this.title),
            data: {
                contentTypeId: this.contentTypeId,
                type: this.type,
                typeIndex: this.typeIndex,
                supportedChartTypes: this._supportedChartTypes,
            },
            level: LogLevel.Info,
        });
    }
}

