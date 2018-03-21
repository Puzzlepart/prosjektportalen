import * as React from "react";
import { GetBreakpoint } from "../../../Util";
import { LogLevel, Logger } from "sp-pnp-js";
import IProjectStatsChartProps from "./IProjectStatsChartProps";
import IProjectStatsChartState from "./IProjectStatsChartState";
import ProjectStatsChartData from "./ProjectStatsChartData";
import ProjectStatsChartDataItem from "./ProjectStatsChartDataItem";
import IProjectStatsChartSeries from "./IProjectStatsChartSeries";
import ProjectStatsChartSettings from "./ProjectStatsChartSettings";
import * as ReactHighcharts from "react-highcharts";

const LOG_TEMPLATE = "(ProjectStatsChart) {0}: {1}";

export default class ProjectStatsChart extends React.Component<IProjectStatsChartProps, IProjectStatsChartState> {
    public static defaultProps: Partial<IProjectStatsChartProps> = {}
    private _chartRef: any;

    /**
     * Constructor
     * 
     * @param {IProjectStatsChartProps} props Props
     */
    constructor(props: IProjectStatsChartProps) {
        super(props);
        let breakpoint = GetBreakpoint();
        Logger.log({
            message: String.format(LOG_TEMPLATE, "constructor", "Initializing the <ProjectStatsChart /> component."),
            data: { breakpoint },
            level: LogLevel.Info,
        });
        this.state = {
            chart: props.chart,
            breakpoint,
        };
        this._onItemChanged = this._onItemChanged.bind(this);
        this._onChangeWidth = this._onChangeWidth.bind(this);
    }

    /**
     * Renders the <ProjectStatsChart /> component
     */
    public render(): React.ReactElement<IProjectStatsChartProps> {
        Logger.log({
            message: String.format(LOG_TEMPLATE, "render", "Rendering the <ProjectStatsChart /> component."),
            data: { title: this.state.chart.title },
            level: LogLevel.Info,
        });
        return (
            <div className={`ms-Grid-col ${this._getLayoutClassNames()}`} style={{ marginTop: this.state.chart.marginTop }}>
                <div className="ms-Grid">
                    <ProjectStatsChartSettings
                        chart={this.state.chart}
                        onItemChanged={this._onItemChanged}
                        onWidthChanged={this._onChangeWidth} />
                    <div className="ms-Grid-row">
                        <div className="ms-Grid-col ms-sm12">
                            <ReactHighcharts
                                ref={ele => this._chartRef = ele}
                                config={this._generateChartConfig()} />
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    /**
     * Get layout class names
     */
    private _getLayoutClassNames(): string {
        const classNames = Object.keys(this.state.chart.width).map(key => {
            let value = this.state.chart.width[key];
            if (value) {
                return `ms-${key}${value}`;
            }
            return null;
        }).filter(c => c);
        return classNames.join(" ");
    }

    /**
     * On item changed
     * 
     * @param {ProjectStatsChartDataItem} item Item
     */
    private _onItemChanged(item: ProjectStatsChartDataItem): void {
        const { chart } = this.state;
        const chartElement = this._chartRef.getChart();

        switch (chart.type) {
            case "pie": {
                const data = chart.getStatsFields().map(sf => item.getValue(sf));
                const title = `${this.state.chart.title} - ${item.name}`;
                chartElement.title.update({ text: title });
                chartElement.series[0].setData(data);
                break;
            }
        }
    }

    /**
     * On change width
     * 
     * @param {React.MouseEvent} event Event
     */
    private async _onChangeWidth(event: React.MouseEvent<any>): Promise<void> {
        event.preventDefault();
        event.stopPropagation();
        const { chart, breakpoint } = this.state;
        await chart.setWidth(breakpoint, event.currentTarget.getAttribute("data-width") as number);
        this.setState({ chart });
    }

    /**
     * Generate Highcharts chart config
     */
    private _generateChartConfig() {
        const { chart } = this.state;
        const { title, type, stacking } = chart;

        Logger.log({
            message: String.format(LOG_TEMPLATE, "_generateChartConfig", `Generating chart config for chart "${title}" (${type}).`),
            level: LogLevel.Info,
        });

        let chartConfig = {
            ...chart.getBase(),
            series: chart.getSeries(),
        };
        switch (type) {
            case "bar": {
                chartConfig.xAxis = chart.getXAxis();
                chartConfig.yAxis = chart.getYAxis();
                chartConfig.plotOptions = {
                    bar: {
                        dataLabels: { enabled: true },
                    },
                };
                chartConfig.legend = chart.getLegend();
                break;
            }
            case "column": {
                chartConfig.xAxis = chart.getXAxis();
                chartConfig.yAxis = chart.getYAxis();
                chartConfig.plotOptions = { series: { stacking: stacking } };
                chartConfig.legend = chart.getLegend();
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
}

export {
    IProjectStatsChartProps,
    IProjectStatsChartState,
    ProjectStatsChartData,
    ProjectStatsChartDataItem,
    IProjectStatsChartSeries,
}
