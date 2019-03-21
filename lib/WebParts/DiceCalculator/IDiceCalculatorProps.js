"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Resources_1 = require("../../Resources");
const DiceCalculatorElement_1 = require("./DiceCalculatorElement");
exports.DiceCalculatorDefaultProps = {
    choices: [
        [
            Resources_1.default.getResource("DiceCalculator_LessThanTwoMonths"),
            Resources_1.default.getResource("DiceCalculator_TwoToFourMonths"),
            Resources_1.default.getResource("DiceCalculator_FourToEightMonths"),
            Resources_1.default.getResource("DiceCalculator_EightMonths"),
        ],
        [
            Resources_1.default.getResource("DiceCalculator_VeryGood"),
            Resources_1.default.getResource("DiceCalculator_GoodToVeryGood"),
            Resources_1.default.getResource("DiceCalculator_AverageToGood"),
            Resources_1.default.getResource("DiceCalculator_Good"),
            Resources_1.default.getResource("DiceCalculator_Average"),
            Resources_1.default.getResource("DiceCalculator_PoorToAverage"),
            Resources_1.default.getResource("DiceCalculator_Poor"),
        ],
        [
            Resources_1.default.getResource("DiceCalculator_ClearlyStronglyCommunicateNeed"),
            Resources_1.default.getResource("DiceCalculator_ReasonablyCommunicateNeed"),
            Resources_1.default.getResource("DiceCalculator_SeemToWantSuccess"),
            Resources_1.default.getResource("DiceCalculator_NeutralSeemToWantSuccess"),
            Resources_1.default.getResource("DiceCalculator_Neutral"),
            Resources_1.default.getResource("DiceCalculator_ReluctantToNeutral"),
            Resources_1.default.getResource("DiceCalculator_Reluctant"),
        ],
        [
            Resources_1.default.getResource("DiceCalculator_Eager"),
            Resources_1.default.getResource("DiceCalculator_WillingEager"),
            Resources_1.default.getResource("DiceCalculator_Willing"),
            Resources_1.default.getResource("DiceCalculator_ReluctantWilling"),
            Resources_1.default.getResource("DiceCalculator_Reluctant"),
            Resources_1.default.getResource("DiceCalculator_StronglyReluctantToReluctant"),
            Resources_1.default.getResource("DiceCalculator_StronglyReluctant"),
        ],
        [
            Resources_1.default.getResource("DiceCalculator_LessThan10Additional"),
            Resources_1.default.getResource("DiceCalculator_10To20Additional"),
            Resources_1.default.getResource("DiceCalculator_20To40Additional"),
            Resources_1.default.getResource("DiceCalculator_Above40Additional"),
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
        new DiceCalculatorElement_1.default(Resources_1.default.getResource("DiceCalculator_Duration"), "DiceDuration"),
        new DiceCalculatorElement_1.default(Resources_1.default.getResource("DiceCalculator_TeamPerformanceIntegrity"), "DiceTPI"),
        new DiceCalculatorElement_1.default(Resources_1.default.getResource("DiceCalculator_CommitmentSeniorMgmt"), "DiceCommSeniorMgmt"),
        new DiceCalculatorElement_1.default(Resources_1.default.getResource("DiceCalculator_CommitmentLocal"), "DiceCommLocal"),
        new DiceCalculatorElement_1.default(Resources_1.default.getResource("DiceCalculator_Effort"), "DiceEffort"),
    ],
};
