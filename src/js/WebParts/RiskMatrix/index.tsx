import * as React from "react";
import RESOURCE_MANAGER from "localization";
import { Toggle } from "office-ui-fabric-react/lib/Toggle";
import RiskMatrixConfig from "./RiskMatrixConfig";
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
    constructor(props: IRiskMatrixProps) {
        super(props);
        this.state = { data: props.data };
    }

    public componentDidMount() {
        console.log(this.state);
    }

    /**
     * Renders the component
     */
    public render(): JSX.Element {
        if (!this.state.data || this.state.data.length === 0) {
            return null;
        }

        const items = this.state.data.filter(i => i.ContentTypeId.indexOf(this.props.contentTypeId) !== -1);

        const riskMatrix = RiskMatrixConfig.map((rows, i) => {
            let cells = rows.map((c, j) => {
                const cell = RiskMatrixConfig[i][j],
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
            <div className={this.props.className}>
                <table id={this.props.id}>
                    <tbody>
                        {riskMatrix}
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
