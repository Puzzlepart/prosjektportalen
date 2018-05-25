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
        this.state = { data: props.data };
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
            const { data, selectedViewId } = await this.fetchData();
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

        // const riskItems = data.items.filter(i => i.ContentTypeId.indexOf(this.props.contentTypeId) !== -1);
        const riskItems = data.items;

        if (riskItems.length === 0) {
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
                            {this.renderRows(riskItems)}
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
    private renderRows(riskItems: Array<RiskElementModel>) {
        const riskMatrixRows = this.state.matrixCells.map((rows, i) => {
            let cells = rows.map((c, j) => {
                const cell = this.state.matrixCells[i][j],
                    riskElements = this.getRiskElementsForCell(riskItems, cell),
                    riskElementsPostAction = this.getRiskElementsPostActionForCell(riskItems, cell);
                switch (cell.cellType) {
                    case MatrixCellType.Cell: {
                        return (
                            <MatrixCell
                                key={j}
                                contents={[
                                    ...riskElements,
                                    ...riskElementsPostAction,
                                ]}
                                style={cell.style}
                                className={cell.className} />
                        );
                    }
                    case MatrixCellType.Header: {
                        return (
                            <MatrixHeaderCell
                                key={j}
                                label={c.cellValue}
                                className={cell.className} />
                        );
                    }
                }
            });
            return (
                <MatrixRow
                    key={i}
                    cells={cells} />
            );
        });
        return riskMatrixRows;
    }

    /**
     * Helper function to get risk elements for cell post action
     *
     * @param {Array<RiskElementModel>} items Items
     * @param {IMatrixCell} cell The cell
     */
    private getRiskElementsPostActionForCell(items: Array<RiskElementModel>, cell: IMatrixCell) {
        if (this.state.postAction) {
            const itemsForCell = items.filter(risk => cell.probability === risk.probabilityPostAction && cell.consequence === risk.consequencePostAction);
            return itemsForCell.map((risk, key) => (
                <RiskElement
                    key={`RiskElement_PostAction_${key}`}
                    model={risk}
                    style={{ opacity: this.state.postAction ? 0.5 : 1 }} />
            ));
        }
        return [];
    }

    /**
     * Helper function to get risk elements
     *
     * @param {Array<RiskElementModel>} items Items
     * @param {IMatrixCell} cell The cell
     */
    private getRiskElementsForCell(items: Array<RiskElementModel>, cell: IMatrixCell) {
        const itemsForCell = items.filter(risk => cell.probability === risk.probability && cell.consequence === risk.consequence);
        return itemsForCell.map((risk, key) => (
            <RiskElement
                key={`RiskElement_${key}`}
                model={risk} />
        ));
    }

    /**
     * Transform SP list views to IDropdownOption[]
     */
    private _getViewOptions(): IDropdownOption[] {
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
    private async _onViewChanged(viewQuery: string) {
        let { data } = this.state;
        data.items = await this._pnpList.getItemsByCAMLQuery(this.createCamlQuery(viewQuery));
        this.setState({ data });
    }

    /**
     * Create CamlQuery
     *
     * @param {string} viewQuery View query
     */
    private createCamlQuery(viewQuery: string) {
        return { ViewXml: `<View><Query>${viewQuery}</Query></View>` };
    }

    /**
     * Fetch data
     */
    private async fetchData(): Promise<{ data: IRiskMatrixData, selectedViewId?: string }> {
        let { data } = this.state;
        if (!data) {
            data = { items: [], views: [] };
        }
        let selectedView = { Id: "", ViewQuery: "" };

        if (this.props.dataSource) {
            const rootWeb = new Site(_spPageContextInfo.siteAbsoluteUrl).rootWeb;
            const dataSourcesList = rootWeb.lists.getByTitle(RESOURCE_MANAGER.getResource("Lists_DataSources_Title"));
            const [dataSource] = await dataSourcesList.items.filter(`Title eq '${this.props.dataSource}'`).get();
            const response = await pnp.sp.search({
                Querytext: "*",
                RowLimit: 10,
                TrimDuplicates: false,
                SelectProperties: ["ListItemID", "Path", "Title", "GtRiskProbabilityOWSNMBR", "GtRiskConsequenceOWSNMBR", "GtRiskProbabilityPostActionOWSNMBR", "GtRiskConsequencePostActionOWSNMBR"],
                QueryTemplate: dataSource.GtDpSearchQuery,
            });
            data.items = response.PrimarySearchResults.map((item: any) => {
                return new RiskElementModel(item.ListItemID, item.Title, item.GtRiskProbabilityOWSNMBR, item.GtRiskConsequenceOWSNMBR, item.GtRiskProbabilityPostActionOWSNMBR, item.GtRiskConsequencePostActionOWSNMBR, item.Path);
            });
        } else {
            if (!data.views) {
                data.views = await this._pnpList.views.select("Id", "Title", "DefaultView", "ViewQuery").get();
            }
            [selectedView] = data.views.filter(view => view.DefaultView);
            const spListItems = await this._pnpList.getItemsByCAMLQuery(this.createCamlQuery(selectedView.ViewQuery));
            data.items = spListItems.map(item => {
                return new RiskElementModel(item.ID, item.Title, item.GtRiskProbability, item.GtRiskConsequence, item.GtRiskProbabilityPostAction, item.GtRiskConsequencePostAction);
            });
        }

        return { data, selectedViewId: selectedView.Id };
    }
}

export {
    IRiskMatrixProps,
    IRiskMatrixState,
};
