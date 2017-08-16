import * as React from "react";
import { Toggle } from "office-ui-fabric-react/lib/Toggle";
import * as Config from "../Config";
import MatrixRow from "./MatrixRow";
import MatrixHeaderCell from "./MatrixHeaderCell";
import MatrixCell from "./MatrixCell";
import RiskElement from "./RiskElement";
import IRiskMatrixProps, { RiskMatrixDefaultProps } from "./IRiskMatrixProps";
import IRiskMatrixState from "./IRiskMatrixState";


/**
 * Risk Matrix
 */
export default class RiskMatrix extends React.Component<IRiskMatrixProps, IRiskMatrixState> {
    public static defaultProps = RiskMatrixDefaultProps;

    /**
     * Constructor
     */
    constructor() {
        super();
        this.state = {};
    }

    /**
     * Renders the component
     */
    public render(): JSX.Element {
        if (!this.props.listData) {
            return null;
        }

        const items = this.props.listData.items.filter(i => i.ContentTypeId.indexOf(this.props.contentTypeId) !== -1);

        const riskMatrix = Config.RiskMatrix.map((rows, i) => {
            let cells = rows.map((c, j) => {
                const cell = Config.RiskMatrix[i][j],
                    riskElements = this.getRiskElementsForCell(items, cell).map((risk, key) => (
                        <RiskElement
                            key={key}
                            item={risk}
                            style={{ opacity: this.state.postAction ? 0.5 : 1 }} />
                    )),
                    riskElementsPostAction = this.getRiskElementsPostActionForCell(items, cell).map((risk, key) => (
                        <RiskElement
                            key={key}
                            item={risk} />
                    )),
                    isCell = (i > 0 && j > 0);

                if (isCell) {
                    return (
                        <MatrixCell
                            key={j}
                            contents={[
                                ...riskElements,
                                ...riskElementsPostAction,
                            ]}
                            className={cell.ClassName} />
                    );
                } else {
                    return (
                        <MatrixHeaderCell
                            key={j}
                            label={c.Value} />
                    );
                }
            });
            return (
                <MatrixRow
                    key={i}
                    cells={cells} />
            );
        });

        return (
            <div className={this.props.containerClassName}>
                <table id={this.props.tableId}>
                    <tbody>
                        {riskMatrix}
                    </tbody>
                </table>
                <Toggle
                    defaultChecked={false}
                    onChanged={isChecked => this.setState({ postAction: isChecked })}
                    label={__("ProjectStatus_RiskShowPostActionLabel")}
                    onText={__("String_Yes")}
                    offText={__("String_No")} />
            </div>
        );
    }

    /**
     * Helper function to get risk elements post action
     */
    private getRiskElementsPostActionForCell = (items, element) => {
        if (this.state.postAction) {
            return items.filter(risk => element.Probability === parseInt(risk.GtRiskProbabilityPostAction, 10) && element.Consequence === parseInt(risk.GtRiskConsequencePostAction, 10));
        }
        return [];
    }

    /**
     * Helper function to get risk elements
     */
    private getRiskElementsForCell = (items, element) => {
        return items.filter(risk => element.Probability === parseInt(risk.GtRiskProbability, 10) && element.Consequence === parseInt(risk.GtRiskConsequence, 10));
    }
}
