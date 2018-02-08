import * as React from "react";
import pnp from "sp-pnp-js";
import RESOURCE_MANAGER from "../../@localization";
import { Toggle } from "office-ui-fabric-react/lib/Toggle";
import { MessageBar } from "office-ui-fabric-react/lib/MessageBar";
import RiskMatrixCells, { IRiskMatrixCell, RiskMatrixCellType } from "./RiskMatrixCells";
import MatrixRow from "./MatrixRow";
import MatrixHeaderCell from "./MatrixHeaderCell";
import MatrixCell from "./MatrixCell";
import RiskElement from "./RiskElement";
import IRiskMatrixProps, { RiskMatrixDefaultProps } from "./IRiskMatrixProps";
import IRiskMatrixState from "./IRiskMatrixState";


/**
 * Risk Matrix
 */
export default class RiskMatrix extends React.PureComponent<IRiskMatrixProps, IRiskMatrixState> {
    public static displayName = "RiskMatrix";
    public static defaultProps = RiskMatrixDefaultProps;
    private tableElement: HTMLTableElement;

    /**
     * Constructor
     */
    constructor(props: IRiskMatrixProps) {
        super(props);
        this.state = { data: props.data || null };
    }

    public async componentDidMount() {
        if (!this.state.data) {
            let updatedState: Partial<IRiskMatrixState> = {};
            updatedState.data = await this.fetchData();
            updatedState.hideLabels = this.tableElement.offsetWidth < 900;
            this.setState(updatedState);
        }
    }

    public render(): JSX.Element {
        let tableProps: React.HTMLAttributes<HTMLElement> = { id: this.props.id };

        if (this.state.hideLabels) {
            tableProps.className = "hide-labels";
        }
        if (!this.state.data) {
            return (
                <div className={this.props.className}>
                    <table { ...tableProps } ref={ele => this.tableElement = ele}></table>
                </div>
            );
        }

        const items = this.state.data.filter(i => i.ContentTypeId.indexOf(this.props.contentTypeId) !== -1);

        if (items.length === 0) {
            if (this.props.showEmptyMessage) {
                return <MessageBar>{RESOURCE_MANAGER.getResource("RiskMatrix_EmptyMessage")}</MessageBar>;
            }
            return null;
        }


        return (
            <div className={this.props.className}>
                <table { ...tableProps } ref={ele => this.tableElement = ele}>
                    <tbody>
                        {this._renderRows(items)}
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

    private _renderRows(items) {
        const riskMatrixRows = RiskMatrixCells.map((rows, i) => {
            let cells = rows.map((c, j) => {
                const cell = RiskMatrixCells[i][j],
                    riskElements = this.getRiskElementsForCell(items, cell),
                    riskElementsPostAction = this.getRiskElementsPostActionForCell(items, cell);
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

    private async fetchData(): Promise<any[]> {
        const list = pnp.sp.web.lists.getByTitle(RESOURCE_MANAGER.getResource("Lists_Uncertainties_Title"));
        const items = await list.items.get();
        return items;
    }
}

export {
    IRiskMatrixProps,
    IRiskMatrixState,
};
