"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const ProgressIndicator_1 = require("office-ui-fabric-react/lib/ProgressIndicator");
const Modal_1 = require("office-ui-fabric-react/lib/Modal");
/**
 * Creation Modal
 */
const CreationModal = (props) => {
    return (React.createElement(Modal_1.Modal, { isOpen: true, isBlocking: props.isBlocking, isDarkOverlay: props.isDarkOverlay, containerClassName: "pp-modal pp-creationModal" },
        React.createElement("div", { className: "pp-modal-inner" },
            React.createElement("div", { className: "pp-creationModalHeader ms-font-xl" }, props.title),
            React.createElement(ProgressIndicator_1.ProgressIndicator, { label: props.progressLabel, description: props.progressDescription }))));
};
exports.default = CreationModal;
