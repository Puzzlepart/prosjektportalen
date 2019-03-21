"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const _Components_1 = require("../@Components");
class RiskMatrix extends React.Component {
    render() {
        return (React.createElement("div", { className: this.props.className, title: this._getTooltip(), style: this.props.style },
            React.createElement(_Components_1.ModalLink, { label: this.props.model.id, title: this._getTooltip(), url: this.props.model.url, options: { HideRibbon: true } })));
    }
    _getTooltip() {
        let tooltip = "";
        if (this.props.model.siteTitle) {
            tooltip += `${this.props.model.siteTitle}: `;
        }
        tooltip += this.props.model.title;
        return tooltip;
    }
}
RiskMatrix.defaultProps = { className: "risk-matrix-element" };
exports.default = RiskMatrix;
