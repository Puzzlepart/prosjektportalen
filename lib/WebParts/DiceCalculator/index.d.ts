/// <reference types="react" />
import IDiceCalculatorProps from "./IDiceCalculatorProps";
import IDiceCalculatorState from "./IDiceCalculatorState";
import BaseWebPart from "../@BaseWebPart";
export default class DiceCalculator extends BaseWebPart<IDiceCalculatorProps, IDiceCalculatorState> {
    static displayName: string;
    static defaultProps: Partial<IDiceCalculatorProps>;
    private diceList;
    /**
     * Constructor
     *
     * @param {IDiceCalculatorProps} props Props
     */
    constructor(props: IDiceCalculatorProps);
    componentDidMount(): Promise<void>;
    render(): JSX.Element;
    /**
     * On render item column
     *
     * @param {DiceCalculatorElement} item Current item
     * @param {number} index Index of the column
     * @param {IColumn} column Current column
     */
    private _onRenderItemColumn;
    /**
     * On choice changed
     *
     * @param {number} itemIndex Index of the item
     * @param {IDropdownOption} option Selected option
     */
    private _onChoiceChanged;
    /**
     * Calculate overall score using formula D + 2I + 2C1 + C2 + E
     */
    private calculateOverallScore;
    /**
     * Save score
     */
    private saveScore;
    /**
     * Remove score
     */
    private removeScore;
    /**
     * Is save score enabled
     */
    private isSaveScoreEnabled;
    /**
     * Is remove score enabled
     */
    private isRemoveScoreEnabled;
    /**
     * Post status message
     *
     * @param {IStatusMessage} sm Status message
     * @param {Partial<IDiceCalculatorState>} additionalUpdates Additional updates to state
     * @param {number} duration Duration in ms
     */
    private postStatusMessage;
}
export { IDiceCalculatorProps, IDiceCalculatorState, };
