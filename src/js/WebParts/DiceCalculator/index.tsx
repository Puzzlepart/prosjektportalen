import * as React from "react";
import pnp from "sp-pnp-js";
import { DetailsList, IColumn } from "office-ui-fabric-react/lib/DetailsList";
import { Dropdown, IDropdownOption } from "office-ui-fabric-react/lib/Dropdown";
import { ActionButton } from "office-ui-fabric-react/lib/Button";
import IDiceCalculatorProps, { DiceCalculatorDefaultProps } from "./IDiceCalculatorProps";
import IDiceCalculatorState from "./IDiceCalculatorState";
import BaseWebPart from "../@BaseWebPart";

export default class DiceCalculator extends BaseWebPart<IDiceCalculatorProps, IDiceCalculatorState> {
    public static displayName = "DiceCalculator";
    public static defaultProps = DiceCalculatorDefaultProps;

    /**
     * Constructor
     *
     * @param {IDiceCalculatorProps} props Props
     */
    constructor(props: IDiceCalculatorProps) {
        super(props, {
            elements: [{
                fieldNames: ["DiceDuration", "DiceDurationScore"],
                elements: "Duration (between learning milestones or till completion)",
                selection: "",
                score: 0,
            },
            {
                fieldNames: ["DiceTPI", "DiceTPIScore"],
                elements: "Team Performance Integrity",
                selection: "",
                score: 0,
            },
            {
                fieldNames: ["DiceCommSeniorMgmt", "DiceCommSeniorMgmtScore"],
                elements: "Commitment (Senior Mgmt)",
                selection: "",
                score: 0,
            },
            {
                fieldNames: ["DiceCommLocal", "DiceCommLocalScore"],
                elements: "Commitment (Local)",
                selection: "",
                score: 0,
            },
            {
                fieldNames: ["DiceEffort", "DiceEffortScore"],
                elements: "Effort",
                selection: "",
                score: 0,
            }],
        });
        this._onRenderItemColumn = this._onRenderItemColumn.bind(this);
        this.saveScore = this.saveScore.bind(this);
    }

    public render(): JSX.Element {
        return (
            <div>
                <DetailsList
                    items={[
                        ...this.state.elements,
                        {
                            elements: "Overall Score",
                            score: this.calculateOverallScore(),
                        },
                    ]}
                    columns={this.props.columns}
                    onRenderItemColumn={this._onRenderItemColumn} />
                <ActionButton
                    iconProps={{ iconName: "Save" }}
                    disabled={false}
                    text="Save"
                    onClick={this.saveScore} />
            </div>
        );
    }

    private _onRenderItemColumn(item: any, index: number, column: IColumn) {
        if (column.key === "selection") {
            return (
                <Dropdown
                    placeHolder="Please Select"
                    onChanged={option => this._onChoiceChanged(index, option)}
                    options={this.props.choices[index].map((c, i) => ({
                        key: i,
                        text: c,
                    }))}
                />
            );
        }
        return item[column.key];
    }

    private _onChoiceChanged(itemIndex: number, option: IDropdownOption) {
        const score = this.props.choicesScores[itemIndex][option.key];
        this.setState((prevState: IDiceCalculatorState) => ({
            elements: prevState.elements.map((ele, i) => {
                if (itemIndex === i) {
                    return {
                        ...ele,
                        selection: option.text,
                        score,
                    };
                }
                return ele;
            }),
        }));
    }

    private calculateOverallScore(): number {
        const [D, I, C1, C2, E] = this.state.elements.map(e => e.score);
        return D + (2 * I) + (2 * C1) + C2 + E;
    }

    private saveScore() {
        const item = this.state.elements.reduce((prevVal, currVal) => {
            prevVal[currVal.fieldNames[0]] = currVal.selection;
            prevVal[currVal.fieldNames[1]] = currVal.score;
            return prevVal;
        }, { DiceOverallScore: this.calculateOverallScore() });
        pnp.sp.web.lists.getByTitle("Dice").items.add(item);
    }
}

export {
    IDiceCalculatorProps,
    IDiceCalculatorState,
};
