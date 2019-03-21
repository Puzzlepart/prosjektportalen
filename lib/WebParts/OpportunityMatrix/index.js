"use strict";
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
const sp_1 = require("@pnp/sp");
const Resources_1 = require("../../Resources");
const Toggle_1 = require("office-ui-fabric-react/lib/Toggle");
const MessageBar_1 = require("office-ui-fabric-react/lib/MessageBar");
const Dropdown_1 = require("office-ui-fabric-react/lib/Dropdown");
const OpportunityMatrixCells_1 = require("./OpportunityMatrixCells");
const MatrixCellType_1 = require("../../Model/MatrixCellType");
const MatrixRow_1 = require("./MatrixRow");
const MatrixHeaderCell_1 = require("./MatrixHeaderCell");
const MatrixCell_1 = require("./MatrixCell");
const OpportunityElement_1 = require("./OpportunityElement");
const IOpportunityMatrixProps_1 = require("./IOpportunityMatrixProps");
const Util_1 = require("../../Util");
/**
 * Opportunity Matrix
 */
class OpportunityMatrix extends React.Component {
    /**
     * Constructor
     *
     * @param {IOpportunityMatrixProps} props Props
     */
    constructor(props) {
        super(props);
        this.state = { data: props.data };
        this._pnpList = sp_1.sp.web.lists.getByTitle(Resources_1.default.getResource("Lists_Uncertainties_Title"));
        this.onViewChanged = this.onViewChanged.bind(this);
        this.getViewOptions = this.getViewOptions.bind(this);
    }
    componentDidMount() {
        return __awaiter(this, void 0, void 0, function* () {
            let matrixCells = yield Util_1.loadJsonConfiguration("opportunity-matrix-cells");
            if (matrixCells == null || !matrixCells.length) {
                matrixCells = OpportunityMatrixCells_1.default;
            }
            if (this.state.data) {
                this.setState({ matrixCells });
            }
            else {
                const { data, selectedViewId } = yield this.fetchData();
                this.setState({
                    data,
                    hideLabels: this._tableElement.offsetWidth < this.props.hideLabelsBreakpoint,
                    selectedViewId,
                    matrixCells,
                });
            }
        });
    }
    /**
     * Renders the <OpportunityMatrix /> component
     */
    render() {
        const { data, selectedViewId, hideLabels } = this.state;
        let tableProps = { id: this.props.id };
        if (hideLabels) {
            tableProps.className = "hide-labels";
        }
        if (!data) {
            return (React.createElement("div", { className: this.props.className },
                React.createElement("table", Object.assign({}, tableProps, { ref: ele => this._tableElement = ele }))));
        }
        const opportunityItems = data.items.filter(i => i.ContentTypeId.indexOf(this.props.contentTypeId) !== -1);
        if (opportunityItems.length === 0) {
            if (this.props.showEmptyMessage) {
                return React.createElement(MessageBar_1.MessageBar, null, Resources_1.default.getResource("OpportunityMatrix_EmptyMessage"));
            }
            return null;
        }
        if (this.state.matrixCells) {
            const viewOptions = this.getViewOptions();
            return (React.createElement("div", { className: this.props.className },
                React.createElement("div", { hidden: !this.props.showViewSelector || viewOptions.length < 2 },
                    React.createElement(Dropdown_1.Dropdown, { label: Resources_1.default.getResource("OpportunityMatrix_ViewSelectorLabel"), defaultSelectedKey: selectedViewId, options: viewOptions, onChanged: opt => this.onViewChanged(opt.data.viewQuery) })),
                React.createElement("table", Object.assign({}, tableProps, { ref: ele => this._tableElement = ele }),
                    React.createElement("tbody", null, this.renderRows(opportunityItems))),
                React.createElement("div", null,
                    React.createElement(Toggle_1.Toggle, { defaultChecked: false, onChanged: isChecked => this.setState({ postAction: isChecked }), label: Resources_1.default.getResource("ProjectStatus_RiskShowPostActionLabel"), onText: Resources_1.default.getResource("String_Yes"), offText: Resources_1.default.getResource("String_No") }))));
        }
        return null;
    }
    /**
     * Render rows
     *
     * @param {any[]} opportunityItems Opportunity items
     */
    renderRows(opportunityItems) {
        const OpportunityMatrixRows = this.state.matrixCells.map((rows, i) => {
            let cells = rows.map((c, j) => {
                const cell = this.state.matrixCells[i][j], opportunityElements = this.getOpportunityElementsForCell(opportunityItems, cell), opportunityElementsPostAction = this.getOpportunityElementsPostActionForCell(opportunityItems, cell);
                switch (cell.cellType) {
                    case MatrixCellType_1.default.Cell: {
                        return (React.createElement(MatrixCell_1.default, { key: j, contents: [
                                ...opportunityElements,
                                ...opportunityElementsPostAction,
                            ], className: cell.className, style: cell.style }));
                    }
                    case MatrixCellType_1.default.Header: {
                        return (React.createElement(MatrixHeaderCell_1.default, { key: j, label: c.cellValue, className: cell.className }));
                    }
                }
            });
            return (React.createElement(MatrixRow_1.default, { key: i, cells: cells }));
        });
        return OpportunityMatrixRows;
    }
    /**
     * Helper function to get opportunity elements for cell post action
     *
     * @param {Array<any>} items Items
     * @param {IMatrixCell} cell The cell
     */
    getOpportunityElementsPostActionForCell(items, cell) {
        if (this.state.postAction) {
            const itemsForCell = items.filter(opportunity => cell.probability === parseInt(opportunity.GtRiskProbabilityPostAction, 10) && cell.consequence === parseInt(opportunity.GtRiskConsequencePostAction, 10));
            return itemsForCell.map((opportunity, key) => (React.createElement(OpportunityElement_1.default, { key: `OpportunityElement_PostAction_${key}`, item: opportunity, style: { opacity: this.state.postAction ? 0.5 : 1 } })));
        }
        return [];
    }
    /**
     * Helper function to get opportunity elements
     *
     * @param {Array<any>} items Items
     * @param {IMatrixCell} cell The cell
     */
    getOpportunityElementsForCell(items, cell) {
        const itemsForCell = items.filter(opportunity => cell.probability === parseInt(opportunity.GtRiskProbability, 10) && cell.consequence === parseInt(opportunity.GtRiskConsequence, 10));
        return itemsForCell.map((opportunity, key) => (React.createElement(OpportunityElement_1.default, { key: `OpportunityElement_${key}`, item: opportunity })));
    }
    /**
     * Transform SP list views to IDropdownOption[]
     */
    getViewOptions() {
        const { views } = this.state.data;
        if (views) {
            return views
                .filter(view => view.Title)
                .map(view => ({
                key: view.Id,
                text: view.Title,
                data: { viewQuery: view.ViewQuery },
            }));
        }
        else {
            return [];
        }
    }
    /**
     * On view changed
     *
     * @param {string} viewQuery View query
     */
    onViewChanged(viewQuery) {
        return __awaiter(this, void 0, void 0, function* () {
            let { data } = this.state;
            data.items = yield this._pnpList.getItemsByCAMLQuery(this.createCamlQuery(viewQuery));
            this.setState({ data });
        });
    }
    /**
     * Create CamlQuery
     *
     * @param {string} viewQuery View query
     */
    createCamlQuery(viewQuery) {
        return { ViewXml: `<View><Query>${viewQuery}</Query></View>` };
    }
    /**
     * Fetch data
     */
    fetchData() {
        return __awaiter(this, void 0, void 0, function* () {
            let { data } = this.state;
            if (!data) {
                data = { items: [] };
            }
            if (!data.views) {
                data.views = yield this._pnpList.views.select("Id", "Title", "DefaultView", "ViewQuery").get();
            }
            let [selectedView] = data.views.filter(view => view.DefaultView);
            data.items = yield this._pnpList.getItemsByCAMLQuery(this.createCamlQuery(selectedView.ViewQuery));
            return { data, selectedViewId: selectedView.Id };
        });
    }
}
OpportunityMatrix.displayName = "OpportunityMatrix";
OpportunityMatrix.defaultProps = IOpportunityMatrixProps_1.OpportunityMatrixDefaultProps;
exports.default = OpportunityMatrix;
