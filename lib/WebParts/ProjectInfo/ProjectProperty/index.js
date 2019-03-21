"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_truncate_markup_1 = require("react-truncate-markup");
const ProjectPropertyModel_1 = require("./ProjectPropertyModel");
exports.ProjectPropertyModel = ProjectPropertyModel_1.default;
/**
 * Project Property
 */
class ProjectProperty extends React.Component {
    /**
     * Constructor
     *
     * @param {IProjectPropertyProps} props Props
     */
    constructor(props) {
        super(props);
        this.shouldTruncate = false;
        this.state = { truncate: true };
    }
    /**
     * Calls _render with props and state to allow for ES6 destruction
     */
    render() {
        return this._render(this.props, this.state);
    }
    /**
     * Renders the component
     *
     * @param {IProjectPropertyProps} param0 Props
     * @param {IProjectPropertyState} param1 State
     */
    _render({ model, labelSize, valueSize, truncateLines: truncateLines }, { truncate }) {
        let labelClassName = ["_label", "ms-fontWeight-semibold"];
        let valueClassName = ["_value"];
        if (labelSize) {
            labelClassName.push(`ms-font-${labelSize}`);
        }
        if (valueSize) {
            valueClassName.push(`ms-font-${valueSize}`);
        }
        this.shouldTruncate = truncateLines && truncate && Array.contains(["Note", "Text"], model.type);
        return (React.createElement("div", { className: `${model.internalName} ${model.type} prop`, "data-type": model.type, "data-required": model.required, title: model.description },
            React.createElement("div", { className: labelClassName.join(" ") }, model.displayName),
            React.createElement("div", { className: valueClassName.join(" "), style: { wordBreak: "break-word" } }, this.shouldTruncate ?
                React.createElement(react_truncate_markup_1.default, { lines: truncateLines },
                    " ",
                    model.value,
                    " ") :
                React.createElement("div", { dangerouslySetInnerHTML: { __html: model.value } })),
            React.createElement("div", { hidden: !this.shouldTruncate },
                React.createElement("a", { href: "javascript:void(0);return false;", onClick: e => this.setState({ truncate: false }) }, "Vis mer"))));
    }
}
ProjectProperty.displayName = "ProjectProperty";
exports.default = ProjectProperty;
