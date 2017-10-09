import * as React from "react";
import pnp from "sp-pnp-js";
import RESOURCE_MANAGER from "localization";
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

    /**
     * Constructor
     */
    constructor(props: IRiskMatrixProps) {
        super(props);
        this.state = { data: props.data || null };
    }

    public async componentDidMount() {
        if (!this.state.data) {
            const list = pnp.sp.web.lists.getByTitle(RESOURCE_MANAGER.getResource("Lists_Uncertainties_Title"));
            const items = await list.items.get();
            this.setState({ data: items });
        }
    }

    public shouldComponentUpdate(nextProps: IRiskMatrixProps, nextState: IRiskMatrixState) {
        return nextState.data !== null;
    }

    /**
     * Renders the component
     */
    public render(): JSX.Element {
        if (!this.state.data) {
            return null;
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
                <table id={this.props.id}>
                    <tbody>
                        {this._renderRows(items)}
                    </tbody>
                </table>
                <Toggle
                    defaultChecked={false}
                    onChanged={isChecked => this.setState({ postAction: isChecked })}
                    label={RESOURCE_MANAGER.getResource("ProjectStatus_RiskShowPostActionLabel")}
                    onText={RESOURCE_MANAGER.getResource("String_Yes")}
                    offText={RESOURCE_MANAGER.getResource("String_No")} />
            </div>
        );
    }

    private _renderRows(items) {
        const riskMatrixRows = RiskMatrixCells.map((rows, i) => {
            let cells = rows.map((c, j) => {
                const cell = RiskMatrixCells[i][j],
                    riskElements = this.getRiskElementsForCell(items, cell).map((risk, key) => (
                        <RiskElement
                            key={`${key}`}
                            item={risk}
                            style={{ opacity: this.state.postAction ? 0.5 : 1 }} />
                    )),
                    riskElementsPostAction = this.getRiskElementsPostActionForCell(items, cell).map((risk, key) => (
                        <RiskElement
                            key={`${key}_PostAction`}
                            item={risk} />
                    ));
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
                        if (this.props.showHeaders) {
                            return (
                                <MatrixHeaderCell
                                    key={j}
                                    label={c.cellValue}
                                    className={cell.className} />
                            );
                        }
                        return null;
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
    private getRiskElementsPostActionForCell = (items: any[], cell: IRiskMatrixCell) => {
        if (this.state.postAction) {
            return items.filter(risk => cell.probability === parseInt(risk.GtRiskProbabilityPostAction, 10) && cell.consequence === parseInt(risk.GtRiskConsequencePostAction, 10));
        }
        return [];
    }

    /**
     * Helper function to get risk elements
     *
     * @param {Array<any>} items Items
     * @param {IRiskMatrixCell} cell The cell
     */
    private getRiskElementsForCell = (items: any[], cell: IRiskMatrixCell) => {
        return items.filter(risk => cell.probability === parseInt(risk.GtRiskProbability, 10) && cell.consequence === parseInt(risk.GtRiskConsequence, 10));
    }
}

export {
    IRiskMatrixProps,
    IRiskMatrixState,
};
