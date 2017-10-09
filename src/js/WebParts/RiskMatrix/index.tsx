import * as React from "react";
import pnp from "sp-pnp-js";
import RESOURCE_MANAGER from "localization";
import { Toggle } from "office-ui-fabric-react/lib/Toggle";
import { MessageBar } from "office-ui-fabric-react/lib/MessageBar";
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

        const riskMatrixRows = RiskMatrixConfig.map((rows, i) => {
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
                        {riskMatrixRows}
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

export {
    IRiskMatrixProps,
    IRiskMatrixState,
};
