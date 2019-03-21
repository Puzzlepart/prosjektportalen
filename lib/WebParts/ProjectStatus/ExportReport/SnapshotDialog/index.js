"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const Dialog_1 = require("office-ui-fabric-react/lib/Dialog");
const SnapshotDialog = (props) => {
    const fileExtension = props.report.FileLeafRef.split(".").pop().toLowerCase();
    return (React.createElement(Dialog_1.Dialog, { isOpen: true, type: Dialog_1.DialogType.close, onDismiss: props.onDismiss, isBlocking: false, title: props.report.Title, containerClassName: "pp-snapshot-dialog" },
        React.createElement("div", { id: "snapshot-container" }, fileExtension === "pdf"
            ? React.createElement("embed", { width: "850", height: "750", src: props.report.EncodedAbsUrl, type: "application/pdf" })
            : React.createElement("img", { src: props.report.EncodedAbsUrl }))));
};
exports.default = SnapshotDialog;
