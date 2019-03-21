"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const ProgressIndicator_1 = require("office-ui-fabric-react/lib/ProgressIndicator");
const Modal_1 = require("office-ui-fabric-react/lib/Modal");
const Utilities_1 = require("office-ui-fabric-react/lib/Utilities");
const INTERVAL_DELAY = 100;
const INTERVAL_INCREMENT = .01;
const RESTART_WAIT_TIME = 2000;
/**
 * Creation Modal
 */
class ProgressModal extends React.Component {
    /**
     * Constructor
     */
    constructor(props, state) {
        super(props, state);
        /**
         * Fake progress using Async utility from office-ui-fabric-react/lib/Utilities
         */
        this._fakeProgress = () => {
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
        };
        this.state = {
            percentComplete: 0,
        };
        this._async = new Utilities_1.Async(this);
    }
    /**
     * Renders the component
     */
    render() {
        return (React.createElement(Modal_1.Modal, { isOpen: true, isBlocking: this.props.isBlocking, isDarkOverlay: this.props.isDarkOverlay, containerClassName: "pp-modal" },
            React.createElement("div", { style: { padding: 50 } },
                React.createElement("div", { style: { marginBottom: 25 }, className: "ms-font-xl" }, this.props.title),
                React.createElement(ProgressIndicator_1.ProgressIndicator, { label: this.props.progressLabel, description: this.props.progressDescription, percentComplete: this.state.percentComplete }))));
    }
    /**
     * Component did mount
     */
    componentDidMount() {
        this._fakeProgress();
    }
    /**
     * Component did unmount
     */
    componentWillUnmount() {
        this._async.dispose();
    }
}
exports.default = ProgressModal;
