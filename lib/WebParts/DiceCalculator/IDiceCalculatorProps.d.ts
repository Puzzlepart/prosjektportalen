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
export declare const DiceCalculatorDefaultProps: Partial<IDiceCalculatorProps>;
