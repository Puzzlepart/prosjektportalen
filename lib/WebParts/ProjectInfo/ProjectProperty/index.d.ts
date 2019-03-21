import * as React from "react";
import IProjectPropertyProps from "./IProjectPropertyProps";
import IProjectPropertyState from "./IProjectPropertyState";
import ProjectPropertyModel from "./ProjectPropertyModel";
/**
 * Project Property
 */
export default class ProjectProperty extends React.Component<IProjectPropertyProps, IProjectPropertyState> {
    static displayName: string;
    private shouldTruncate;
    /**
     * Constructor
     *
     * @param {IProjectPropertyProps} props Props
     */
    constructor(props: IProjectPropertyProps);
    /**
     * Calls _render with props and state to allow for ES6 destruction
     */
    render(): JSX.Element;
    /**
     * Renders the component
     *
     * @param {IProjectPropertyProps} param0 Props
     * @param {IProjectPropertyState} param1 State
     */
    private _render;
}
export { ProjectPropertyModel, IProjectPropertyProps };
