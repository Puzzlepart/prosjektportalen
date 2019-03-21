"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const MatrixHeaderCell = ({ label, className }) => {
    return (React.createElement("td", { className: className },
        React.createElement("span", null, label)));
};
exports.default = MatrixHeaderCell;
