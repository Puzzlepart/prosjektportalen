"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const Resources_1 = require("../../Resources");
const sp_1 = require("@pnp/sp");
const DetailsList_1 = require("office-ui-fabric-react/lib/DetailsList");
const Dropdown_1 = require("office-ui-fabric-react/lib/Dropdown");
const Button_1 = require("office-ui-fabric-react/lib/Button");
const MessageBar_1 = require("office-ui-fabric-react/lib/MessageBar");
const Spinner_1 = require("office-ui-fabric-react/lib/Spinner");
const IDiceCalculatorProps_1 = require("./IDiceCalculatorProps");
const IDiceCalculatorState_1 = require("./IDiceCalculatorState");
const _BaseWebPart_1 = require("../@BaseWebPart");
class DiceCalculator extends _BaseWebPart_1.default {
    /**
     * Constructor
     *
     * @param {IDiceCalculatorProps} props Props
     */
    constructor(props) {
        super(props, {
            isLoading: true,
            scoreSubmitted: false,
            elements: props.elements,
        });
        this.diceList = sp_1.sp.site.rootWeb.lists.getByTitle(this.props.diceListTitle);
        this._onRenderItemColumn = this._onRenderItemColumn.bind(this);
        this.saveScore = this.saveScore.bind(this);
        this.removeScore = this.removeScore.bind(this);
    }
    componentDidMount() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const [diceScore] = yield this.diceList.items.filter(`Title eq '${_spPageContextInfo.webTitle}'`).get();
                const scoreSubmitted = !!diceScore;
                this.setState((prevState) => ({
                    scoreSubmitted,
                    scoreId: diceScore ? diceScore.ID : -1,
                    elements: prevState.elements.map((ele, i) => {
                        const [fieldNameTxt, fieldNameScore] = ele.fieldNames;
                        if (scoreSubmitted) {
                            return Object.assign({}, ele, { selection: diceScore[fieldNameTxt], score: diceScore[fieldNameScore] });
                        }
                        return ele;
                    }),
                    isLoading: false,
                }));
            }
            catch (error) {
                this.postStatusMessage({ content: Resources_1.default.getResource("DiceCalculator_LoadFailed"), messageBarType: MessageBar_1.MessageBarType.error }, { isLoading: false, error }, -1);
            }
        });
    }
    render() {
        if (this.state.isLoading) {
            return React.createElement(Spinner_1.Spinner, { size: Spinner_1.SpinnerSize.large });
        }
        return (React.createElement("div", null,
            this.state.statusMessage && (React.createElement("div", { style: { marginBottom: 10 } },
                React.createElement(MessageBar_1.MessageBar, { messageBarType: this.state.statusMessage.messageBarType }, this.state.statusMessage.content))),
            !this.state.error && (React.createElement("div", null,
                React.createElement(DetailsList_1.DetailsList, { items: [
                        ...this.state.elements,
                        new IDiceCalculatorState_1.DiceCalculatorElement("Overall Score", "", this.calculateOverallScore()),
                    ], columns: this.props.columns, onRenderItemColumn: this._onRenderItemColumn, selectionMode: DetailsList_1.SelectionMode.none }),
                React.createElement("div", { hidden: !this.isSaveScoreEnabled() },
                    React.createElement(Button_1.ActionButton, { iconProps: { iconName: "Save" }, text: Resources_1.default.getResource("DiceCalculator_SaveScore"), onClick: this.saveScore })),
                React.createElement("div", { hidden: !this.isRemoveScoreEnabled() },
                    React.createElement(Button_1.ActionButton, { iconProps: { iconName: "Remove" }, text: Resources_1.default.getResource("DiceCalculator_RemoveScore"), onClick: this.removeScore }))))));
    }
    /**
     * On render item column
     *
     * @param {DiceCalculatorElement} item Current item
     * @param {number} index Index of the column
     * @param {IColumn} column Current column
     */
    _onRenderItemColumn(item, index, column) {
        if (column.key === "selection") {
            if (this.state.scoreSubmitted) {
                return item[column.key];
            }
            return (React.createElement(Dropdown_1.Dropdown, { placeHolder: Resources_1.default.getResource("DiceCalculator_DropdownPlaceholder"), onChanged: option => this._onChoiceChanged(index, option), options: this.props.choices[index].map((c, i) => ({
                    key: i,
                    text: c,
                })) }));
        }
        return item[column.key];
    }
    /**
     * On choice changed
     *
     * @param {number} itemIndex Index of the item
     * @param {IDropdownOption} option Selected option
     */
    _onChoiceChanged(itemIndex, option) {
        const score = this.props.choicesScores[itemIndex][option.key];
        this.setState((prevState) => ({
            elements: prevState.elements.map((ele, i) => {
                if (itemIndex === i) {
                    const selection = option.text;
                    return Object.assign({}, ele, { selection, score });
                }
                return ele;
            }),
        }));
    }
    /**
     * Calculate overall score using formula D + 2I + 2C1 + C2 + E
     */
    calculateOverallScore() {
        const [D, I, C1, C2, E] = this.state.elements.map(e => e.score);
        return D + (2 * I) + (2 * C1) + C2 + E;
    }
    /**
     * Save score
     */
    saveScore() {
        return __awaiter(this, void 0, void 0, function* () {
            const item = this.state.elements.reduce((prevVal, currVal) => {
                const [fieldNameTxt, fieldNameScore] = currVal.fieldNames;
                prevVal[fieldNameTxt] = currVal.selection;
                prevVal[fieldNameScore] = currVal.score;
                return prevVal;
            }, { Title: _spPageContextInfo.webTitle, DiceOverallScore: this.calculateOverallScore() });
            try {
                const itemAddResult = yield this.diceList.items.add(item);
                this.postStatusMessage({ content: Resources_1.default.getResource("DiceCalculator_ScoreSavedSuccess"), messageBarType: MessageBar_1.MessageBarType.success }, { scoreSubmitted: true, scoreId: itemAddResult.data.ID });
            }
            catch (err) {
                this.postStatusMessage({ content: Resources_1.default.getResource("DiceCalculator_ScoreSavedFailed"), messageBarType: MessageBar_1.MessageBarType.error });
            }
        });
    }
    /**
     * Remove score
     */
    removeScore() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.diceList.items.getById(this.state.scoreId).delete();
                this.postStatusMessage({ content: Resources_1.default.getResource("DiceCalculator_ScoreRemovedSuccess"), messageBarType: MessageBar_1.MessageBarType.info }, { scoreSubmitted: false, scoreId: -1, elements: this.props.elements });
            }
            catch (err) {
                this.postStatusMessage({ content: Resources_1.default.getResource("DiceCalculator_ScoreRemovedFailed"), messageBarType: MessageBar_1.MessageBarType.error });
            }
        });
    }
    /**
     * Is save score enabled
     */
    isSaveScoreEnabled() {
        return this.state.elements.filter(e => e.score === 0).length === 0 && !this.state.scoreSubmitted;
    }
    /**
     * Is remove score enabled
     */
    isRemoveScoreEnabled() {
        return this.state.scoreSubmitted;
    }
    /**
     * Post status message
     *
     * @param {IStatusMessage} sm Status message
     * @param {Partial<IDiceCalculatorState>} additionalUpdates Additional updates to state
     * @param {number} duration Duration in ms
     */
    postStatusMessage(sm, additionalUpdates = {}, duration = 2500) {
        this.setState(Object.assign({ statusMessage: sm }, additionalUpdates));
        if (duration === -1) {
            return;
        }
        window.setTimeout(() => {
            this.setState({ statusMessage: null });
        }, duration);
    }
}
DiceCalculator.displayName = "DiceCalculator";
DiceCalculator.defaultProps = IDiceCalculatorProps_1.DiceCalculatorDefaultProps;
exports.default = DiceCalculator;
