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
        ["< 2 months", "2-4 months", "4-8 months", "8 months"],
        ["Very Good", "Good - Very Good", "Good", "Average - Good", "Average", "Poor - Average", "Poor"],
        ["Clearly, strongly communicate need", "Reasonably communicate need", "Seem to want success", "Neutral - Seem to want success", "Neutral", "Reluctant - Neutral", "Reluctant"],
        ["Eager", "Willing - Eager", "Willing", "Reluctant - Willing", "Reluctant", "Strongly Reluctant - Reluctant", "Strongly Reluctant"],
        ["<10% additional", "10-20% additional", "20-40% additional", ">40% additional"],
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
        new DiceCalculatorElement("Duration (between learning milestones or till completion)", "DiceDuration"),
        new DiceCalculatorElement("Team Performance Integrity", "DiceTPI"),
        new DiceCalculatorElement("Commitment (Senior Mgmt)", "DiceCommSeniorMgmt"),
        new DiceCalculatorElement("Commitment (Local)", "DiceCommLocal"),
        new DiceCalculatorElement("Effort", "DiceEffort"),
    ],
};

