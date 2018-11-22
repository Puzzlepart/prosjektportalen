import * as React from "react";
import { sp, List } from "@pnp/sp";
import __ from "../../Resources";
import { Toggle } from "office-ui-fabric-react/lib/Toggle";
import { MessageBar } from "office-ui-fabric-react/lib/MessageBar";
import { Dropdown, IDropdownOption } from "office-ui-fabric-react/lib/Dropdown";
import OpportunityMatrixCells from "./OpportunityMatrixCells";
import MatrixCellType from "../../Model/MatrixCellType";
import IMatrixCell from "../../Model/IMatrixCell";
import MatrixRow from "./MatrixRow";
import MatrixHeaderCell from "./MatrixHeaderCell";
import MatrixCell from "./MatrixCell";
import OpportunityElement from "./OpportunityElement";
import IOpportunityMatrixData from "./IOpportunityMatrixData";
import IOpportunityMatrixProps, { OpportunityMatrixDefaultProps } from "./IOpportunityMatrixProps";
import IOpportunityMatrixState from "./IOpportunityMatrixState";
import { loadJsonConfiguration } from "../../Util";


/**
 * Opportunity Matrix
 */
export default class OpportunityMatrix extends React.Component<IOpportunityMatrixProps, IOpportunityMatrixState> {
    public static displayName = "OpportunityMatrix";
    public static defaultProps = OpportunityMatrixDefaultProps;
    private _tableElement: HTMLTableElement;
    private _pnpList: List;

    /**
     * Constructor
     *
     * @param {IOpportunityMatrixProps} props Props
     */
    constructor(props: IOpportunityMatrixProps) {
        super(props);
        this.state = { data: props.data };
        this._pnpList = sp.web.lists.getByTitle(__.getResource("Lists_Uncertainties_Title"));
        this.onViewChanged = this.onViewChanged.bind(this);
        this.getViewOptions = this.getViewOptions.bind(this);
    }

    public async componentDidMount() {
        let matrixCells = await loadJsonConfiguration<Array<IMatrixCell[]>>("opportunity-matrix-cells");
        if (matrixCells == null || !matrixCells.length) {
            matrixCells = OpportunityMatrixCells;
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
     * Renders the <OpportunityMatrix /> component
     */
    public render(): React.ReactElement<IOpportunityMatrixProps> {
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

        const opportunityItems = data.items.filter(i => i.ContentTypeId.indexOf(this.props.contentTypeId) !== -1);

        if (opportunityItems.length === 0) {
            if (this.props.showEmptyMessage) {
                return <MessageBar>{__.getResource("OpportunityMatrix_EmptyMessage")}</MessageBar>;
            }
            return null;
        }

        if (this.state.matrixCells) {
            const viewOptions = this.getViewOptions();

            return (
                <div className={this.props.className}>
                    <div hidden={!this.props.showViewSelector || viewOptions.length < 2}>
                        <Dropdown
                            label={__.getResource("OpportunityMatrix_ViewSelectorLabel")}
                            defaultSelectedKey={selectedViewId}
                            options={viewOptions}
                            onChanged={opt => this.onViewChanged(opt.data.viewQuery)} />
                    </div>
                    <table {...tableProps} ref={ele => this._tableElement = ele}>
                        <tbody>
                            {this.renderRows(opportunityItems)}
                        </tbody>
                    </table>
                    <div>
                        <Toggle
                            defaultChecked={false}
                            onChanged={isChecked => this.setState({ postAction: isChecked })}
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
     * @param {any[]} opportunityItems Opportunity items
     */
    private renderRows(opportunityItems: any[]) {
        const OpportunityMatrixRows = this.state.matrixCells.map((rows, i) => {
            let cells = rows.map((c, j) => {
                const cell = this.state.matrixCells[i][j],
                    opportunityElements = this.getOpportunityElementsForCell(opportunityItems, cell),
                    opportunityElementsPostAction = this.getOpportunityElementsPostActionForCell(opportunityItems, cell);
                switch (cell.cellType) {
                    case MatrixCellType.Cell: {
                        return (
                            <MatrixCell
                                key={j}
                                contents={[
                                    ...opportunityElements,
                                    ...opportunityElementsPostAction,
                                ]}
                                className={cell.className}
                                style={cell.style} />
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
        return OpportunityMatrixRows;
    }

    /**
     * Helper function to get opportunity elements for cell post action
     *
     * @param {Array<any>} items Items
     * @param {IMatrixCell} cell The cell
     */
    private getOpportunityElementsPostActionForCell(items: any[], cell: IMatrixCell) {
        if (this.state.postAction) {
            const itemsForCell = items.filter(opportunity => cell.probability === parseInt(opportunity.GtRiskProbabilityPostAction, 10) && cell.consequence === parseInt(opportunity.GtRiskConsequencePostAction, 10));
            return itemsForCell.map((opportunity, key) => (
                <OpportunityElement
                    key={`OpportunityElement_PostAction_${key}`}
                    item={opportunity}
                    style={{ opacity: this.state.postAction ? 0.5 : 1 }} />
            ));
        }
        return [];
    }

    /**
     * Helper function to get opportunity elements
     *
     * @param {Array<any>} items Items
     * @param {IMatrixCell} cell The cell
     */
    private getOpportunityElementsForCell(items: any[], cell: IMatrixCell) {
        const itemsForCell = items.filter(opportunity => cell.probability === parseInt(opportunity.GtRiskProbability, 10) && cell.consequence === parseInt(opportunity.GtRiskConsequence, 10));
        return itemsForCell.map((opportunity, key) => (
            <OpportunityElement
                key={`OpportunityElement_${key}`}
                item={opportunity} />
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
    private async fetchData(): Promise<{ data: IOpportunityMatrixData, selectedViewId?: string }> {
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
    IOpportunityMatrixProps,
    IOpportunityMatrixState,
};
