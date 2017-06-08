import * as React from "react";
import * as Config from "../../Config";
import MatrixRow from "./MatrixRow";
import MatrixHeaderCell from "./MatrixHeaderCell";
import MatrixCell from "./MatrixCell";
import RiskElement from "./RiskElement";
import IRiskMatrixProps, { RiskMatrixDefaultProps } from "./IRiskMatrixProps";
import IRiskMatrixState from "./IRiskMatrixState";


/**
 * Risk Matrix
 */
export class RiskMatrix extends React.Component<IRiskMatrixProps, IRiskMatrixState> {
    public static defaultProps = RiskMatrixDefaultProps;

    /**
     * Constructor
     */
    constructor() {
        super();
        this.state = {
            selectedRisk: null,
            showDialog: false,
        };
    }

    /**
     * Renders the component
     */
    public render(): JSX.Element {
        let {
            items,
            postAction,
        } = this.props;

        const riskMatrix = Config.RiskMatrix.map((rows, i: number) => {
            let cells = rows.map((cell, j: number) => {
                const element = Config.RiskMatrix[i][j];
                const riskElements = items
                    .filter((risk, idx) => element.Probability === parseInt(risk.GtRiskProbability, 10) && element.Consequence === parseInt(risk.GtRiskConsequence, 10))
                    .map((risk, idx) => (
                        <RiskElement
                            key={idx}
                            item={risk}
                            style={{ opacity: postAction ? 0.5 : 1 }} />
                    ));
                const riskElementsPostAction = (postAction ? items.filter((risk, idx) => postAction && (element.Probability ===  parseInt(risk.GtRiskProbabilityPostAction, 10) && element.Consequence ===  parseInt(risk.GtRiskConsequencePostAction, 10))) : [])
                    .map((risk, idx) => (
                        <RiskElement
                            key={idx}
                            item={risk} />
                    ));
                const isCell = (i > 0 && j > 0);
                if (isCell) {
                    return (
                        <MatrixCell
                            key={j}
                            contents={[
                                ...riskElements,
                                ...riskElementsPostAction,
                            ]}
                            className={element.ClassName} />
                    );
                } else {
                    return (
                        <MatrixHeaderCell
                            key={j}
                            label={cell.Value} />
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
            <div className="risk-matrix-container">
                <table id="risk-matrix">
                    <tbody>
                        {riskMatrix}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default RiskMatrix;
