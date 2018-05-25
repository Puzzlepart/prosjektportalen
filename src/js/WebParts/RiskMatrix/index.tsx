import * as React from "react";
import pnp, { Site, List } from "sp-pnp-js";
import RESOURCE_MANAGER from "../../Resources";
import { Toggle } from "office-ui-fabric-react/lib/Toggle";
import { MessageBar } from "office-ui-fabric-react/lib/MessageBar";
import { Dropdown, IDropdownOption } from "office-ui-fabric-react/lib/Dropdown";
import { autobind } from "office-ui-fabric-react/lib/Utilities";
import RiskMatrixCells from "./RiskMatrixCells";
import MatrixCellType from "../../Model/MatrixCellType";
import IMatrixCell from "../../Model/IMatrixCell";
import MatrixRow from "./MatrixRow";
import MatrixHeaderCell from "./MatrixHeaderCell";
import MatrixCell from "./MatrixCell";
import RiskElement from "./RiskElement";
import RiskElementModel from "./RiskElementModel";
import IRiskMatrixData from "./IRiskMatrixData";
import IRiskMatrixProps, { RiskMatrixDefaultProps } from "./IRiskMatrixProps";
import IRiskMatrixState from "./IRiskMatrixState";
import { loadJsonConfiguration } from "../../Util";

/**
 * Risk Matrix
 */
export default class RiskMatrix extends React.Component<IRiskMatrixProps, IRiskMatrixState> {
    public static displayName = "RiskMatrix";
    public static defaultProps = RiskMatrixDefaultProps;
    private _tableElement: HTMLTableElement;
    private _pnpList: List;

    /**
     * Constructor
     *
     * @param {IRiskMatrixProps} props Props
     */
    constructor(props: IRiskMatrixProps) {
        super(props);
        this.state = this._getInitialState(props);
        this._pnpList = pnp.sp.web.lists.getByTitle(RESOURCE_MANAGER.getResource("Lists_Uncertainties_Title"));

    }

    public async componentDidMount() {
        let matrixCells = await loadJsonConfiguration<Array<IMatrixCell[]>>("risk-matrix-cells");
        if (matrixCells == null || !matrixCells.length) {
            matrixCells = RiskMatrixCells;
        }
        if (this.state.data) {
            this.setState({ matrixCells });
        } else {
            const { data, selectedViewId } = await this._fetchData();
            this.setState({
                data,
                hideLabels: this._tableElement.offsetWidth < this.props.hideLabelsBreakpoint,
                selectedViewId,
                matrixCells,
            });
        }
    }

    /**
     * Renders the <RiskMatrix /> component
     */
    public render(): React.ReactElement<IRiskMatrixProps> {
        const { data, selectedViewId, hideLabels } = this.state;
        let tableProps: React.HTMLAttributes<HTMLElement> = { id: this.props.id };

        if (hideLabels) {
            tableProps.className = "hide-labels";
        }
        if (!data) {
            return (
                <div className={this.props.className}>
                    <table {...tableProps} ref={ele => this._tableElement = ele}></table>
                </div>
            );
        }

        if (data.items.length === 0) {
            if (this.props.showEmptyMessage) {
                return <MessageBar>{RESOURCE_MANAGER.getResource("RiskMatrix_EmptyMessage")}</MessageBar>;
            }
            return null;
        }

        if (this.state.matrixCells) {
            const viewOptions = this._getViewOptions();

            return (
                <div className={this.props.className}>
                    <div hidden={!this.props.showViewSelector || viewOptions.length < 2}>
                        <Dropdown
                            label={RESOURCE_MANAGER.getResource("RiskMatrix_ViewSelectorLabel")}
                            defaultSelectedKey={selectedViewId}
                            options={viewOptions}
                            onChanged={opt => this._onViewChanged(opt.data.viewQuery)} />
                    </div>
                    <table {...tableProps} ref={ele => this._tableElement = ele}>
                        <tbody>
                            {this.renderRows(data.items)}
                        </tbody>
                    </table>
                    <div>
                        <Toggle
                            defaultChecked={false}
                            onChanged={isChecked => this.setState({ postAction: isChecked })}
                            label={RESOURCE_MANAGER.getResource("ProjectStatus_RiskShowPostActionLabel")}
                            onText={RESOURCE_MANAGER.getResource("String_Yes")}
                            offText={RESOURCE_MANAGER.getResource("String_No")} />
                    </div>
                </div>
            );
        }
        return null;
    }

    /**
     * Render rows
     *
     * @param {Array<RiskElementModel>} riskItems Risk items
     */
    protected renderRows(riskItems: Array<RiskElementModel>) {
        const { matrixCells } = this.state;
        const riskMatrixRows = matrixCells.map((rows, i) => {
            let cells = rows.map((c, j) => {
                const cell = matrixCells[i][j],
                    riskElements = this.getRiskElementsForCell(riskItems, cell),
                    riskElementsPostAction = this.getRiskElementsPostActionForCell(riskItems, cell);
                switch (cell.cellType) {
                    case MatrixCellType.Cell: {
                        return (
                            <MatrixCell
                                key={`MatrixCell_${j}`}
                                style={cell.style}
                                className={cell.className}>
                                {riskElements}
                                {riskElementsPostAction}
                            </MatrixCell>
                        );
                    }
                    case MatrixCellType.Header: {
                        return (
                            <MatrixHeaderCell
                                key={`MatrixHeaderCell_${j}`}
                                label={c.cellValue}
                                className={cell.className} />
                        );
                    }
                }
            });
            return (
                <MatrixRow key={i}>
                    {cells}
                </MatrixRow>
            );
        });
        return riskMatrixRows;
    }

    /**
     * Get initial state
     *
     * @param {IRiskMatrixProps} props Props
     */
    protected _getInitialState(props: IRiskMatrixProps) {
        if (props.data) {
            return {
                data: {
                    items: props.data ? this._mapSpListItems(props.data.items) : [],
                },
            };
        } else {
            return {};
        }
    }

    /**
     * Helper function to get risk elements for cell post action
     *
     * @param {Array<RiskElementModel>} riskItems Risk items
     * @param {IMatrixCell} cell The cell
     */
    protected getRiskElementsPostActionForCell(riskItems: Array<RiskElementModel>, cell: IMatrixCell) {
        if (this.state.postAction) {
            const itemsForCell = riskItems.filter(risk => cell.probability === risk.probabilityPostAction && cell.consequence === risk.consequencePostAction);
            return itemsForCell.map((risk, key) => <RiskElement key={`${risk.getKey("PostAction")}`} model={risk} style={{ opacity: this.state.postAction ? 0.5 : 1 }} />);
        }
        return [];
    }

    /**
     * Helper function to get risk elements
     *
     * @param {Array<RiskElementModel>} riskItems Risk items
     * @param {IMatrixCell} cell The cell
     */
    protected getRiskElementsForCell(riskItems: Array<RiskElementModel>, cell: IMatrixCell) {
        const itemsForCell = riskItems.filter(risk => cell.probability === risk.probability && cell.consequence === risk.consequence);
        return itemsForCell.map((risk, key) => <RiskElement key={risk.getKey()} model={risk} />);
    }

    /**
     * Transform SP list views to IDropdownOption[]
     */
    protected _getViewOptions(): IDropdownOption[] {
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
        } else {
            return [];
        }
    }

    /**
     * On view changed
     *
     * @param {string} viewQuery View query
     */
    @autobind
    protected async _onViewChanged(viewQuery: string) {
        let { data } = this.state;
        data.items = await this._pnpList.getItemsByCAMLQuery(this._createCamlQuery(viewQuery));
        this.setState({ data });
    }

    /**
     * Create CamlQuery
     *
     * @param {string} viewQuery View query
     */
    protected _createCamlQuery(viewQuery: string) {
        return { ViewXml: `<View><Query>${viewQuery}</Query></View>` };
    }

    /**
     * Map items
     *
     * @param {Array<any>} spListItems SP list items
     */
    protected _mapSpListItems(spListItems: Array<any>): Array<RiskElementModel> {
        return spListItems
            .filter(item => item.ContentTypeId.indexOf(this.props.contentTypeId) !== -1)
            .map(item => {
                return new RiskElementModel(item.ID, item.Title, item.GtRiskProbability, item.GtRiskConsequence, item.GtRiskProbabilityPostAction, item.GtRiskConsequencePostAction);
            });
    }

    /**
     * Fetch data
     */
    protected async _fetchData(): Promise<{ data: IRiskMatrixData, selectedViewId?: string }> {
        const { dataSource } = this.props;
        let { data } = this.state;

        if (!data) {
            data = { items: [], views: [] };
        }
        let selectedView = { Id: "", ViewQuery: "" };

        if (dataSource) {
            const spSearchItems = await this._fetchFromDataSource(dataSource);
            data.items = spSearchItems.map(item => {
                const risk = new RiskElementModel(item.ListItemID, item.Title, item.GtRiskProbabilityOWSNMBR, item.GtRiskConsequenceOWSNMBR, item.GtRiskProbabilityPostActionOWSNMBR, item.GtRiskConsequencePostActionOWSNMBR);
                risk.url = item.Path;
                risk.webId = item.WebId;
                risk.siteTitle = item.SiteTitle;
                return risk;
            });
        } else {
            if (!data.views) {
                data.views = await this._pnpList.views.select("Id", "Title", "DefaultView", "ViewQuery").get();
            }
            [selectedView] = data.views.filter(view => view.DefaultView);
            const spListItems = await this._pnpList.getItemsByCAMLQuery(this._createCamlQuery(selectedView.ViewQuery));
            data.items = this._mapSpListItems(spListItems);
        }

        return { data, selectedViewId: selectedView.Id };
    }

    /**
    * Fetch data from data source
    *
    * @param {string} name Data source name
    */
    protected async _fetchFromDataSource(name: string): Promise<Array<any>> {
        const rootWeb = new Site(_spPageContextInfo.siteAbsoluteUrl).rootWeb;
        const dataSourcesList = rootWeb.lists.getByTitle(RESOURCE_MANAGER.getResource("Lists_DataSources_Title"));
        const [dataSource] = await dataSourcesList.items.filter(`Title eq '${name}'`).get();
        const response = await pnp.sp.search({
            Querytext: "*",
            RowLimit: this.props.rowLimit,
            TrimDuplicates: false,
            SelectProperties: [
                "ListItemID",
                "Path",
                "WebId",
                "Title",
                "GtRiskProbabilityOWSNMBR",
                "GtRiskConsequenceOWSNMBR",
                "GtRiskProbabilityPostActionOWSNMBR",
                "GtRiskConsequencePostActionOWSNMBR",
                "SiteTitle",
            ],
            QueryTemplate: dataSource.GtDpSearchQuery,
        });
        return response.PrimarySearchResults;
    }
}

export {
    IRiskMatrixProps,
    IRiskMatrixState,
};
