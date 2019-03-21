"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const logging_1 = require("@pnp/logging");
const ProjectStatsChart_1 = require("../ProjectStatsChart");
const Modal_1 = require("office-ui-fabric-react/lib/Modal");
const DetailsList_1 = require("office-ui-fabric-react/lib/DetailsList");
const MarqueeSelection_1 = require("office-ui-fabric-react/lib/MarqueeSelection");
const Button_1 = require("office-ui-fabric-react/lib/Button");
const Utilities_1 = require("office-ui-fabric-react/lib/Utilities");
const Resources_1 = require("../../../Resources");
class ProjectStatsDataSelection extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = { isExpanded: false, selection: [] };
        this.selection = new DetailsList_1.Selection({ onSelectionChanged: this.onSelectionChanged });
    }
    /**
     * Renders the <ProjectStatsDataSelection /> component
     */
    render() {
        return (React.createElement(Modal_1.Modal, { isOpen: true, onDismiss: this.props.onDismiss },
            React.createElement("div", { className: "ms-Grid", style: { padding: 40, width: 500 } },
                React.createElement("div", { className: "ms-Grid-row" },
                    React.createElement("div", { className: "ms-Grid-col ms-sm12", style: { marginBottom: 20 } },
                        React.createElement("h2", null, Resources_1.default.getResource("String_ProjectStats_EditDataSelection_Text"))),
                    React.createElement("div", { className: "ms-Grid-col ms-sm12", hidden: this.props.data.getCount() === 0 },
                        React.createElement(MarqueeSelection_1.MarqueeSelection, { selection: this.selection },
                            React.createElement(DetailsList_1.DetailsList, { items: this.props.data.getItems(), columns: this.props.columns, setKey: "set", layoutMode: DetailsList_1.DetailsListLayoutMode.fixedColumns, selection: this.selection, selectionPreservedOnEmptyClick: true, selectionMode: DetailsList_1.SelectionMode.multiple, compact: true })),
                        React.createElement("div", { hidden: this.state.selection.length === 0, style: { marginTop: 25 } },
                            React.createElement(Button_1.PrimaryButton, { style: { width: "100%" }, text: Resources_1.default.getResource("String_Button_Update_Selection"), iconProps: { iconName: "Refresh" }, onClick: this.onUpdateSelection })))))));
    }
    /**
     * On selection changed
     */
    onSelectionChanged() {
        const selection = this.selection.getSelection();
        logging_1.Logger.log({ message: `(ProjectStatsDataSelection) onSelectionChanged: ${selection.length} items selected`, level: 1 /* Info */ });
        this.setState({ selection: selection });
    }
    /**
     * On update selection
     *
     * @param {React.MouseEvent} event Event
     */
    onUpdateSelection(event) {
        logging_1.Logger.log({ message: "(ProjectStatsDataSelection) _onUpdate", level: 1 /* Info */ });
        event.preventDefault();
        event.stopPropagation();
        const data = new ProjectStatsChart_1.ProjectStatsChartData(this.state.selection);
        this.props.onUpdateSelection(data);
    }
}
ProjectStatsDataSelection.defaultProps = {
    columns: [{
            key: "name",
            fieldName: "name",
            name: "Tittel",
            minWidth: 100,
            maxWidth: 300,
        }],
};
__decorate([
    Utilities_1.autobind
], ProjectStatsDataSelection.prototype, "onSelectionChanged", null);
__decorate([
    Utilities_1.autobind
], ProjectStatsDataSelection.prototype, "onUpdateSelection", null);
exports.default = ProjectStatsDataSelection;
