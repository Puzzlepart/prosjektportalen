"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const Resources_1 = require("../../../Resources");
const Modal_1 = require("office-ui-fabric-react/lib/Modal");
class ResourceAllocationDetailsModal extends React.PureComponent {
    /**
     * Constructor
     *
     * @param {IResourceAllocationDetailsModalProps} props Props
     */
    constructor(props) {
        super(props);
    }
    /**
     * Renders the <ResourceAllocationDetailsModal /> component
     */
    render() {
        if (this.props.allocation) {
            return (React.createElement(Modal_1.Modal, { isOpen: true, isBlocking: false, onDismiss: this.props.onDismiss },
                React.createElement("div", { style: { padding: 50, maxWidth: 400 } },
                    this._renderHeader(),
                    this._renderBody())));
        }
        return null;
    }
    /***
     * Renders the modal header
     */
    _renderHeader() {
        const { allocation } = this.props;
        return (React.createElement("div", null,
            React.createElement("h3", null,
                allocation.role || allocation.absence,
                " (",
                allocation.allocationPercentage,
                "%)")));
    }
    /**
     * Renders the modal body
     */
    _renderBody() {
        const { allocation } = this.props;
        return (React.createElement("div", { className: "allocation-modal" },
            allocation.workDescription &&
                React.createElement("p", null,
                    React.createElement("span", null, allocation.workDescription)),
            React.createElement("p", null,
                React.createElement("b", null,
                    Resources_1.default.getResource("String_Resource"),
                    ":"),
                "\u00A0",
                React.createElement("span", null, allocation.user.name)),
            React.createElement("p", null,
                React.createElement("b", null,
                    Resources_1.default.getResource("String_From"),
                    ":"),
                "\u00A0",
                React.createElement("span", null, allocation.start_time.format("LL"))),
            React.createElement("p", null,
                React.createElement("b", null,
                    Resources_1.default.getResource("String_To"),
                    ":"),
                "\u00A0",
                React.createElement("span", null, allocation.end_time.format("LL"))),
            allocation.project && allocation.project.url &&
                React.createElement("p", null,
                    React.createElement("b", null,
                        Resources_1.default.getResource("String_Project"),
                        ":"),
                    "\u00A0",
                    React.createElement("a", { href: allocation.project.url, style: { outline: "none" }, target: "_blank" },
                        React.createElement("span", null, allocation.project.name)))));
    }
}
ResourceAllocationDetailsModal.displayName = "ResourceAllocationDetailsModal";
exports.default = ResourceAllocationDetailsModal;
