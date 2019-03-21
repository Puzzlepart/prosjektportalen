import * as React from "react";
import IProgressModalProps from "./IProgressModalProps";
import IProgressModalState from "./IProgressModalState";
/**
 * Creation Modal
 */
export default class ProgressModal extends React.Component<IProgressModalProps, IProgressModalState> {
    private _interval;
    private _async;
    /**
     * Constructor
     */
    constructor(props: IProgressModalProps, state: IProgressModalState);
    /**
     * Renders the component
     */
    render(): JSX.Element;
    /**
     * Component did mount
     */
    componentDidMount(): void;
    /**
     * Component did unmount
     */
    componentWillUnmount(): void;
    /**
     * Fake progress using Async utility from office-ui-fabric-react/lib/Utilities
     */
    private _fakeProgress;
}
