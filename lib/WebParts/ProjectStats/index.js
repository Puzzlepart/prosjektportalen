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
const Resources_1 = require("../../Resources");
const Util_1 = require("../../Util");
const DynamicPortfolioConfiguration = require("../DynamicPortfolio/DynamicPortfolioConfiguration");
const sp_1 = require("@pnp/sp");
const logging_1 = require("@pnp/logging");
const Spinner_1 = require("office-ui-fabric-react/lib/Spinner");
const MessageBar_1 = require("office-ui-fabric-react/lib/MessageBar");
const IProjectStatsProps_1 = require("./IProjectStatsProps");
const Project_1 = require("./Project");
const ChartConfiguration_1 = require("./ChartConfiguration");
const StatsFieldConfiguration_1 = require("./StatsFieldConfiguration");
const ProjectStatsChart_1 = require("./ProjectStatsChart");
const ProjectStatsDataSelection_1 = require("./ProjectStatsDataSelection");
const _BaseWebPart_1 = require("../@BaseWebPart");
const CommandBar_1 = require("office-ui-fabric-react/lib/CommandBar");
const ContextualMenu_1 = require("office-ui-fabric-react/lib/ContextualMenu");
const Utilities_1 = require("office-ui-fabric-react/lib/Utilities");
const Util_2 = require("../../Util");
const LOG_TEMPLATE = "(ProjectStats) {0}: {1}";
/**
 * ProjectStats
 */
class ProjectStats extends _BaseWebPart_1.default {
    /**
     * Constructor
     *
     * @param {IProjectStatsProps} props Props
     */
    constructor(props) {
        super(props, { isLoading: true, showChartSettings: props.showChartSettings });
        this.statsFieldsList = sp_1.sp.web.lists.getByTitle(this.props.statsFieldsListName);
        this.chartsConfigList = sp_1.sp.web.lists.getByTitle(this.props.chartsConfigListName);
    }
    componentDidMount() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const config = yield this.fetchData();
                console.log(config);
                logging_1.Logger.log({ message: String.format(LOG_TEMPLATE, "componentDidMount", `Successfully fetched chart config for ${config.charts.length} charts.`), level: 1 /* Info */ });
                this.setState(Object.assign({}, config, { isLoading: false }));
                if (this.props.viewSelectorEnabled) {
                    Util_2.setUrlHash({ viewId: this.state.currentView.id.toString() });
                }
            }
            catch (err) {
                console.log(err);
                logging_1.Logger.log({ message: String.format(LOG_TEMPLATE, "componentDidMount", "Failed to fetch data."), level: 3 /* Error */ });
                this.setState({ errorMessage: err, isLoading: false });
            }
        });
    }
    /**
     * Renders the <ProjectStats /> component
     */
    render() {
        const renderCommanBar = false;
        const { isLoading, errorMessage, data } = this.state;
        if (isLoading) {
            return React.createElement(Spinner_1.Spinner, { label: Resources_1.default.getResource("String_ProjectStats_Loading_Text"), type: Spinner_1.SpinnerType.large });
        }
        if (errorMessage) {
            return React.createElement(MessageBar_1.MessageBar, { messageBarType: MessageBar_1.MessageBarType.error }, Resources_1.default.getResource("String_ProjectStats_Error_Text"));
        }
        logging_1.Logger.log({ message: String.format(LOG_TEMPLATE, "render", "Rendering component <ProjectStats />."), level: 1 /* Info */ });
        return (React.createElement("div", { className: "ms-Grid" },
            React.createElement("div", { className: "ms-Grid-row" }, renderCommanBar &&
                this.renderCommandBar()),
            React.createElement("div", { className: "ms-Grid-row" }, this.renderInner()),
            this.state.showDataSelectionModal && (React.createElement(ProjectStatsDataSelection_1.default, { data: data, onUpdateSelection: this.onDataSelectionUpdated, onDismiss: _ => this.setState({ showDataSelectionModal: false }) }))));
    }
    /**
    * Renders the command bar from office-ui-fabric-react
    */
    renderCommandBar() {
        const items = [];
        const farItems = [];
        items.push({
            key: "NewItem",
            name: Resources_1.default.getResource("String_New"),
            iconProps: { iconName: "Add" },
            itemType: ContextualMenu_1.ContextualMenuItemType.Header,
            onClick: e => e.preventDefault(),
            subMenuProps: {
                items: this.state.contentTypes.map(({ Name, StringId, NewFormUrl }) => ({
                    key: `ContentType_${StringId}`,
                    name: Name,
                    onClick: (e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        let contentTypeNewFormUrl = `${NewFormUrl}?ContentTypeId=${StringId}&Source=${encodeURIComponent(_spPageContextInfo.serverRequestPath)}`;
                        document.location.href = contentTypeNewFormUrl;
                    },
                })),
            },
        });
        farItems.push({
            key: "ShowChartSettings",
            name: Resources_1.default.getResource("String_ProjectStats_ShowChartSettings_Text"),
            iconProps: { iconName: "ContactCardSettings" },
            checked: this.state.showChartSettings,
            canCheck: true,
            onClick: (e) => {
                e.preventDefault();
                this.setState({ showChartSettings: !this.state.showChartSettings });
            },
        });
        farItems.push({
            key: "EditDataSelection",
            name: Resources_1.default.getResource("String_ProjectStats_EditDataSelection_Text"),
            iconProps: { iconName: "ExploreData" },
            onClick: (e) => {
                e.preventDefault();
                this.setState({ showDataSelectionModal: true });
            },
        });
        if (this.props.viewSelectorEnabled) {
            farItems.push({
                key: "View",
                name: this.state.currentView.name,
                iconProps: { iconName: "List" },
                itemType: ContextualMenu_1.ContextualMenuItemType.Header,
                onClick: e => e.preventDefault(),
                subMenuProps: {
                    items: this.state.views.map((qc, idx) => ({
                        key: `View_${idx.toString()}`,
                        name: qc.name,
                        iconProps: { iconName: qc.iconName },
                        onClick: (e) => {
                            e.preventDefault();
                            this.onViewChanged(qc);
                        },
                    })),
                },
            });
        }
        return (React.createElement("div", { className: "ms-Grid-col ms-sm12" },
            React.createElement(CommandBar_1.CommandBar, { items: items, farItems: farItems })));
    }
    /**
     * Render inner
     */
    renderInner() {
        const { charts, data } = this.state;
        if (charts.length === 0) {
            return React.createElement(MessageBar_1.MessageBar, { messageBarType: MessageBar_1.MessageBarType.info }, Resources_1.default.getResource("String_ProjectStats_No_Charts_Text"));
        }
        if (data.getCount() === 0) {
            return React.createElement(MessageBar_1.MessageBar, { messageBarType: MessageBar_1.MessageBarType.info }, Resources_1.default.getResource("String_ProjectStats_No_Data_Text"));
        }
        return charts
            .sort((a, b) => a.order - b.order)
            .map((chart, idx) => (React.createElement(ProjectStatsChart_1.default, { key: idx, chart: chart, showSettings: this.state.showChartSettings })));
    }
    /**
     * On data selection updated
     *
     * @param {ProjectStatsChartData} data Data
     */
    onDataSelectionUpdated(data) {
        return __awaiter(this, void 0, void 0, function* () {
            logging_1.Logger.log({ message: String.format(LOG_TEMPLATE, "_onDataSelectionUpdated", "Selection was updated."), level: 1 /* Info */ });
            this.setState({ showDataSelectionModal: false, charts: this.state.charts.map(c => c.initOrUpdate(data)) });
        });
    }
    /**
     * On view changed
     *
     * @param {IDynamicPortfolioViewConfig} view View
     */
    onViewChanged(view) {
        return __awaiter(this, void 0, void 0, function* () {
            logging_1.Logger.log({ message: String.format(LOG_TEMPLATE, "_onViewChanged", "View was updated."), data: { view }, level: 1 /* Info */ });
            this.setState({ isLoading: true });
            try {
                const { data } = yield this.fetchData(view);
                const charts = this.state.charts.map(c => c.initOrUpdate(data));
                this.setState({ isLoading: false, currentView: view, data, charts });
                Util_2.setUrlHash({ viewId: view.id.toString() });
            }
            catch (errorMessage) {
                logging_1.Logger.log({ message: String.format(LOG_TEMPLATE, "_onViewChanged", "Failed to fetch data."), data: errorMessage, level: 3 /* Error */ });
                this.setState({ errorMessage, isLoading: false });
            }
        });
    }
    /**
     * Fetch data
     *
     * @param {IDynamicPortfolioViewConfig} view View
     */
    fetchData(view) {
        return __awaiter(this, void 0, void 0, function* () {
            let hashState = Util_2.getUrlHash();
            const configWebUrl = _spPageContextInfo.siteAbsoluteUrl;
            try {
                const [{ views }, fieldsSpItems, chartsSpItems, chartsConfigListContentTypes, statsFieldsListContenTypes] = yield Promise.all([
                    DynamicPortfolioConfiguration.getConfig("GtDpOrder", configWebUrl),
                    this.statsFieldsList.items.select("ID", "Title", "GtChrManagedPropertyName", "GtChrDataType").usingCaching().get(),
                    this.chartsConfigList.items.usingCaching().get(),
                    this.chartsConfigList.contentTypes.usingCaching().get(),
                    this.statsFieldsList.contentTypes.usingCaching().get(),
                ]);
                const contentTypes = [...chartsConfigListContentTypes, ...statsFieldsListContenTypes];
                let currentView = view;
                if (!currentView) {
                    let viewIdUrlParam = GetUrlKeyValue("viewId");
                    if (viewIdUrlParam && viewIdUrlParam !== "") {
                        [currentView] = views.filter(qc => qc.id === parseInt(viewIdUrlParam, 10));
                    }
                    else if (hashState.viewId) {
                        [currentView] = views.filter(qc => qc.id === parseInt(hashState.viewId, 10));
                    }
                    else {
                        [currentView] = views.filter(v => v.default);
                        if (!currentView) {
                            currentView = views[0];
                            logging_1.Logger.log({ message: String.format(LOG_TEMPLATE, "fetchData", `No default view found. Using ${currentView.name}.`), level: 1 /* Info */ });
                        }
                    }
                }
                logging_1.Logger.log({ message: String.format(LOG_TEMPLATE, "fetchData", `Fetching view ${currentView.name}.`), data: { queryTemplate: currentView.queryTemplate }, level: 1 /* Info */ });
                const fields = fieldsSpItems.map(i => new StatsFieldConfiguration_1.default(i.ID, i.Title, i[`GtChrManagedPropertyName`], i[`GtChrDataType`]));
                const response = yield sp_1.sp.search({
                    Querytext: "*",
                    QueryTemplate: currentView.queryTemplate,
                    RowLimit: 500,
                    TrimDuplicates: false,
                    SelectProperties: ["Title", "Path", "SiteTitle", ...fields.map(f => f.managedPropertyName)],
                });
                const items = response.PrimarySearchResults
                    .map(searchRes => new Project_1.default(searchRes))
                    .sort((a, b) => Util_1.SortAlphabetically(a, b, "name"));
                const data = new ProjectStatsChart_1.ProjectStatsChartData(items);
                const charts = chartsSpItems.map(spItem => {
                    let chartFields = fields.filter(f => spItem[`GtChrFieldsId`].results.indexOf(f.id) !== -1);
                    return new ChartConfiguration_1.default(spItem, this.chartsConfigList, chartsConfigListContentTypes).initOrUpdate(data, chartFields);
                });
                const config = { charts, data, views, contentTypes, currentView };
                return config;
            }
            catch (err) {
                throw err;
            }
        });
    }
}
ProjectStats.displayName = "ProjectStats";
ProjectStats.defaultProps = IProjectStatsProps_1.ProjectStatsDefaultProps;
__decorate([
    Utilities_1.autobind
], ProjectStats.prototype, "onDataSelectionUpdated", null);
__decorate([
    Utilities_1.autobind
], ProjectStats.prototype, "onViewChanged", null);
exports.default = ProjectStats;
