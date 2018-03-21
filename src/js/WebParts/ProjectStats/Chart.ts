import { List, LogLevel, Logger } from "sp-pnp-js";
import { ProjectStatsChartData } from "./ProjectStatsChart";
import StatsField from "./StatsField";

const LOG_TEMPLATE = "(Chart) {0}: {1} ({2})";

export default class Chart {
    public id: number;
    public order: number;
    public title: string;
    public subTitle: string;
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
    private _data: ProjectStatsChartData
    private _widthFields: { [key: string]: string };

    /**
     * Constructor
     * 
     * @param {any} spItem SharePoint item
     * @param {List} pnpList PnP list
     */
    constructor(spItem, pnpList: List) {
        this._pnpList = pnpList;
        this.id = spItem.ID;
        this.order = spItem.PzlChOrder;
        this.title = spItem.Title;
        this.subTitle = spItem.PzlChSubTitle;
        this.type = spItem.PzlChChartType;
        this._widthFields = {
            sm: "PzlChWidthSm",
            md: "PzlChWidthMd",
            lg: "PzlChWidthLg",
            xl: "PzlChWidthXl",
            xxl: "PzlChWidthXxl",
            xxxl: "PzlChWidthXxxl",
        };
        this.width = Object.keys(this._widthFields).reduce((obj, key) => {
            obj[key] = spItem[this._widthFields[key]];
            return obj;
        }, {});
        this.stacking = spItem.PzlChStacking;
        this.yAxisTitle = spItem.PzlChYAxisTitle;
        this.yAxisMin = spItem.PzlChYMin;
        this.yAxisMax = spItem.PzlChYMax;
        this.yAxisTickInterval = spItem.PzlChYTickInterval;
        this.valueSuffix = spItem.PzlChValueSuffix;
        this.showLegend = spItem.PzlChShowLegend;
        this.showAverage = spItem.PzlChShowAverage;
        this.showItemSelector = spItem.PzlChShowItemSelector;
        this.marginTop = spItem.PzlChMarginTop;
    }

    /**
     * Get Y axis
     */
    public getYAxis() {
        let yAxis: any = {
            title: { text: this.yAxisTitle, align: "high" },
            labels: { overflow: "justify" },
        }
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
    public getXAxis() {
        return {
            categories: this._data.getNames(),
            title: { text: null },
        };
    }

    /**
     * Get legend
     */
    public getLegend() {
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
    public getBase() {
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
    public getSeries() {
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
                            }])
                        }
                        case "string": {
                            return ([{
                                colorByPoint: true,
                                data: this._data.getValuesUnique(field).map((v, index) => ({
                                    name: v || "Ikke satt",
                                    y: (this._data.getItemsWithValue(field, v).length / this._data.getCount()) * 100,
                                })),
                            }])
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
    public set(data: ProjectStatsChartData, statsFields?: StatsField[]): Chart {
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
    public async setWidth(breakpoint: string, width: number): Promise<Chart> {
        Logger.log({
            message: String.format(LOG_TEMPLATE, "setWidth", `Setting width to ${width} for ${breakpoint}.`, this.title),
            level: LogLevel.Info,
        })
        this.width[breakpoint] = width;
        const widthField = this._widthFields[breakpoint];
        let updateValues: any = {};
        updateValues[widthField] = width;
        await this._updateItem(updateValues);
        return this;
    }

    /**
     * Update item
     * 
     * @param {any} updateValues Update values
     */
    private async _updateItem(updateValues) {
        await this._pnpList.items.getById(this.id).update(updateValues);
    }
}

