"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const logging_1 = require("@pnp/logging");
const CommandBar_1 = require("office-ui-fabric-react/lib/CommandBar");
const Resources_1 = require("../../../../Resources");
const LOG_TEMPLATE = "(ProjectStatsChartSettings) {0}: {1}";
class ProjectStatsChartSettings extends React.Component {
    /**
     * Constructor
     *
     * @param {ProjectStatsChartSettingsProps} props Props
     */
    constructor(props) {
        super(props);
    }
    /**
     * Renders the <ProjectStatsChartSettings /> component
     */
    render() {
        logging_1.Logger.log({
            message: String.format(LOG_TEMPLATE, "render", "Rendering the <ProjectStatsChartSettings /> component."),
            level: 1 /* Info */,
        });
        return (React.createElement("div", { className: "ms-Grid-row", hidden: this.props.hidden },
            React.createElement("div", { className: "ms-Grid-col ms-sm12" },
                React.createElement(CommandBar_1.CommandBar, { items: this._getItems(), farItems: this._getFarItems() }))));
    }
    /**
     * Get items
     */
    _getItems() {
        const { chart } = this.props;
        let items = [];
        if (chart.showItemSelector) {
            items.push({
                key: "pick-project",
                name: Resources_1.default.getResource("String_Select_Project_Name"),
                icon: "ProjectCollection",
                onClick: e => {
                    e.preventDefault();
                    e.stopPropagation();
                },
                subMenuProps: {
                    items: chart.getData().getItems().map((p, i) => ({
                        key: `${i}`,
                        name: p.name,
                        onClick: e => {
                            e.preventDefault();
                            e.stopPropagation();
                            this.props.onItemChanged(p);
                        },
                    })),
                },
            });
        }
        const listUrl = this.props.useProgramEditForm ? "Lists/ProgramChartsConfig" : "Lists/ChartsConfig";
        items.push({
            key: "edit-chart",
            name: "Rediger",
            icon: "EditPhoto",
            onClick: e => {
                e.preventDefault();
                e.stopPropagation();
                document.location.href = `${_spPageContextInfo.siteAbsoluteUrl}/${chart.getEditFormUrl(listUrl)}`;
            },
        });
        return items;
    }
    /**
     * Get far items
     */
    _getFarItems() {
        let farItems = [
            {
                key: "chart-width",
                name: Resources_1.default.getResource("String_Select_Width_Name"),
                icon: "FullWidthEdit",
                onClick: e => {
                    e.preventDefault();
                    e.stopPropagation();
                },
                subMenuProps: {
                    items: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((w, i) => {
                        const name = `${w} (${((w / 12) * 100).toFixed(2)}%)`;
                        return {
                            key: `${i}`,
                            name: name,
                            ["data-width"]: w,
                            onClick: this.props.onWidthChanged,
                        };
                    }),
                },
            },
        ];
        return farItems;
    }
}
ProjectStatsChartSettings.defaultProps = {};
exports.default = ProjectStatsChartSettings;
