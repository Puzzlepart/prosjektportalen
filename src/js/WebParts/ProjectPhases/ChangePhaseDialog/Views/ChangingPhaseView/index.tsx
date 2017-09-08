import * as React from "react";
import { ProgressIndicator } from "office-ui-fabric-react/lib/ProgressIndicator";
import { Async } from "office-ui-fabric-react/lib/Utilities";
import IChangingPhaseViewProps, { ChangingPhaseViewDefaultProps } from "./IChangingPhaseViewProps";
import IChangingPhaseViewState from "./IChangingPhaseViewState";

const INTERVAL_DELAY: number = 100;
const INTERVAL_INCREMENT: number = .01;
const RESTART_WAIT_TIME: number = 2000;

/**
 * Initial view
 */
export default class ChangingPhaseView extends React.Component<IChangingPhaseViewProps, IChangingPhaseViewState> {
    public static displayName = "ChangingPhaseView";
    public static defaultProps = ChangingPhaseViewDefaultProps;
    private _interval: number;
    private _async: Async;

    /**
     * Constructor
     *
     * @param {IChangingPhaseViewProps} props Props
     */
    constructor(props: IChangingPhaseViewProps) {
        super(props);
        this.state = {
            percentComplete: 0,
        };
        this._async = new Async(this);
    }

    /**
     * Component did mount
     */
    public componentDidMount(): void {
        this._fakeProgress();
    }

    /**
     * Component did unmount
     */
    public componentWillUnmount(): void {
        this._async.dispose();
    }

    /**
     * Calls _render with props and state
     */
    public render(): JSX.Element {
        return this._render(this.props, this.state);
    }

    /**
     * Renders the component
     *
     * @param {IChangingPhaseViewProps} param0 Props
     * @param {IChangingPhaseViewState} param1 State
     */
    public _render({ phase, progressLabel, progressDescription }: IChangingPhaseViewProps, { percentComplete }: IChangingPhaseViewState): JSX.Element {
        return (
            <ProgressIndicator
                label={progressLabel}
                description={String.format(progressDescription, phase.Name)}
                percentComplete={percentComplete} />
        );
    }


    /**
     * Fake progress using Async utility from office-ui-fabric-react/lib/Utilities
     */
    private _fakeProgress = (): void => {
        this.setState({
            percentComplete: 0,
        });
        this._interval = this._async.setInterval(() => {
            let percentComplete = this.state.percentComplete + INTERVAL_INCREMENT;
            if (percentComplete >= 1.0) {
                percentComplete = 1.0;
                this._async.clearInterval(this._interval);
                this._async.setTimeout(this._fakeProgress, RESTART_WAIT_TIME);
            }
            this.setState({
                percentComplete: percentComplete,
            });
        }, INTERVAL_DELAY);
    }
}
