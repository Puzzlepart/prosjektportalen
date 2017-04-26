import * as React from "react";
import * as Config from "../../Config";

const RiskElement = ({ item: { Id, Title } }) => {
    return (<div className={`risk-matrix-element`} title={Title}>
        {Id}
    </div>);
};

interface IRiskMatrixProps {
    items: any[];
}

interface IRiskMatrixState {
    selectedRisk: any;
    showDialog: boolean;
}

/**
 * Risk Matrix
 */
export class RiskMatrix extends React.Component<IRiskMatrixProps, IRiskMatrixState> {
    public static defaultProps = {
        items: [],
    };

    constructor(props) {
        super(props);
        this.state = {
            selectedRisk: null,
            showDialog: false,
        };
    }

    public render(): JSX.Element {
        let { items } = this.props;
        let riskMatrix = Config.RiskMatrix.map((rows, i: number) => {
            let row = rows.map((cell, j: number) => {
                const element = Config.RiskMatrix[i][j];
                const riskElements = items.map((risk, k: number) => {
                    if (element.Probability === risk.GtRiskProbability && element.Consequence === risk.GtRiskConsequence) {
                        return <RiskElement item={risk} key={k} />;
                    }
                    return null;
                });
                const isCell = (i > 0 && j > 0);
                if (isCell) {
                    return <td
                        key={j}
                        className={`risk-matrix-element-container ${element.ClassName}`}>
                        {riskElements}
                    </td>;
                } else {
                    return <td
                        key={j}
                        className="headers">
                        <span>
                            {cell.Value}
                        </span>
                    </td>;
                }
            });
            return (
                <tr
                    key={i}
                    className="risk-matrix-row">
                    {row}
                </tr>
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
