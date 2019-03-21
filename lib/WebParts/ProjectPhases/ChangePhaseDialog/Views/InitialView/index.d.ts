import * as React from "react";
import IInitialViewProps from "./IInitialViewProps";
import IInitialViewState from "./IInitialViewState";
/**
 * Initial view
 */
export default class InitialView extends React.Component<IInitialViewProps, IInitialViewState> {
    static defaultProps: Partial<IInitialViewProps>;
    /**
     * Constructor
     *
     * @param {IInitialViewProps} props Props
     */
    constructor(props: IInitialViewProps);
    render(): JSX.Element;
    /**
     * Render status options
     */
    private renderStatusOptions;
    /**
    * Next checkpoint action
    *
    * @param {string} status Status value
    * @param {string} comment Comment value
    * @param {boolean} updateStatus Update status
    */
    private _onNextCheckPoint;
    /**
    * On comment update
    *
    * @param {string} newValue New value
    */
    private _onCommentUpdate;
}
