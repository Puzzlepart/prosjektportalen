import * as React from "react";
import * as Config from "../../Config";
import { ModalLink } from "../../../@Components";

export interface IRiskElementProps {
    item: any;
    style?: React.CSSProperties;
}

const RiskElement = ({ item: { Id, Title }, style }: IRiskElementProps) => {
    let dispFormUrl = `../${__("DefaultView_Uncertainties_Url").replace("AllItems", "DispForm")}?ID=${Id}`;

    return (<div className={`risk-matrix-element`} title={Title} style={style}>
        <ModalLink label={Id} url={dispFormUrl} options={{ HideRibbon: true }} />
    </div>);
};

const MatrixHeaderCell = ({ label }) => {
    return (<td
        className="headers">
        <span>{label}</span>
    </td>);
};

const MatrixCell = ({ className, contents }) => {
    return (<td
        className={`risk-matrix-element-container ${className}`}>
        {contents}
    </td>);
};

const MatrixRow = ({ cells }) => {
    return (<tr
        className="risk-matrix-row">
        {cells}
    </tr>);
};

export interface IRiskMatrixProps {
    items: any[];
    postAction: boolean;
}

export interface IRiskMatrixState {
    selectedRisk: any;
    showDialog: boolean;
}


/**
 * Risk Matrix
 */
export class RiskMatrix extends React.Component<IRiskMatrixProps, IRiskMatrixState> {
    public static defaultProps = {
        items: [],
        postAction: false,
    };

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
                const riskElements = items.map((risk, k: number) => {
                    if (element.Probability === risk.GtRiskProbability && element.Consequence === risk.GtRiskConsequence) {
                        return <RiskElement item={risk} key={k} style={{ opacity: postAction ? 0.5 : 1 }} />;
                    }
                    if (postAction && (element.Probability === risk.GtRiskProbabilityPostAction && element.Consequence === risk.GtRiskConsequencePostAction)) {
                        return <RiskElement item={risk} key={k} />;
                    }
                    return null;
                });
                const isCell = (i > 0 && j > 0);
                if (isCell) {
                    return <MatrixCell key={j} contents={riskElements} className={element.ClassName} />;
                } else {
                    return <MatrixHeaderCell key={j} label={cell.Value} />;
                }
            });
            return (
                <MatrixRow key={i} cells={cells} />
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
