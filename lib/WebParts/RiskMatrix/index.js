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
const Resources_1 = require("../../Resources");
const React = require("react");
const sp_1 = require("@pnp/sp");
const Toggle_1 = require("office-ui-fabric-react/lib/Toggle");
const MessageBar_1 = require("office-ui-fabric-react/lib/MessageBar");
const Dropdown_1 = require("office-ui-fabric-react/lib/Dropdown");
const Spinner_1 = require("office-ui-fabric-react/lib/Spinner");
const Utilities_1 = require("office-ui-fabric-react/lib/Utilities");
const RiskMatrixCells_1 = require("./RiskMatrixCells");
const MatrixCellType_1 = require("../../Model/MatrixCellType");
const MatrixRow_1 = require("./MatrixRow");
const MatrixHeaderCell_1 = require("./MatrixHeaderCell");
const MatrixCell_1 = require("./MatrixCell");
const RiskElement_1 = require("./RiskElement");
const RiskElementModel_1 = require("./RiskElementModel");
const IRiskMatrixProps_1 = require("./IRiskMatrixProps");
const List_1 = require("../@Components/List");
const Util_1 = require("../../Util");
const DataSource_1 = require("../DataSource");
/**
 * Risk Matrix
 */
class RiskMatrix extends React.Component {
    /**
     * Constructor
     *
     * @param {IRiskMatrixProps} props Props
     */
    constructor(props) {
        super(props);
        this.state = this.getInitState(props);
        this.uncertaintiesList = sp_1.sp.web.lists.getByTitle(Resources_1.default.getResource("Lists_Uncertainties_Title"));
        this.dataSourcesList = new sp_1.Site(_spPageContextInfo.siteAbsoluteUrl).rootWeb.lists.getByTitle(Resources_1.default.getResource("Lists_DataSources_Title"));
    }
    componentDidMount() {
        return __awaiter(this, void 0, void 0, function* () {
            let matrixCells = yield Util_1.loadJsonConfiguration("risk-matrix-cells");
            if (matrixCells == null || !matrixCells.length) {
                matrixCells = RiskMatrixCells_1.default;
            }
            if (this.state.data) {
                this.setState({ matrixCells });
            }
            else {
                const { data, selectedViewId } = yield this.fetchData();
                this.setState({
                    isLoading: false,
                    data,
                    hideLabels: this.tableElementRef.offsetWidth < this.props.hideLabelsBreakpoint,
                    selectedViewId,
                    matrixCells,
                });
            }
        });
    }
    /**
     * Renders the <RiskMatrix /> component
     */
    render() {
        const { id, className, loadingText, showViewSelector, dataSourceName, columns, } = this.props;
        const { isLoading, matrixCells, selectedViewId, hideLabels, } = this.state;
        let tableProps = { id };
        if (isLoading) {
            return (React.createElement("div", { className: className },
                React.createElement(Spinner_1.Spinner, { label: loadingText, size: Spinner_1.SpinnerSize.large }),
                React.createElement("table", Object.assign({}, tableProps, { ref: ele => this.tableElementRef = ele }))));
        }
        if (hideLabels) {
            tableProps.className = "hide-labels";
        }
        if (matrixCells) {
            const viewOptions = this.getViewOptions();
            const items = this.getItems();
            return (React.createElement("div", { className: className },
                React.createElement("div", { hidden: !showViewSelector || viewOptions.length < 2 },
                    React.createElement(Dropdown_1.Dropdown, { label: Resources_1.default.getResource("RiskMatrix_ViewSelectorLabel"), defaultSelectedKey: selectedViewId, options: viewOptions, onChanged: this.onViewChanged })),
                items.length === 0
                    ? (React.createElement("div", { style: { marginTop: 20 } },
                        React.createElement(MessageBar_1.MessageBar, null, Resources_1.default.getResource("RiskMatrix_EmptyMessage"))))
                    : (React.createElement("div", null,
                        React.createElement("div", null,
                            React.createElement("table", Object.assign({}, tableProps, { ref: ele => this.tableElementRef = ele }),
                                React.createElement("tbody", null, this.renderRows(items))),
                            React.createElement(Toggle_1.Toggle, { onChanged: postAction => this.setState({ postAction }), label: Resources_1.default.getResource("ProjectStatus_RiskShowPostActionLabel"), onText: Resources_1.default.getResource("String_Yes"), offText: Resources_1.default.getResource("String_No") })),
                        React.createElement("div", { hidden: !dataSourceName },
                            React.createElement(Dropdown_1.Dropdown, { label: Resources_1.default.getResource("String_Select_Project_Name"), defaultSelectedKey: "AllProjects", options: this.getProjectOptions(), onChanged: opt => this.setState({ selectedProject: opt }) }),
                            React.createElement(List_1.default, { items: items, columns: columns, webUrlKey: "webUrl", pathKey: "url", showCommandBar: false }))))));
        }
        return null;
    }
    /**
     * Get items
     */
    getItems() {
        const { selectedProject, data } = this.state;
        if (selectedProject && selectedProject.key !== "AllProjects") {
            return data.items.filter(i => i.siteTitle === selectedProject.text);
        }
        return data.items;
    }
    /**
     * Render rows
     *
     * @param {Array<RiskElementModel>} riskItems Risk items
     */
    renderRows(riskItems) {
        const { matrixCells } = this.state;
        const riskMatrixRows = matrixCells.map((rows, i) => {
            let cells = rows.map((c, j) => {
                const cell = matrixCells[i][j];
                const riskElements = this.getRiskElementsForCell(riskItems, cell);
                const riskElementsPostAction = this.getRiskElementsPostActionForCell(riskItems, cell);
                switch (cell.cellType) {
                    case MatrixCellType_1.default.Cell: {
                        return (React.createElement(MatrixCell_1.default, { key: `MatrixCell_${j}`, style: cell.style, className: cell.className },
                            riskElements,
                            riskElementsPostAction));
                    }
                    case MatrixCellType_1.default.Header: {
                        return (React.createElement(MatrixHeaderCell_1.default, { key: `MatrixHeaderCell_${j}`, label: c.cellValue, className: cell.className }));
                    }
                }
            });
            return (React.createElement(MatrixRow_1.default, { key: i }, cells));
        });
        return riskMatrixRows;
    }
    /**
     * Get initial state
     *
     * @param {IRiskMatrixProps} props Props
     */
    getInitState(props) {
        if (props.data) {
            return {
                isLoading: false,
                data: { items: this.mapSpItems(props.data.items) },
            };
        }
        else {
            return { isLoading: true };
        }
    }
    /**
     * Get risk elements for cell post action
     *
     * @param {Array<RiskElementModel>} riskItems Risk items
     * @param {IMatrixCell} cell The cell
     */
    getRiskElementsPostActionForCell(riskItems, cell) {
        if (!this.state.postAction) {
            return [];
        }
        const itemsForCell = riskItems.filter(risk => cell.probability === risk.probabilityPostAction && cell.consequence === risk.consequencePostAction);
        const riskElementsStyle = {};
        if (this.state.postAction && this.props.postActionShowOriginal) {
            riskElementsStyle.opacity = 0.5;
        }
        const riskElements = itemsForCell.map(risk => {
            return (React.createElement(RiskElement_1.default, { key: `${risk.getKey("PostAction")}`, model: risk, style: riskElementsStyle }));
        });
        return riskElements;
    }
    /**
     * Get risk elements
     *
     * @param {Array<RiskElementModel>} riskItems Risk items
     * @param {IMatrixCell} cell The cell
     */
    getRiskElementsForCell(riskItems, cell) {
        if (this.state.postAction && !this.props.postActionShowOriginal) {
            return [];
        }
        const itemsForCell = riskItems.filter(risk => cell.probability === risk.probability && cell.consequence === risk.consequence);
        const riskElements = itemsForCell.map(risk => {
            return React.createElement(RiskElement_1.default, { key: risk.getKey(), model: risk });
        });
        return riskElements;
    }
    /**
     * Get project options
     */
    getProjectOptions() {
        const projectOptions = this.state.data.items
            .map(i => i.siteTitle)
            .filter((value, index, self) => self.indexOf(value) === index)
            .map(p => ({ key: p, text: p }));
        return [
            { key: "AllProjects", text: Resources_1.default.getResource("String_AllProjects") },
            ...projectOptions,
        ];
    }
    /**
     * Transform SP list views to IDropdownOption[]
     */
    getViewOptions() {
        const { views } = this.state.data;
        if (views) {
            const viewOptions = views
                .filter(view => view.Title)
                .map(view => ({
                key: view.Id,
                text: view.Title,
                data: { viewQuery: view.ViewQuery },
            }));
            return viewOptions;
        }
        else {
            return [];
        }
    }
    /**
     * On view changed
     *
     * @param {IDropdownOption} opt Dropdown option
     */
    onViewChanged(opt) {
        return __awaiter(this, void 0, void 0, function* () {
            let { data } = this.state;
            const camlQuery = this.makeCamlQuery(opt.data.viewQuery);
            const spListItems = yield this.uncertaintiesList.getItemsByCAMLQuery(camlQuery);
            data.items = this.mapSpItems(spListItems);
            this.setState({ data });
        });
    }
    /**
     * Create CamlQuery
     *
     * @param {string} viewQuery View query
     */
    makeCamlQuery(viewQuery) {
        return { ViewXml: `<View><Query>${viewQuery}</Query></View>` };
    }
    /**
     * Map items to RiskElementModel
     *
     * @param {Array<any>} spListItems SP list items
     */
    mapSpItems(spListItems) {
        const riskItems = spListItems
            .filter(item => item.ContentTypeId.indexOf(this.props.contentTypeId) !== -1)
            .map(item => {
            return new RiskElementModel_1.default(item.ID, item.Title, item.GtRiskProbability, item.GtRiskConsequence, item.GtRiskProbabilityPostAction, item.GtRiskConsequencePostAction);
        });
        return riskItems;
    }
    /**
     * Fetch data
     */
    fetchData() {
        return __awaiter(this, void 0, void 0, function* () {
            const { dataSourceName, viewName } = this.props;
            const [dataSource] = yield this.dataSourcesList.items.filter(`Title eq '${dataSourceName}'`).get();
            let data = Object.assign({}, this.state.data);
            if (!data) {
                data = { items: [], views: null };
            }
            let selectedView;
            const query = dataSource ? dataSource.GtDpSearchQuery : "";
            const queryTemplate = (this.props.dataSource === DataSource_1.default.SearchCustom && this.props.queryTemplate) ? this.props.queryTemplate : query;
            if (queryTemplate !== "") {
                const spSearchItems = yield this.searchItems(queryTemplate);
                data.items = spSearchItems.map(item => {
                    const risk = new RiskElementModel_1.default(item.ListItemID, item.Title, item.GtRiskProbabilityOWSNMBR, item.GtRiskConsequenceOWSNMBR, item.GtRiskProbabilityPostActionOWSNMBR, item.GtRiskConsequencePostActionOWSNMBR);
                    risk.url = item.Path;
                    risk.webId = item.WebId;
                    risk.siteTitle = item.SiteTitle;
                    risk.webUrl = item.SPWebUrl;
                    risk.action = item.GtRiskActionOWSMTXT;
                    return risk;
                });
            }
            else {
                if (!data.views) {
                    data.views = yield this.uncertaintiesList.views.select("Id", "Title", "DefaultView", "ViewQuery").get();
                }
                if (viewName) {
                    [selectedView] = data.views.filter(view => view.Title === viewName);
                }
                else {
                    [selectedView] = data.views.filter(view => view.DefaultView);
                }
                const camlQuery = this.makeCamlQuery(selectedView.ViewQuery);
                const spListItems = yield this.uncertaintiesList.getItemsByCAMLQuery(camlQuery);
                data.items = this.mapSpItems(spListItems);
            }
            return { data, selectedViewId: selectedView ? selectedView.Id : null };
        });
    }
    /**
    * Fetch data from data source
    *
    * @param {string} queryTemplate Search query
    */
    searchItems(queryTemplate) {
        return __awaiter(this, void 0, void 0, function* () {
            const searchResults = yield sp_1.sp.search({
                Querytext: "*",
                RowLimit: this.props.rowLimit,
                TrimDuplicates: false,
                SelectProperties: [
                    "ListItemID",
                    "Path",
                    "SPWebUrl",
                    "WebId",
                    "Title",
                    "GtRiskProbabilityOWSNMBR",
                    "GtRiskConsequenceOWSNMBR",
                    "GtRiskProbabilityPostActionOWSNMBR",
                    "GtRiskConsequencePostActionOWSNMBR",
                    "GtRiskActionOWSMTXT",
                    "SiteTitle",
                ],
                QueryTemplate: queryTemplate,
            });
            return searchResults.PrimarySearchResults;
        });
    }
}
RiskMatrix.displayName = "RiskMatrix";
RiskMatrix.defaultProps = IRiskMatrixProps_1.RiskMatrixDefaultProps;
__decorate([
    Utilities_1.autobind
], RiskMatrix.prototype, "onViewChanged", null);
exports.default = RiskMatrix;
