import * as React from "react";
import IProjectStatsDataSelectionProps from "./IProjectStatsDataSelectionProps";
import IProjectStatsDataSelectionState from "./IProjectStatsDataSelectionState";
export default class ProjectStatsDataSelection extends React.PureComponent<IProjectStatsDataSelectionProps, IProjectStatsDataSelectionState> {
    static defaultProps: Partial<IProjectStatsDataSelectionProps>;
    private selection;
    constructor(props: IProjectStatsDataSelectionProps);
    /**
     * Renders the <ProjectStatsDataSelection /> component
     */
    render(): React.ReactElement<IProjectStatsDataSelectionProps>;
    /**
     * On selection changed
     */
    private onSelectionChanged;
    /**
     * On update selection
     *
     * @param {React.MouseEvent} event Event
     */
    private onUpdateSelection;
}
export { IProjectStatsDataSelectionProps, IProjectStatsDataSelectionState, };
