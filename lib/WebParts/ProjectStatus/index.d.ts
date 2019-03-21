import * as React from "react";
import IProjectStatusState from "./IProjectStatusState";
import IProjectStatusProps from "./IProjectStatusProps";
import BaseWebPart from "../@BaseWebPart";
/**
 * Project Status
 */
export default class ProjectStatus extends BaseWebPart<IProjectStatusProps, IProjectStatusState> {
    static displayName: string;
    static defaultProps: Partial<IProjectStatusProps>;
    /**
     * Constructor
     *
     * @param {IProjectStatusProps} props Props
     */
    constructor(props: IProjectStatusProps);
    componentDidMount(): Promise<void>;
    render(): React.ReactElement<IProjectStatusProps>;
    /**
     * Render sections
     */
    private renderSections;
    /**
     * Fetches required data
     */
    private fetchData;
}
export { IProjectStatusProps, IProjectStatusState };
