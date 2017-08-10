import * as React from "react";
import { Spinner, SpinnerType } from "office-ui-fabric-react/lib/Spinner";
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
            isLoading: true,
        };
    }

    /**
    * Component did mount
    */
    public componentDidMount(): void {
        this.fetchData(this.props).then(data => {
            this.setState({
                ...data,
                isLoading: false,
            });
        });
    }

    /**
     * Renders the component
     */
    public render(): JSX.Element {
        if (this.state.isLoading) {
            return <Spinner type={SpinnerType.large} />;
        }
        const riskMatrix = Config.RiskMatrix.map((rows, i: number) => {
            let cells = rows.map((cell, j: number) => {
                const element = Config.RiskMatrix[i][j];
                const riskElements = this.state.items
                    .filter((risk, idx) => element.Probability === parseInt(risk.GtRiskProbability, 10) && element.Consequence === parseInt(risk.GtRiskConsequence, 10))
                    .map((risk, idx) => (
                        <RiskElement
                            key={idx}
                            item={risk}
                            style={{ opacity: this.props.postAction ? 0.5 : 1 }} />
                    ));
                const riskElementsPostAction = (this.props.postAction ? this.state.items.filter((risk, idx) => this.props.postAction && (element.Probability === parseInt(risk.GtRiskProbabilityPostAction, 10) && element.Consequence === parseInt(risk.GtRiskConsequencePostAction, 10))) : [])
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

    /**
     * Fetches required data
    */
    private fetchData = ({ listTitle, viewQuery }: IRiskMatrixProps) => new Promise<any>((resolve, reject) => {
        const ctx = SP.ClientContext.get_current();
        const list = ctx.get_web().get_lists().getByTitle(listTitle);
        const camlQuery = new SP.CamlQuery();
        camlQuery.set_viewXml(`<View>${viewQuery}</View>`);
        const items = list.getItems(camlQuery);
        const fields = list.get_fields();
        ctx.load(items);
        ctx.load(fields);
        ctx.executeQueryAsync(() => {
            let itemFieldValues = items.get_data().map(i => i.get_fieldValues());
            resolve({ items: itemFieldValues });
        }, reject);
    })
}

export default RiskMatrix;
