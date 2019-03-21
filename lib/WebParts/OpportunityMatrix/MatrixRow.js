"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const MatrixRow = ({ cells }) => {
    return (React.createElement("tr", { className: "opportunity-matrix-row" }, cells));
};
exports.default = MatrixRow;
