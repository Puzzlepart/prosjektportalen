import * as React from "react";
import { Dialog, DialogType } from "office-ui-fabric-react/lib/Dialog";
import { TextField } from "office-ui-fabric-react/lib/TextField";
import * as Config from "../Config";

const RiskElement = ({ item, show }) => {
    return (<div onClick={() => show(item)} className={`risk-matrix-element`}> {item.Id} </div>);
};

const SelectedRisk = ({ item }) => {
    return (
        <div className="selected-risk">
            <TextField label="ID" placeholder={item.Id} disabled={true} />
            <TextField label="Sannsynlighet" placeholder={item.GtRiskProbability} disabled={true} />
            <TextField label="Konsevens" placeholder={item.GtRiskConsequence} disabled={true} />
            <TextField label="Risiko" placeholder={Math.round(item.GtRiskFactor).toString()} disabled={true} />
            <TextField label="Tiltak" placeholder={item.GtRiskAction} disabled={true} multiline autoAdjustHeight />
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

    public render() {
        let { items } = this.props;
        let { selectedRisk, showDialog } = this.state;
        let riskMatrix = Config.RiskMatrix.map((rows, i) => {
            let entry = rows.map((cell, j) => {
                let riskElements = items.map((risk, k) => {
                    if (Config.RiskMatrix[i][j].Probability === risk.GtRiskProbability && Config.RiskMatrix[i][j].Consequence === risk.GtRiskConsequence) {
                        return <RiskElement show={this.showRiskItem} item={risk} key={k} />;
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
                {selectedRisk && <Dialog isOpen={showDialog} type={DialogType.close} onDismiss={this.closeDialog} title={selectedRisk.Title} isBlocking={false}>
                    <SelectedRisk item={selectedRisk} />
                </Dialog>}
                <table id="risk-matrix">
                    <tbody>
                        {riskMatrix}
                    </tbody>
                </table>
            </div>
        );
    }

    private closeDialog = () => {
        this.setState({ showDialog: false, selectedRisk: null });
    }

    private showRiskItem = (item: any) => {
        this.setState({ showDialog: true, selectedRisk: item });
    }
}

export default RiskMatrix;
