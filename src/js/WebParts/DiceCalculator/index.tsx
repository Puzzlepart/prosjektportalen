import * as React from "react";
import __ from "../../Resources";
import pnp, { List } from "sp-pnp-js";
import { DetailsList, SelectionMode, IColumn } from "office-ui-fabric-react/lib/DetailsList";
import { Dropdown, IDropdownOption } from "office-ui-fabric-react/lib/Dropdown";
import { ActionButton } from "office-ui-fabric-react/lib/Button";
import { MessageBar, MessageBarType } from "office-ui-fabric-react/lib/MessageBar";
import { Spinner, SpinnerSize } from "office-ui-fabric-react/lib/Spinner";
import IDiceCalculatorProps, { DiceCalculatorDefaultProps } from "./IDiceCalculatorProps";
import IDiceCalculatorState, { DiceCalculatorElement, IStatusMessage } from "./IDiceCalculatorState";
import BaseWebPart from "../@BaseWebPart";

export default class DiceCalculator extends BaseWebPart<IDiceCalculatorProps, IDiceCalculatorState> {
    public static displayName = "DiceCalculator";
    public static defaultProps = DiceCalculatorDefaultProps;
    private diceList: List;

    /**
     * Constructor
     *
     * @param {IDiceCalculatorProps} props Props
     */
    constructor(props: IDiceCalculatorProps) {
        super(props, {
            isLoading: true,
            scoreSubmitted: false,
            elements: props.elements,
        });
        this.diceList = pnp.sp.site.rootWeb.lists.getByTitle(this.props.diceListTitle);
        this._onRenderItemColumn = this._onRenderItemColumn.bind(this);
        this.saveScore = this.saveScore.bind(this);
        this.removeScore = this.removeScore.bind(this);
    }

    public async componentDidMount() {
        try {
            const [diceScore] = await this.diceList.items.filter(`Title eq '${_spPageContextInfo.webTitle}'`).get();
            const scoreSubmitted = !!diceScore;
            this.setState((prevState: IDiceCalculatorState) => ({
                scoreSubmitted,
                scoreId: diceScore ? diceScore.ID : -1,
                elements: prevState.elements.map((ele, i) => {
                    const [fieldNameTxt, fieldNameScore] = ele.fieldNames;
                    if (scoreSubmitted) {
                        return {
                            ...ele,
                            selection: diceScore[fieldNameTxt],
                            score: diceScore[fieldNameScore],
                        };
                    }
                    return ele;
                }),
                isLoading: false,
            }));
        } catch (error) {
            this.postStatusMessage({ content: __.getResource("DiceCalculator_LoadFailed"), messageBarType: MessageBarType.error }, { isLoading: false, error }, -1);
        }
    }

    public render(): JSX.Element {
        if (this.state.isLoading) {
            return <Spinner size={SpinnerSize.large} />;
        }
        return (
            <div>
                {this.state.statusMessage && (
                    <div style={{ marginBottom: 10 }} >
                        <MessageBar messageBarType={this.state.statusMessage.messageBarType}>{this.state.statusMessage.content}</MessageBar>
                    </div>
                )}
                {!this.state.error && (
                    <div>
                        <DetailsList
                            items={[
                                ...this.state.elements,
                                new DiceCalculatorElement("Overall Score", "", this.calculateOverallScore()),
                            ]}
                            columns={this.props.columns}
                            onRenderItemColumn={this._onRenderItemColumn}
                            selectionMode={SelectionMode.none} />
                        <div hidden={!this.isSaveScoreEnabled()}>
                            <ActionButton
                                iconProps={{ iconName: "Save" }}
                                text={__.getResource("DiceCalculator_SaveScore")}
                                onClick={this.saveScore} />
                        </div>
                        <div hidden={!this.isRemoveScoreEnabled()}>
                            <ActionButton
                                iconProps={{ iconName: "Remove" }}
                                text={__.getResource("DiceCalculator_RemoveScore")}
                                onClick={this.removeScore} />
                        </div>
                    </div>
                )}
            </div>
        );
    }

    /**
     * On render item column
     *
     * @param {DiceCalculatorElement} item Current item
     * @param {number} index Index of the column
     * @param {IColumn} column Current column
     */
    private _onRenderItemColumn(item: DiceCalculatorElement, index: number, column: IColumn) {
        if (column.key === "selection") {
            if (this.state.scoreSubmitted) {
                return item[column.key];
            }
            return (
                <Dropdown
                    placeHolder={__.getResource("DiceCalculator_DropdownPlaceholder")}
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

    /**
     * On choice changed
     *
     * @param {number} itemIndex Index of the item
     * @param {IDropdownOption} option Selected option
     */
    private _onChoiceChanged(itemIndex: number, option: IDropdownOption) {
        const score = this.props.choicesScores[itemIndex][option.key];
        this.setState((prevState: IDiceCalculatorState) => ({
            elements: prevState.elements.map((ele, i) => {
                if (itemIndex === i) {
                    const selection = option.text;
                    return { ...ele, selection, score };
                }
                return ele;
            }),
        }));
    }

    /**
     * Calculate overall score using formula D + 2I + 2C1 + C2 + E
     */
    private calculateOverallScore(): number {
        const [D, I, C1, C2, E] = this.state.elements.map(e => e.score);
        return D + (2 * I) + (2 * C1) + C2 + E;
    }

    /**
     * Save score
     */
    private async saveScore() {
        const item = this.state.elements.reduce((prevVal, currVal) => {
            const [fieldNameTxt, fieldNameScore] = currVal.fieldNames;
            prevVal[fieldNameTxt] = currVal.selection;
            prevVal[fieldNameScore] = currVal.score;
            return prevVal;
        }, { Title: _spPageContextInfo.webTitle, DiceOverallScore: this.calculateOverallScore() });
        try {
            const itemAddResult = await this.diceList.items.add(item);
            this.postStatusMessage({ content: __.getResource("DiceCalculator_ScoreSavedSuccess"), messageBarType: MessageBarType.success }, { scoreSubmitted: true, scoreId: itemAddResult.data.ID });
        } catch (err) {
            this.postStatusMessage({ content: __.getResource("DiceCalculator_ScoreSavedFailed"), messageBarType: MessageBarType.error });
        }
    }

    /**
     * Remove score
     */
    private async removeScore() {
        try {
            await this.diceList.items.getById(this.state.scoreId).delete();
            this.postStatusMessage({ content: __.getResource("DiceCalculator_ScoreRemovedSuccess"), messageBarType: MessageBarType.info }, { scoreSubmitted: false, scoreId: -1, elements: this.props.elements });
        } catch (err) {
            this.postStatusMessage({ content: __.getResource("DiceCalculator_ScoreRemovedFailed"), messageBarType: MessageBarType.error });
        }
    }

    /**
     * Is save score enabled
     */
    private isSaveScoreEnabled(): boolean {
        return this.state.elements.filter(e => e.score === 0).length === 0 && !this.state.scoreSubmitted;
    }

    /**
     * Is remove score enabled
     */
    private isRemoveScoreEnabled(): boolean {
        return this.state.scoreSubmitted;
    }

    /**
     * Post status message
     *
     * @param {IStatusMessage} sm Status message
     * @param {Partial<IDiceCalculatorState>} additionalUpdates Additional updates to state
     * @param {number} duration Duration in ms
     */
    private postStatusMessage(sm: IStatusMessage, additionalUpdates: Partial<IDiceCalculatorState> = {}, duration = 2500) {
        this.setState({ statusMessage: sm, ...additionalUpdates });
        if (duration === -1) {
            return;
        }
        window.setTimeout(() => {
            this.setState({ statusMessage: null });
        }, duration);
    }
}

export {
    IDiceCalculatorProps,
    IDiceCalculatorState,
};
