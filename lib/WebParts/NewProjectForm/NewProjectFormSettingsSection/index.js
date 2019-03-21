"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//#region Imports
const React = require("react");
const Resources_1 = require("../../../Resources");
const ToggleSection_1 = require("./ToggleSection");
//#endregion
class NewProjectFormSettingsSection extends React.Component {
    /**
    * Constructor
    *
    * @param {INewProjectFormSettingsSectionProps} props Props
    */
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        return (React.createElement("div", { className: this.props.className },
            React.createElement(ToggleSection_1.default, { title: Resources_1.default.getResource("NewProjectForm_ShowListContentSettings"), options: this.props.listData, optLabelProp: "Label", optDefaultCheckedProp: "Default", toggleOptionHandler: this.props.toggleListContentHandler, hidden: this.props.listData.length === 0 }),
            React.createElement(ToggleSection_1.default, { title: Resources_1.default.getResource("NewProjectForm_ShowExtensionSettings"), options: this.props.extensions, optLabelProp: "Title", optDefaultCheckedProp: "IsEnabled", toggleOptionHandler: this.props.toggleExtensionHandler, hidden: this.props.extensions.length === 0 })));
    }
}
NewProjectFormSettingsSection.defaultProps = {
    toggleSectionClassName: "ms-font-l toggle-section",
};
exports.default = NewProjectFormSettingsSection;
