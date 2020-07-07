import { Logger, LogLevel } from '@pnp/logging'
import { List } from '@pnp/sp'
import Preferences from '../../Preferences'
import __ from '../../Resources'
import { ProjectStatsChartData } from './ProjectStatsChart'
import StatsFieldConfiguration from './StatsFieldConfiguration'

const LOG_TEMPLATE = '(ChartConfiguration) {0}: {1} ({2})'

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
    public height: number;
    public valueSuffix: string;
    public showLegend: boolean;
    public showAverage: boolean;
    public showPercentage: boolean;
    public showItemSelector: boolean;
    private _pnpList: List;
    private _statsFields: StatsFieldConfiguration[];
    private _data: ProjectStatsChartData;
    private _widthFields = {
        sm: 'WidthSm',
        md: 'WidthMd',
        lg: 'WidthLg',
        xl: 'WidthXl',
        xxl: 'WidthXxl',
        xxxl: 'WidthXxxl',
    };
    private _supportedChartTypes = ['bar', 'column', 'pie'];

    /**
     * Constructor
     *
     * @param {any} spItem SharePoint item
     * @param {List} pnpList PnP list
     */
    constructor(spItem, pnpList: List) {
        this._pnpList = pnpList
        this.contentTypeId = spItem.ContentTypeId
        this.id = spItem.ID
        this.title = spItem.Title
        this.order = spItem['GtChrOrder']
        this.subTitle = spItem['GtChrSubTitle']
        this.height = spItem['GtChrHeight']
        this.width = Object.keys(this._widthFields).reduce((obj, key) => {
            obj[key] = spItem[`GtChr${this._widthFields[key]}`]
            return obj
        }, {})
        this.stacking = spItem['GtChrStacking']
        this.yAxisTitle = spItem['GtChrYAxisTitle']
        this.yAxisMin = spItem['GtChrYMin']
        this.yAxisMax = spItem['GtChrYMax']
        this.yAxisTickInterval = spItem['GtChrYTickInterval']
        this.valueSuffix = spItem['GtChrValueSuffix']
        this.showLegend = spItem['GtChrShowLegend']
        this.showAverage = spItem['GtChrShowAverage']
        this.showPercentage = spItem['GtChrShowPercentage']
        this.showItemSelector = spItem['GtChrShowItemSelector']
        this._setChartTypeFromContentType()
    }

    /**
     * Get data
     */
    public getData() {
        return this._data
    }

    /**
     * Get data
     */
    public getStatsFields() {
        return this._statsFields
    }

    /**
     * Initialize or update ChartConfiguration with data/fields
     *
     * @param {ProjectStatsChartData} data Data
     * @param {StatsFieldConfiguration[]} statsFields Stats fields
     */
    public initOrUpdate(data: ProjectStatsChartData, statsFields?: StatsFieldConfiguration[]): ChartConfiguration {
        this._data = data
        if (statsFields) {
            this._statsFields = statsFields
        }
        return this
    }

    /**
     * Set width
     *
     * @param {string} breakpoint Breakpoint
     * @param {number} width Width
     */
    public setWidth(breakpoint: string, width: number): ChartConfiguration {
        Logger.log({ message: String.format(LOG_TEMPLATE, 'setWidth', `Setting width to ${width} for ${breakpoint}.`, this.title), level: LogLevel.Info })
        this.width[breakpoint] = width
        const widthField = `GtChr${this._widthFields[breakpoint]}`
        const updateValues: any = {}
        updateValues[widthField] = width
        this._updateItem(updateValues)
        return this
    }

    /**
     * Generate Highcharts chart config
     */
    public getConfig() {
        Logger.log({ message: String.format(LOG_TEMPLATE, 'getConfig', 'Generating chart config', this.title), level: LogLevel.Info })
        try {
            const chartConfig = {
                ...this._getBase(),
                series: this._generateSeries(),
            }
            // eslint-disable-next-line default-case
            switch (this.type) {
                case 'bar': {
                    chartConfig.xAxis = this._getXAxis()
                    chartConfig.yAxis = this._getYAxis()
                    chartConfig.plotOptions = {
                        series: { stacking: this.stacking && this.stacking !== 'none' ? this.stacking : '' },
                        bar: {
                            dataLabels: { enabled: true },
                        },
                    }
                    chartConfig.legend = this._getLegend()
                    break
                }
                case 'column': {
                    chartConfig.xAxis = this._getXAxis()
                    chartConfig.yAxis = this._getYAxis()
                    chartConfig.plotOptions = {
                        series: { stacking: this.stacking && this.stacking !== 'none' ? this.stacking : '' },
                        column: {
                            dataLabels: { enabled: true },
                        },
                    }
                    chartConfig.legend = this._getLegend()
                    break
                }
                case 'pie': {
                    chartConfig.plotOptions = {
                        pie: {
                            allowPointSelect: true,
                            cursor: 'pointer',
                            dataLabels: {
                                enabled: true,
                                format: this.showPercentage ? '<b>{point.name}</b>: {point.percentage: .1f} %' : '<b>{point.name}</b>: {point.y:,.0f}',
                                style: { color: 'black' },
                            },
                        },
                    }
                    chartConfig.tooltip = { pointFormat: '<b>{point.percentage: .1f}%</b>' }
                    break
                }
            }
            return chartConfig
        } catch (err) {
            throw err
        }
    }

    /**
     * Get edit form url
     */
    public getEditFormUrl(listUrl: string): string {
        return `${window.location.protocol}//${window.location.hostname}${listUrl}/EditForm.aspx?ID=${this.id}&Source=${encodeURIComponent(_spPageContextInfo.serverRequestPath)}`
    }

    /**
     * Get Y axis
     */
    private _getYAxis() {
        const yAxis: any = {
            title: { text: this.yAxisTitle, align: 'high' },
            labels: { overflow: 'justify' },
            showEmpty: false,
        }
        if (this.yAxisMin) {
            yAxis.min = this.yAxisMin
        }
        if (this.yAxisMax) {
            yAxis.max = this.yAxisMax
        }
        if (this.yAxisTickInterval) {
            yAxis.tickInterval = this.yAxisTickInterval
        }
        return yAxis
    }

    /**
     * Get X axis based on type
     */
    private _getXAxis() {
        switch (this.type) {
            case 'bar': {
                if (this._statsFields.length === 1) {
                    const [field] = this._statsFields
                    // eslint-disable-next-line default-case
                    switch (field.dataType) {
                        case 'string': {
                            return {
                                categories: this._data.getValuesUnique(field),
                                showEmpty: false,
                                title: { text: null },
                            }
                        }
                    }
                }
                return {
                    categories: this._data.getNames(),
                    showEmpty: false,
                    title: { text: null },
                }
            }
            default: {
                return {
                    categories: this._data.getNames(),
                    title: { text: null },
                }
            }
        }
    }

    /**
     * Get legend
     */
    private _getLegend() {
        if (this.showLegend) {
            // eslint-disable-next-line default-case
            switch (this.type) {
                case 'bar': {
                    return { layout: 'vertical' }
                }
                case 'column': {
                    return { reversed: true }
                }
            }
        }
        return { enabled: false }
    }

    /**
     * Get chart base (chart, title, subtitle, tooltip, credits)
     */
    private _getBase() {
        const base: any = {}
        base.chart = { type: this.type, height: this.height }
        base.title = { text: this.showItemSelector ? `${this.title} - ${this.getData().getItem(0).name}` : this.title }
        base.subtitle = { text: this.subTitle }
        base.tooltip = { valueSuffix: this.valueSuffix }
        base.credits = { enabled: false }
        return base
    }

    /**
     * Get series
     */
    private _generateSeries() {
        Logger.log({
            message: String.format(LOG_TEMPLATE, '_generateSeries', `Generating series for chart of type ${this.type}`, this.title),
            data: { statsFields: this._statsFields },
            level: LogLevel.Info,
        })
        // eslint-disable-next-line default-case
        switch (this.type) {
            case 'column': {
                return this._statsFields.map(sf => {
                    return {
                        name: sf.title,
                        data: this._data.getValues(sf),
                    }
                })
            }
            case 'bar': {
                if (this._statsFields.length === 1) {
                    const [field] = this._statsFields
                    // eslint-disable-next-line default-case
                    switch (field.dataType) {
                        case 'string': {
                            return [{
                                name: field.title,
                                data: this._data.getValuesUnique(field).map(value => this._data.getItemsWithStringValue(field, value).length),
                            }]
                        }
                    }
                }
                return this._statsFields.map(sf => {
                    return {
                        name: sf.title,
                        data: this._data.getValues(sf),
                    }
                })
            }
            case 'pie': {
                if (this._statsFields.length === 1) {
                    const [field] = this._statsFields
                    // eslint-disable-next-line default-case
                    switch (field.dataType) {
                        case 'number': {
                            return ([{
                                colorByPoint: true,
                                data: this._data.getItems().map((i, index) => ({
                                    name: i.name,
                                    y: this.showPercentage ? this._data.getPercentage(field, index) : this._data.getItem(index).getValue(field),
                                })),
                            }])
                        }
                        case 'string': {
                            return ([{
                                colorByPoint: true,
                                data: this._data.getValuesUnique(field).map(value => ({
                                    name: value || __.getResource('String_Not_Set'),
                                    y: this.showPercentage ? (this._data.getItemsWithStringValue(field, value).length / this._data.getCount()) * 100 : this._data.getItemsWithStringValue(field, value).length,
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
                            }
                        }),
                    }]
                } else {
                    return [{
                        colorByPoint: true,
                        data: this._statsFields.map(sf => {
                            return {
                                name: sf.title,
                                y: this.getData().getItem(0).getValue(sf),
                            }
                        }),
                    }]
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
        Logger.log({
            message: String.format(LOG_TEMPLATE, '_updateItem', `Updating item with ID ${this.id}.`, this.title),
            data: updateValues,
            level: LogLevel.Info,
        })
        await this._pnpList.items.getById(this.id).update(updateValues)
    }

    /**
     * Get chart type from content type id
     */
    private _setChartTypeFromContentType() {
        const baseContentTypeId = Preferences.getParameter('ChartsConfigContentTypeBase')
        this.typeIndex = parseInt(this.contentTypeId.replace(baseContentTypeId, '').substring(0, 2), 10) - 1
        this.type = this._supportedChartTypes[this.typeIndex]
        Logger.log({
            message: String.format(LOG_TEMPLATE, '_getChartTypeFromContentType', 'Getting chart type based on content type id', this.title),
            data: {
                contentTypeId: this.contentTypeId,
                type: this.type,
                typeIndex: this.typeIndex,
                supportedChartTypes: this._supportedChartTypes,
            },
            level: LogLevel.Info,
        })
    }
}

