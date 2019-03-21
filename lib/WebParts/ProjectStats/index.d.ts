import * as React from "react";
import IProjectStatsProps from "./IProjectStatsProps";
import IProjectStatsState from "./IProjectStatsState";
import BaseWebPart from "../@BaseWebPart";
/**
 * ProjectStats
 */
export default class ProjectStats extends BaseWebPart<IProjectStatsProps, IProjectStatsState> {
    static displayName: string;
    static defaultProps: Partial<IProjectStatsProps>;
    private statsFieldsList;
    private chartsConfigList;
    /**
     * Constructor
     *
     * @param {IProjectStatsProps} props Props
     */
    constructor(props: IProjectStatsProps);
    componentDidMount(): Promise<void>;
    /**
     * Renders the <ProjectStats /> component
     */
    render(): React.ReactElement<IProjectStatsProps>;
    /**
    * Renders the command bar from office-ui-fabric-react
    */
    private renderCommandBar;
    /**
     * Render inner
     */
    private renderInner;
    /**
     * On data selection updated
     *
     * @param {ProjectStatsChartData} data Data
     */
    private onDataSelectionUpdated;
    /**
     * On view changed
     *
     * @param {IDynamicPortfolioViewConfig} view View
     */
    private onViewChanged;
    /**
     * Fetch data
     *
     * @param {IDynamicPortfolioViewConfig} view View
     */
    private fetchData;
}
export { IProjectStatsProps, IProjectStatsState };
