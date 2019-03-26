"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const logging_1 = require("@pnp/logging");
const Preferences_1 = require("../../Preferences");
const Resources_1 = require("../../Resources");
const LOG_TEMPLATE = "(ChartConfiguration) {0}: {1} ({2})";
class ChartConfiguration {
    /**
     * Constructor
     *
     * @param {any} spItem SharePoint item
     * @param {List} pnpList PnP list
     * @param {any[]} contentTypes Content types
     */
    constructor(spItem, pnpList, contentTypes) {
        this._widthFields = {
            sm: "WidthSm",
            md: "WidthMd",
            lg: "WidthLg",
            xl: "WidthXl",
            xxl: "WidthXxl",
            xxxl: "WidthXxxl",
        };
        this._supportedChartTypes = ["bar", "column", "pie"];
        this._pnpList = pnpList;
        // this._contentTypes = contentTypes;
        this.contentTypeId = spItem.ContentTypeId;
        this.id = spItem.ID;
        this.title = spItem.Title;
        this.order = spItem[`GtChrOrder`];
        this.subTitle = spItem[`GtChrSubTitle`];
        this.height = spItem[`GtChrHeight`];
        this.width = Object.keys(this._widthFields).reduce((obj, key) => {
            obj[key] = spItem[`GtChr${this._widthFields[key]}`];
            return obj;
        }, {});
        this.stacking = spItem[`GtChrStacking`];
        this.yAxisTitle = spItem[`GtChrYAxisTitle`];
        this.yAxisMin = spItem[`GtChrYMin`];
        this.yAxisMax = spItem[`GtChrYMax`];
        this.yAxisTickInterval = spItem[`GtChrYTickInterval`];
        this.valueSuffix = spItem[`GtChrValueSuffix`];
        this.showLegend = spItem[`GtChrShowLegend`];
        this.showAverage = spItem[`GtChrShowAverage`];
        this.showPercentage = spItem[`GtChrShowPercentage`];
        this.showItemSelector = spItem[`GtChrShowItemSelector`];
        this._setChartTypeFromContentType();
    }
    /**
     * Get data
     */
    getData() {
        return this._data;
    }
    /**
     * Get data
     */
    getStatsFields() {
        return this._statsFields;
    }
    /**
     * Initialize or update ChartConfiguration with data/fields
     *
     * @param {ProjectStatsChartData} data Data
     * @param {StatsFieldConfiguration[]} statsFields Stats fields
     */
    initOrUpdate(data, statsFields) {
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
    setWidth(breakpoint, width) {
        return __awaiter(this, void 0, void 0, function* () {
            logging_1.Logger.log({ message: String.format(LOG_TEMPLATE, "setWidth", `Setting width to ${width} for ${breakpoint}.`, this.title), level: 1 /* Info */ });
            this.width[breakpoint] = width;
            const widthField = `GtChr${this._widthFields[breakpoint]}`;
            let updateValues = {};
            updateValues[widthField] = width;
            this._updateItem(updateValues);
            return this;
        });
    }
    /**
     * Generate Highcharts chart config
     */
    getConfig() {
        logging_1.Logger.log({ message: String.format(LOG_TEMPLATE, "getConfig", "Generating chart config", this.title), level: 1 /* Info */ });
        try {
            let chartConfig = Object.assign({}, this._getBase(), { series: this._generateSeries() });
            switch (this.type) {
                case "bar": {
                    chartConfig.xAxis = this._getXAxis();
                    chartConfig.yAxis = this._getYAxis();
                    chartConfig.plotOptions = {
                        series: { stacking: this.stacking && this.stacking !== "none" ? this.stacking : "" },
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
                    chartConfig.plotOptions = {
                        series: { stacking: this.stacking && this.stacking !== "none" ? this.stacking : "" },
                        column: {
                            dataLabels: { enabled: true },
                        },
                    };
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
                                format: this.showPercentage ? "<b>{point.name}</b>: {point.percentage: .1f} %" : "<b>{point.name}</b>: {point.y:,.0f}",
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
        catch (err) {
            throw err;
        }
    }
    /**
     * Get edit form url
     */
    getEditFormUrl(listUrl) {
        // let [contentType] = this._contentTypes.filter(ct => ct.StringId.indexOf(this.contentTypeId) !== -1);
        return `${listUrl}/EditForm.aspx?ID=${this.id}&Source=${encodeURIComponent(_spPageContextInfo.serverRequestPath)}`;
    }
    /**
     * Get Y axis
     */
    _getYAxis() {
        let yAxis = {
            title: { text: this.yAxisTitle, align: "high" },
            labels: { overflow: "justify" },
            showEmpty: false,
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
     * Get X axis based on type
     */
    _getXAxis() {
        switch (this.type) {
            case "bar": {
                if (this._statsFields.length === 1) {
                    const [field] = this._statsFields;
                    switch (field.dataType) {
                        case "string": {
                            return {
                                categories: this._data.getValuesUnique(field),
                                showEmpty: false,
                                title: { text: null },
                            };
                        }
                    }
                }
                return {
                    categories: this._data.getNames(),
                    showEmpty: false,
                    title: { text: null },
                };
            }
            default: {
                return {
                    categories: this._data.getNames(),
                    title: { text: null },
                };
            }
        }
    }
    /**
     * Get legend
     */
    _getLegend() {
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
    _getBase() {
        let base = {};
        base.chart = { type: this.type, height: this.height };
        base.title = { text: this.showItemSelector ? `${this.title} - ${this.getData().getItem(0).name}` : this.title };
        base.subtitle = { text: this.subTitle };
        base.tooltip = { valueSuffix: this.valueSuffix };
        base.credits = { enabled: false };
        return base;
    }
    /**
     * Get series
     */
    _generateSeries() {
        logging_1.Logger.log({
            message: String.format(LOG_TEMPLATE, "_generateSeries", `Generating series for chart of type ${this.type}`, this.title),
            data: { statsFields: this._statsFields },
            level: 1 /* Info */,
        });
        switch (this.type) {
            case "column": {
                return this._statsFields.map(sf => {
                    return {
                        name: sf.title,
                        data: this._data.getValues(sf),
                    };
                });
            }
            case "bar": {
                if (this._statsFields.length === 1) {
                    const [field] = this._statsFields;
                    switch (field.dataType) {
                        case "string": {
                            return [{
                                    name: field.title,
                                    data: this._data.getValuesUnique(field).map(value => this._data.getItemsWithStringValue(field, value).length),
                                }];
                        }
                    }
                }
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
                                        y: this.showPercentage ? this._data.getPercentage(field, index) : this._data.getItem(index).getValue(field),
                                    })),
                                }]);
                        }
                        case "string": {
                            return ([{
                                    colorByPoint: true,
                                    data: this._data.getValuesUnique(field).map((value, index) => ({
                                        name: value || Resources_1.default.getResource("String_Not_Set"),
                                        y: this.showPercentage ? (this._data.getItemsWithStringValue(field, value).length / this._data.getCount()) * 100 : this._data.getItemsWithStringValue(field, value).length,
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
                }
                else {
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
    _updateItem(updateValues) {
        return __awaiter(this, void 0, void 0, function* () {
            logging_1.Logger.log({
                message: String.format(LOG_TEMPLATE, "_updateItem", `Updating item with ID ${this.id}.`, this.title),
                data: updateValues,
                level: 1 /* Info */,
            });
            yield this._pnpList.items.getById(this.id).update(updateValues);
        });
    }
    /**
     * Get chart type from content type id
     */
    _setChartTypeFromContentType() {
        const baseContentTypeId = Preferences_1.default.getParameter("ChartsConfigContentTypeBase");
        this.typeIndex = parseInt(this.contentTypeId.replace(baseContentTypeId, "").substring(0, 2), 10) - 1;
        this.type = this._supportedChartTypes[this.typeIndex];
        logging_1.Logger.log({
            message: String.format(LOG_TEMPLATE, "_getChartTypeFromContentType", "Getting chart type based on content type id", this.title),
            data: {
                contentTypeId: this.contentTypeId,
                type: this.type,
                typeIndex: this.typeIndex,
                supportedChartTypes: this._supportedChartTypes,
            },
            level: 1 /* Info */,
        });
    }
}
exports.default = ChartConfiguration;
