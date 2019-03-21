import * as React from "react";
import ProjectStatsChartSettingsProps from "./ProjectStatsChartSettingsProps";
import ProjectStatsChartSettingsState from "./ProjectStatsChartSettingsState";
export default class ProjectStatsChartSettings extends React.Component<ProjectStatsChartSettingsProps, ProjectStatsChartSettingsState> {
    static defaultProps: Partial<ProjectStatsChartSettingsProps>;
    /**
     * Constructor
     *
     * @param {ProjectStatsChartSettingsProps} props Props
     */
    constructor(props: ProjectStatsChartSettingsProps);
    /**
     * Renders the <ProjectStatsChartSettings /> component
     */
    render(): React.ReactElement<ProjectStatsChartSettingsProps>;
    /**
     * Get items
     */
    private _getItems;
    /**
     * Get far items
     */
    private _getFarItems;
}
export { ProjectStatsChartSettingsProps, ProjectStatsChartSettingsState, };
