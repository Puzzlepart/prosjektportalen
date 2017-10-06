import * as React from "react";
import { ProgressIndicator } from "office-ui-fabric-react/lib/ProgressIndicator";
import { Modal } from "office-ui-fabric-react/lib/Modal";
import { Async } from "office-ui-fabric-react/lib/Utilities";
import ICreationModalProps from "./ICreationModalProps";
import ICreationModalState from "./ICreationModalState";

const INTERVAL_DELAY: number = 100;
const INTERVAL_INCREMENT: number = .01;
const RESTART_WAIT_TIME: number = 2000;

/**
 * Creation Modal
 */
export default class CreationModal extends React.Component<ICreationModalProps, ICreationModalState> {
    private _interval: number;
    private _async: Async;

    /**
     * Constructor
     *
     * @param {ICreationModalProps} props Props
     */
    constructor(props: ICreationModalProps) {
        super(props);
        this.state = {
            percentComplete: 0,
        };
        this._async = new Async(this);
    }


    /**
     * Calls _render with props and state to allow for ES6 destruction
     */
    public render(): JSX.Element {
        return this._render(this.props, this.state);
    }

    /**
     * Renders the component
     *
     * @param {ICreationModalProps} param0 Props
     * @param {ICreationModalState} param1 State
     */
    public _render({ isBlocking, isDarkOverlay, title, progressLabel, progressDescription }: ICreationModalProps, { percentComplete }: ICreationModalState): JSX.Element {
        return (
            <Modal
                isOpen={true}
                isBlocking={isBlocking}
                isDarkOverlay={isDarkOverlay}
                containerClassName="pp-modal"
            >
                <div style={{
                    height: 225,
                    padding: 50,
                    boxSizing: "border-box",
                }}>
                    <div
                        style={{ marginBottom: 25 }}
                        className="ms-font-xl">{title}</div>
                    <ProgressIndicator
                        label={progressLabel}
                        description={progressDescription}
                        percentComplete={percentComplete} />
                </div>
            </Modal>
        );
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
