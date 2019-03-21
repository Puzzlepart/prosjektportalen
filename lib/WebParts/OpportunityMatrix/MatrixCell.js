"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const MatrixCell = (props) => {
    return (React.createElement("td", { className: props.className, style: props.style },
        React.createElement("div", { className: "cell-container" }, props.contents)));
};
exports.default = MatrixCell;
