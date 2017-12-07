import * as React from "react";
import { DetailsList, IColumn } from "office-ui-fabric-react/lib/DetailsList";
import { Dropdown, IDropdownOption } from "office-ui-fabric-react/lib/Dropdown";
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
                elements: "Duration (between learning milestones or till completion)",
                selection: "",
                score: 0,
            },
            {
                elements: "Team Performance Integrity",
                selection: "",
                score: 0,
            },
            {
                elements: "Commitment (Senior Mgmt)",
                selection: "",
                score: 0,
            },
            {
                elements: "Commitment (Local)",
                selection: "",
                score: 0,
            },
            {
                elements: "Effort",
                selection: "",
                score: 0,
            }],
        });
        this._onRenderItemColumn = this._onRenderItemColumn.bind(this);
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
                    onRenderItemColumn={this._onRenderItemColumn}
                />
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
}

export {
    IDiceCalculatorProps,
    IDiceCalculatorState,
};
