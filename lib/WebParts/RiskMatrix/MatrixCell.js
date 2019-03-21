"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
class MatrixCell extends React.Component {
    render() {
        return (React.createElement("td", { className: this.props.className, style: this.props.style },
            React.createElement("div", { className: this.props.containerClassName }, this.props.children)));
    }
}
MatrixCell.defaultProps = { containerClassName: "cell-container" };
exports.default = MatrixCell;
