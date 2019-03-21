"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
class MatrixRow extends React.Component {
    render() {
        return (React.createElement("tr", { className: this.props.className }, this.props.children));
    }
}
MatrixRow.defaultProps = { className: "risk-matrix-row" };
exports.default = MatrixRow;
