import * as React from "react";
import pnp, { List } from "sp-pnp-js";
import RESOURCE_MANAGER from "../../Resources";
import { Toggle } from "office-ui-fabric-react/lib/Toggle";
import { MessageBar } from "office-ui-fabric-react/lib/MessageBar";
import { Dropdown, IDropdownOption } from "office-ui-fabric-react/lib/Dropdown";
import RiskMatrixCells, { IRiskMatrixCell, RiskMatrixCellType } from "./RiskMatrixCells";
import MatrixRow from "./MatrixRow";
import MatrixHeaderCell from "./MatrixHeaderCell";
import MatrixCell from "./MatrixCell";
import RiskElement from "./RiskElement";
import IRiskMatrixData from "./IRiskMatrixData";
import IRiskMatrixProps, { RiskMatrixDefaultProps } from "./IRiskMatrixProps";
import IRiskMatrixState from "./IRiskMatrixState";


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
        this.onViewChanged = this.onViewChanged.bind(this);
        this.getViewOptions = this.getViewOptions.bind(this);
    }

    public async componentDidMount() {
        if (!this.state.data) {
            const { data, selectedViewId } = await this.fetchData();
            this.setState({
                data,
                hideLabels: this._tableElement.offsetWidth < 900,
                selectedViewId,
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

        const riskItems = data.items.filter(i => i.ContentTypeId.indexOf(this.props.contentTypeId) !== -1);

        if (riskItems.length === 0) {
            if (this.props.showEmptyMessage) {
                return <MessageBar>{RESOURCE_MANAGER.getResource("RiskMatrix_EmptyMessage")}</MessageBar>;
            }
            return null;
        }

        const viewOptions = this.getViewOptions();

        return (
            <div className={this.props.className}>
                <div hidden={!this.props.showViewSelector || viewOptions.length < 2}>
                    <Dropdown
                        label={RESOURCE_MANAGER.getResource("RiskMatrix_ViewSelectorLabel")}
                        defaultSelectedKey={selectedViewId}
                        options={viewOptions}
                        onChanged={opt => this.onViewChanged(opt.data.viewQuery)} />
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

    /**
     * Render rows
     *
     * @param {any[]} riskItems Risk items
     */
    private renderRows(riskItems) {
        const riskMatrixRows = RiskMatrixCells.map((rows, i) => {
            let cells = rows.map((c, j) => {
                const cell = RiskMatrixCells[i][j],
                    riskElements = this.getRiskElementsForCell(riskItems, cell),
                    riskElementsPostAction = this.getRiskElementsPostActionForCell(riskItems, cell);
                switch (cell.cellType) {
                    case RiskMatrixCellType.Cell: {
                        return (
                            <MatrixCell
                                key={j}
                                contents={[
                                    ...riskElements,
                                    ...riskElementsPostAction,
                                ]}
                                className={cell.className} />
                        );
                    }
                    case RiskMatrixCellType.Header: {
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
     * @param {Array<any>} items Items
     * @param {IRiskMatrixCell} cell The cell
     */
    private getRiskElementsPostActionForCell(items: any[], cell: IRiskMatrixCell) {
        if (this.state.postAction) {
            const itemsForCell = items.filter(risk => cell.probability === parseInt(risk.GtRiskProbabilityPostAction, 10) && cell.consequence === parseInt(risk.GtRiskConsequencePostAction, 10));
            return itemsForCell.map((risk, key) => (
                <RiskElement
                    key={`RiskElement_PostAction_${key}`}
                    item={risk}
                    style={{ opacity: this.state.postAction ? 0.5 : 1 }} />
            ));
        }
        return [];
    }

    /**
     * Helper function to get risk elements
     *
     * @param {Array<any>} items Items
     * @param {IRiskMatrixCell} cell The cell
     */
    private getRiskElementsForCell(items: any[], cell: IRiskMatrixCell) {
        const itemsForCell = items.filter(risk => cell.probability === parseInt(risk.GtRiskProbability, 10) && cell.consequence === parseInt(risk.GtRiskConsequence, 10));
        return itemsForCell.map((risk, key) => (
            <RiskElement
                key={`RiskElement_${key}`}
                item={risk} />
        ));
    }

    /**
     * Transform SP list views to IDropdownOption[]
     */
    private getViewOptions(): IDropdownOption[] {
        const { views } = this.state.data;
        if (views) {
            return views
                .filter(view => view.Title)
                .map(view => ({
                    key: view.Id,
                    text: view.Title,
                    data: { viewQuery: view.ViewQuery },
                }));
        } else {
            return [];
        }
    }

    /**
     * On view changed
     *
     * @param {string} viewQuery View query
     */
    private async onViewChanged(viewQuery: string) {
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
            data = { items: [] };
        }
        if (!data.views) {
            data.views = await this._pnpList.views.select("Id", "Title", "DefaultView", "ViewQuery").get();
        }
        let [selectedView] = data.views.filter(view => view.DefaultView);
        data.items = await this._pnpList.getItemsByCAMLQuery(this.createCamlQuery(selectedView.ViewQuery));

        return { data, selectedViewId: selectedView.Id };
    }
}

export {
    IRiskMatrixProps,
    IRiskMatrixState,
};
