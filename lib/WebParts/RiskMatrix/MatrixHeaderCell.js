"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
class MatrixHeaderCell extends React.Component {
    render() {
        return (React.createElement("td", { className: this.props.className },
            React.createElement("span", null, this.props.label)));
    }
}
exports.default = MatrixHeaderCell;
