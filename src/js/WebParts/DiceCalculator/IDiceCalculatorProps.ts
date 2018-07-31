import __ from "../../Resources";
import { IBaseWebPartProps } from "../@BaseWebPart";
import { IColumn } from "office-ui-fabric-react/lib/DetailsList";
import DiceCalculatorElement from "./DiceCalculatorElement";

export default interface IDiceCalculatorProps extends IBaseWebPartProps {
    elements?: DiceCalculatorElement[];
    choices?: string[][];
    choicesScores?: number[][];
    columns?: IColumn[];
    diceListTitle?: string;
}

export const DiceCalculatorDefaultProps: Partial<IDiceCalculatorProps> = {
    choices: [
        [
            __.getResource("DiceCalculator_LessThanTwoMonths"),
            __.getResource("DiceCalculator_TwoToFourMonths"),
            __.getResource("DiceCalculator_FourToEightMonths"),
            __.getResource("DiceCalculator_EightMonths"),
        ],
        [
            __.getResource("DiceCalculator_VeryGood"),
            __.getResource("DiceCalculator_GoodToVeryGood"),
            __.getResource("DiceCalculator_AverageToGood"),
            __.getResource("DiceCalculator_Good"),
            __.getResource("DiceCalculator_Average"),
            __.getResource("DiceCalculator_PoorToAverage"),
            __.getResource("DiceCalculator_Poor"),
        ],
        [
            __.getResource("DiceCalculator_ClearlyStronglyCommunicateNeed"),
            __.getResource("DiceCalculator_ReasonablyCommunicateNeed"),
            __.getResource("DiceCalculator_SeemToWantSuccess"),
            __.getResource("DiceCalculator_NeutralSeemToWantSuccess"),
            __.getResource("DiceCalculator_Neutral"),
            __.getResource("DiceCalculator_ReluctantToNeutral"),
            __.getResource("DiceCalculator_Reluctant"),
        ],
        [
            __.getResource("DiceCalculator_Eager"),
            __.getResource("DiceCalculator_WillingEager"),
            __.getResource("DiceCalculator_Willing"),
            __.getResource("DiceCalculator_ReluctantWilling"),
            __.getResource("DiceCalculator_Reluctant"),
            __.getResource("DiceCalculator_StronglyReluctantToReluctant"),
            __.getResource("DiceCalculator_StronglyReluctant"),
        ],
        [
            __.getResource("DiceCalculator_LessThan10Additional"),
            __.getResource("DiceCalculator_10To20Additional"),
            __.getResource("DiceCalculator_20To40Additional"),
            __.getResource("DiceCalculator_Above40Additional"),
        ],
    ],
    choicesScores: [
        [1, 2, 3, 4],
        [1, 1.5, 2, 2.5, 3, 3.5, 4],
        [1, 1.5, 2, 2.5, 3, 3.5, 4],
        [1, 1.5, 2, 2.5, 3, 3.5, 4],
        [1, 2, 3, 4],
    ],
    columns: [{
        key: "elements",
        fieldName: "elements",
        name: "Elements",
        minWidth: 100,
        maxWidth: 300,
    },
    {
        key: "selection",
        fieldName: "selection",
        name: "Selection",
        minWidth: 100,
        maxWidth: 400,
    },
    {
        key: "score",
        fieldName: "score",
        name: "Score",
        minWidth: 100,
    }],
    diceListTitle: "Dice",
    elements: [
        new DiceCalculatorElement(__.getResource("DiceCalculator_Duration"), "DiceDuration"),
        new DiceCalculatorElement(__.getResource("DiceCalculator_TeamPerformanceIntegrity"), "DiceTPI"),
        new DiceCalculatorElement(__.getResource("DiceCalculator_CommitmentSeniorMgmt"), "DiceCommSeniorMgmt"),
        new DiceCalculatorElement(__.getResource("DiceCalculator_CommitmentLocal"), "DiceCommLocal"),
        new DiceCalculatorElement(__.getResource("DiceCalculator_Effort"), "DiceEffort"),
    ],
};

