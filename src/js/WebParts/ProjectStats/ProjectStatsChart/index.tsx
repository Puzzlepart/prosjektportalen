import * as React from "react";
import { MessageBar, MessageBarType } from "office-ui-fabric-react/lib/MessageBar";
import { autobind } from "office-ui-fabric-react/lib/Utilities";
import { GetBreakpoint } from "../../../Util";
import { LogLevel, Logger } from "@pnp/logging";
import IProjectStatsChartProps from "./IProjectStatsChartProps";
import IProjectStatsChartState from "./IProjectStatsChartState";
import ProjectStatsChartData from "./ProjectStatsChartData";
import ProjectStatsChartDataItem from "./ProjectStatsChartDataItem";
import IProjectStatsChartSeries from "./IProjectStatsChartSeries";
import ProjectStatsChartSettings from "./ProjectStatsChartSettings";
import * as ReactHighcharts from "react-highcharts";

const LOG_TEMPLATE = "(ProjectStatsChart) {0}: {1}";

export default class ProjectStatsChart extends React.Component<IProjectStatsChartProps, IProjectStatsChartState> {
    public static defaultProps: Partial<IProjectStatsChartProps> = {};
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
        this.state = { chart: props.chart, breakpoint };
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

        let config: any;
        let configError: React.ReactNode;

        try {
            config = this.state.chart.getConfig();
        } catch (err) {
            configError = err;
            Logger.log({
                message: String.format(LOG_TEMPLATE, "render", "Failed to get config for chart"),
                data: { err },
                level: LogLevel.Error,
            });
        }

        return (
            <div className={`ms-Grid-col ${this._getLayoutClassNames()}`} style={{ marginTop: "75px" }}>
                <div className="ms-Grid">
                    <ProjectStatsChartSettings
                        hidden={!this.props.showSettings}
                        chart={this.state.chart}
                        onItemChanged={this.onItemChanged}
                        onWidthChanged={this.onChangeWidth}
                        useProgramEditForm={this.props.useProgramEditForm}
                    />
                    <div className="ms-Grid-row">
                        <div className="ms-Grid-col ms-sm12">
                            {config ? (
                                <ReactHighcharts
                                    ref={ele => this._chartRef = ele}
                                    config={config} />)
                                : <MessageBar messageBarType={MessageBarType.error}>{configError}</MessageBar>}
                        </div>
                    </div>
                </div>
            </div>
        );
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
    @autobind
    private onItemChanged(item: ProjectStatsChartDataItem): void {
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
    @autobind
    private async onChangeWidth(event: React.MouseEvent<any>): Promise<void> {
        event.preventDefault();
        event.stopPropagation();
        const { chart, breakpoint } = this.state;
        await chart.setWidth(breakpoint, event.currentTarget.getAttribute("data-width") as number);
        this.setState({ chart });
    }
}

export {
    IProjectStatsChartProps,
    IProjectStatsChartState,
    ProjectStatsChartData,
    ProjectStatsChartDataItem,
    IProjectStatsChartSeries,
};

