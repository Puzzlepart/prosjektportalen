"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const MessageBar_1 = require("office-ui-fabric-react/lib/MessageBar");
const Utilities_1 = require("office-ui-fabric-react/lib/Utilities");
const Util_1 = require("../../../Util");
const logging_1 = require("@pnp/logging");
const ProjectStatsChartData_1 = require("./ProjectStatsChartData");
exports.ProjectStatsChartData = ProjectStatsChartData_1.default;
const ProjectStatsChartDataItem_1 = require("./ProjectStatsChartDataItem");
exports.ProjectStatsChartDataItem = ProjectStatsChartDataItem_1.default;
const ProjectStatsChartSettings_1 = require("./ProjectStatsChartSettings");
const ReactHighcharts = require("react-highcharts");
const LOG_TEMPLATE = "(ProjectStatsChart) {0}: {1}";
class ProjectStatsChart extends React.Component {
    /**
     * Constructor
     *
     * @param {IProjectStatsChartProps} props Props
     */
    constructor(props) {
        super(props);
        let breakpoint = Util_1.GetBreakpoint();
        logging_1.Logger.log({
            message: String.format(LOG_TEMPLATE, "constructor", "Initializing the <ProjectStatsChart /> component."),
            data: { breakpoint },
            level: 1 /* Info */,
        });
        this.state = { chart: props.chart, breakpoint };
    }
    /**
     * Renders the <ProjectStatsChart /> component
     */
    render() {
        logging_1.Logger.log({
            message: String.format(LOG_TEMPLATE, "render", "Rendering the <ProjectStatsChart /> component."),
            data: { title: this.state.chart.title },
            level: 1 /* Info */,
        });
        let config;
        let configError;
        try {
            config = this.state.chart.getConfig();
        }
        catch (err) {
            configError = err;
            logging_1.Logger.log({
                message: String.format(LOG_TEMPLATE, "render", "Failed to get config for chart"),
                data: { err },
                level: 3 /* Error */,
            });
        }
        return (React.createElement("div", { className: `ms-Grid-col ${this._getLayoutClassNames()}`, style: { marginTop: "75px" } },
            React.createElement("div", { className: "ms-Grid" },
                React.createElement(ProjectStatsChartSettings_1.default, { hidden: !this.props.showSettings, chart: this.state.chart, onItemChanged: this.onItemChanged, onWidthChanged: this.onChangeWidth, listServerRelativeUrl: this.props.listServerRelativeUrl, renderCommandBar: this.props.renderCommandBar }),
                React.createElement("div", { className: "ms-Grid-row" },
                    React.createElement("div", { className: "ms-Grid-col ms-sm12" }, config ? (React.createElement(ReactHighcharts, { ref: ele => this._chartRef = ele, config: config }))
                        : React.createElement(MessageBar_1.MessageBar, { messageBarType: MessageBar_1.MessageBarType.error }, configError))))));
    }
    /**
     * Get layout class names
     */
    _getLayoutClassNames() {
        const classNames = Object.keys(this.state.chart.width).map(key => {
            let value = this.state.chart.width[key];
            if (value) {
                return `ms-${key}${value}`;
            }
            return null;
        }).filter(c => c);
        return classNames.join(" ");
    }
    /**
     * On item changed
     *
     * @param {ProjectStatsChartDataItem} item Item
     */
    onItemChanged(item) {
        const { chart } = this.state;
        const chartElement = this._chartRef.getChart();
        switch (chart.type) {
            case "pie": {
                const data = chart.getStatsFields().map(sf => item.getValue(sf));
                const title = `${this.state.chart.title} - ${item.name}`;
                chartElement.title.update({ text: title });
                chartElement.series[0].setData(data);
                break;
            }
        }
    }
    /**
     * On change width
     *
     * @param {React.MouseEvent} event Event
     */
    onChangeWidth(event) {
        return __awaiter(this, void 0, void 0, function* () {
            event.preventDefault();
            event.stopPropagation();
            const { chart, breakpoint } = this.state;
            yield chart.setWidth(breakpoint, event.currentTarget.getAttribute("data-width"));
            this.setState({ chart });
        });
    }
}
ProjectStatsChart.defaultProps = {};
__decorate([
    Utilities_1.autobind
], ProjectStatsChart.prototype, "onItemChanged", null);
__decorate([
    Utilities_1.autobind
], ProjectStatsChart.prototype, "onChangeWidth", null);
exports.default = ProjectStatsChart;
