import * as React from "react";
import pnp, { Site, List } from "sp-pnp-js";
import __ from "../../Resources";
import { Toggle } from "office-ui-fabric-react/lib/Toggle";
import { MessageBar } from "office-ui-fabric-react/lib/MessageBar";
import { Dropdown, IDropdownOption } from "office-ui-fabric-react/lib/Dropdown";
import { Spinner, SpinnerSize } from "office-ui-fabric-react/lib/Spinner";
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
    private _uncertaintiesList: List;
    private _dataSourcesList: List;
    /**
     * Constructor
     *
     * @param {IRiskMatrixProps} props Props
     */
    constructor(props: IRiskMatrixProps) {
        super(props);
        this.state = this._getInitialState(props);
        this._uncertaintiesList = pnp.sp.web.lists.getByTitle(__.getResource("Lists_Uncertainties_Title"));
        this._dataSourcesList = new Site(_spPageContextInfo.siteAbsoluteUrl).rootWeb.lists.getByTitle(__.getResource("Lists_DataSources_Title"));
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
                isLoading: false,
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
        const { isLoading, data, selectedViewId, hideLabels } = this.state;

        let tableProps: React.HTMLAttributes<HTMLElement> = { id: this.props.id };

        if (isLoading) {
            return (
                <div className={this.props.className}>
                    <Spinner size={SpinnerSize.large} />
                    <table {...tableProps} ref={ele => this._tableElement = ele}></table>
                </div>
            );
        }

        if (hideLabels) {
            tableProps.className = "hide-labels";
        }

        if (data.items.length === 0) {
            if (this.props.showEmptyMessage) {
                return <MessageBar>{__.getResource("RiskMatrix_EmptyMessage")}</MessageBar>;
            }
            return null;
        }

        if (this.state.matrixCells) {
            const viewOptions = this._getViewOptions();

            return (
                <div className={this.props.className}>
                    <div hidden={!this.props.showViewSelector || viewOptions.length < 2}>
                        <Dropdown
                            label={__.getResource("RiskMatrix_ViewSelectorLabel")}
                            defaultSelectedKey={selectedViewId}
                            options={viewOptions}
                            onChanged={this._onViewChanged} />
                    </div>
                    <table {...tableProps} ref={ele => this._tableElement = ele}>
                        <tbody>
                            {this.renderRows(data.items)}
                        </tbody>
                    </table>
                    <div>
                        <Toggle
                            onChanged={postAction => this.setState({ postAction })}
                            label={__.getResource("ProjectStatus_RiskShowPostActionLabel")}
                            onText={__.getResource("String_Yes")}
                            offText={__.getResource("String_No")} />
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
                isLoading: false,
                data: {
                    items: props.data ? this._mapSpListItems(props.data.items) : [],
                },
            };
        } else {
            return { isLoading: true };
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
     * @param {IDropdownOption} opt Dropdown option
     */
    @autobind
    protected async _onViewChanged(opt: IDropdownOption) {
        let { data } = this.state;
        const camlQuery = this._createCamlQuery(opt.data.viewQuery);
        const spListItems = await this._uncertaintiesList.getItemsByCAMLQuery(camlQuery);
        data.items = this._mapSpListItems(spListItems);
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
     * Map items to RiskElementModel
     *
     * @param {Array<any>} spListItems SP list items
     */
    protected _mapSpListItems(spListItems: Array<any>): Array<RiskElementModel> {
        const riskItems: Array<RiskElementModel> = spListItems
            .filter(item => item.ContentTypeId.indexOf(this.props.contentTypeId) !== -1)
            .map(item => {
                return new RiskElementModel(item.ID, item.Title, item.GtRiskProbability, item.GtRiskConsequence, item.GtRiskProbabilityPostAction, item.GtRiskConsequencePostAction);
            });
        return riskItems;
    }

    /**
     * Fetch data
     */
    protected async _fetchData(): Promise<{ data: IRiskMatrixData, selectedViewId?: string }> {
        let { data } = this.state;

        if (!data) {
            data = {
                items: [],
                views: null,
            };
        }
        let selectedView;

        if (this.props.dataSource) {
            const spSearchItems = await this._fetchFromDataSource(this.props.dataSource);
            data.items = spSearchItems.map(item => {
                const risk = new RiskElementModel(item.ListItemID, item.Title, item.GtRiskProbabilityOWSNMBR, item.GtRiskConsequenceOWSNMBR, item.GtRiskProbabilityPostActionOWSNMBR, item.GtRiskConsequencePostActionOWSNMBR);
                risk.url = item.Path;
                risk.webId = item.WebId;
                risk.siteTitle = item.SiteTitle;
                return risk;
            });
        } else {
            if (!data.views) {
                data.views = await this._uncertaintiesList.views.select("Id", "Title", "DefaultView", "ViewQuery").get();
            }
            if (this.props.viewName) {
                [selectedView] = data.views.filter(view => view.Title === this.props.viewName);
            } else {
                [selectedView] = data.views.filter(view => view.DefaultView);
            }
            const camlQuery = this._createCamlQuery(selectedView.ViewQuery);
            const spListItems = await this._uncertaintiesList.getItemsByCAMLQuery(camlQuery);
            data.items = this._mapSpListItems(spListItems);
        }

        return { data, selectedViewId: selectedView ? selectedView.Id : null };
    }

    /**
    * Fetch data from data source
    *
    * @param {string} name Data source name
    */
    protected async _fetchFromDataSource(name: string): Promise<Array<any>> {
        const [dataSource] = await this._dataSourcesList.items.filter(`Title eq '${name}'`).get();
        if (dataSource) {
            const searchResults = await pnp.sp.search({
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
            return searchResults.PrimarySearchResults;
        } else {
            return [];
        }
    }
}

export {
    IRiskMatrixProps,
    IRiskMatrixState,
};
