import * as React from "react";
import IProjectStatsChartProps from "./IProjectStatsChartProps";
import IProjectStatsChartState from "./IProjectStatsChartState";
import ProjectStatsChartData from "./ProjectStatsChartData";
import ProjectStatsChartDataItem from "./ProjectStatsChartDataItem";
import IProjectStatsChartSeries from "./IProjectStatsChartSeries";
export default class ProjectStatsChart extends React.Component<IProjectStatsChartProps, IProjectStatsChartState> {
    static defaultProps: Partial<IProjectStatsChartProps>;
    private _chartRef;
    /**
     * Constructor
     *
     * @param {IProjectStatsChartProps} props Props
     */
    constructor(props: IProjectStatsChartProps);
    /**
     * Renders the <ProjectStatsChart /> component
     */
    render(): React.ReactElement<IProjectStatsChartProps>;
    /**
     * Get layout class names
     */
    private _getLayoutClassNames;
    /**
     * On item changed
     *
     * @param {ProjectStatsChartDataItem} item Item
     */
    private onItemChanged;
    /**
     * On change width
     *
     * @param {React.MouseEvent} event Event
     */
    private onChangeWidth;
}
export { IProjectStatsChartProps, IProjectStatsChartState, ProjectStatsChartData, ProjectStatsChartDataItem, IProjectStatsChartSeries, };
