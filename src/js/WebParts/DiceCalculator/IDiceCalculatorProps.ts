import RESOURCE_MANAGER from "../../Resources";
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
            RESOURCE_MANAGER.getResource("DiceCalculator_LessThanTwoMonths"),
            RESOURCE_MANAGER.getResource("DiceCalculator_TwoToFourMonths"),
            RESOURCE_MANAGER.getResource("DiceCalculator_FourToEightMonths"),
            RESOURCE_MANAGER.getResource("DiceCalculator_EightMonths"),
        ],
        [
            RESOURCE_MANAGER.getResource("DiceCalculator_VeryGood"),
            RESOURCE_MANAGER.getResource("DiceCalculator_GoodToVeryGood"),
            RESOURCE_MANAGER.getResource("DiceCalculator_AverageToGood"),
            RESOURCE_MANAGER.getResource("DiceCalculator_Good"),
            RESOURCE_MANAGER.getResource("DiceCalculator_Average"),
            RESOURCE_MANAGER.getResource("DiceCalculator_PoorToAverage"),
            RESOURCE_MANAGER.getResource("DiceCalculator_Poor"),
        ],
        [
            RESOURCE_MANAGER.getResource("DiceCalculator_ClearlyStronglyCommunicateNeed"),
            RESOURCE_MANAGER.getResource("DiceCalculator_ReasonablyCommunicateNeed"),
            RESOURCE_MANAGER.getResource("DiceCalculator_SeemToWantSuccess"),
            RESOURCE_MANAGER.getResource("DiceCalculator_NeutralSeemToWantSuccess"),
            RESOURCE_MANAGER.getResource("DiceCalculator_Neutral"),
            RESOURCE_MANAGER.getResource("DiceCalculator_ReluctantToNeutral"),
            RESOURCE_MANAGER.getResource("DiceCalculator_Reluctant"),
        ],
        [
            RESOURCE_MANAGER.getResource("DiceCalculator_Eager"),
            RESOURCE_MANAGER.getResource("DiceCalculator_WillingEager"),
            RESOURCE_MANAGER.getResource("DiceCalculator_Willing"),
            RESOURCE_MANAGER.getResource("DiceCalculator_ReluctantWilling"),
            RESOURCE_MANAGER.getResource("DiceCalculator_Reluctant"),
            RESOURCE_MANAGER.getResource("DiceCalculator_StronglyReluctantToReluctant"),
            RESOURCE_MANAGER.getResource("DiceCalculator_StronglyReluctant"),
        ],
        [
            RESOURCE_MANAGER.getResource("DiceCalculator_LessThan10Additional"),
            RESOURCE_MANAGER.getResource("DiceCalculator_10To20Additional"),
            RESOURCE_MANAGER.getResource("DiceCalculator_20To40Additional"),
            RESOURCE_MANAGER.getResource("DiceCalculator_Above40Additional"),
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
        new DiceCalculatorElement(RESOURCE_MANAGER.getResource("DiceCalculator_Duration"), "DiceDuration"),
        new DiceCalculatorElement(RESOURCE_MANAGER.getResource("DiceCalculator_TeamPerformanceIntegrity"), "DiceTPI"),
        new DiceCalculatorElement(RESOURCE_MANAGER.getResource("DiceCalculator_CommitmentSeniorMgmt"), "DiceCommSeniorMgmt"),
        new DiceCalculatorElement(RESOURCE_MANAGER.getResource("DiceCalculator_CommitmentLocal"), "DiceCommLocal"),
        new DiceCalculatorElement(RESOURCE_MANAGER.getResource("DiceCalculator_Effort"), "DiceEffort"),
    ],
};

