"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//#region Imports
const React = require("react");
const Resources_1 = require("../../../../Resources");
const Icon_1 = require("office-ui-fabric-react/lib/Icon");
const Toggle_1 = require("office-ui-fabric-react/lib/Toggle");
//#endregion
class ToggleSection extends React.Component {
    /**
    * Constructor
    *
    * @param {IToggleSectionProps} props Props
    */
    constructor(props) {
        super(props);
        this.state = { isExpanded: false };
        this.onToggle = this.onToggle.bind(this);
    }
    render() {
        return (React.createElement("div", { hidden: this.props.hidden },
            React.createElement("div", { onClick: this.onToggle, className: this.props.headerClassName },
                React.createElement("span", null, this.props.title),
                React.createElement("span", { className: this.state.isExpanded ? "ChevronUp" : "ChevronDown" },
                    React.createElement(Icon_1.Icon, { iconName: this.state.isExpanded ? "ChevronUp" : "ChevronDown" }))),
            React.createElement("section", { hidden: !this.state.isExpanded }, this.props.options.map((opt, index) => {
                return (React.createElement("div", { key: index },
                    React.createElement(Toggle_1.Toggle, { defaultChecked: opt[this.props.optDefaultCheckedProp] === true, label: opt[this.props.optLabelProp], onChanged: checked => this.props.toggleOptionHandler(opt, checked), onText: Resources_1.default.getResource("String_Yes"), offText: Resources_1.default.getResource("String_No") }),
                    React.createElement("div", { className: "ms-font-xs", style: { paddingTop: 10, paddingBottom: 10 }, hidden: !opt.Comments }, opt.Comments)));
            }))));
    }
    /**
     * On toggle
     */
    onToggle() {
        this.setState(prevState => ({ isExpanded: !prevState.isExpanded }));
    }
}
ToggleSection.defaultProps = {
    headerClassName: "ms-font-l toggle-section",
};
exports.default = ToggleSection;
