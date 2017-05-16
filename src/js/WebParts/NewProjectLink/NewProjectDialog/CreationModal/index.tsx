import * as React from "react";
import {
    Icon,
    ProgressIndicator,
} from "office-ui-fabric-react";
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
     */
    constructor() {
        super();
        this.state = {
            percentComplete: 0,
        };
        this._async = new Async(this);
    }

    /**
     * Renders the component
     */
    public render(): JSX.Element {
        return (
            <Modal
                isOpen={true}
                isBlocking={this.props.isBlocking}
                isDarkOverlay={this.props.isDarkOverlay}
                containerClassName="pp-modal"
            >
                <div style={{ padding: 50 }}>
                    <div
                        style={{ marginBottom: 25 }}
                        className="ms-font-xl">{this.props.title}</div>
                    <ProgressIndicator
                        label={this.props.progressLabel}
                        description={this.props.progressDescription}
                        percentComplete={this.state.percentComplete} />
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
};
