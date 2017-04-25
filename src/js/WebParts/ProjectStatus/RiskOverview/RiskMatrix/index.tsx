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
        let riskMatrix = Config.RiskMatrix.map((rows, i) => {
            let entry = rows.map((cell, j) => {
                let riskElements = items.map((risk, k) => {
                    if (Config.RiskMatrix[i][j].Probability === risk.GtRiskProbability && Config.RiskMatrix[i][j].Consequence === risk.GtRiskConsequence) {
                        return <RiskElement item={risk} key={k} />;
                    }
                    return null;
                });
                if (i > 0 && j > 0) {
                    return <td
                        key={j}
                        className={`risk-matrix-element-container ${Config.RiskMatrix[i][j].ClassName}`}>
                        {riskElements}
                    </td>;
                }
                return <td
                    key={j}
                    className=" headers">
                    <span>
                        {cell.Value}
                    </span>
                </td>;
            });
            return (
                <tr
                    key={i}
                    className="risk-matrix-row">
                    {entry}
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
