import { IBaseWebPartState } from "../@BaseWebPart";
import { IMessageBarProps } from "office-ui-fabric-react/lib/MessageBar";
import DiceCalculatorElement from "./DiceCalculatorElement";

export interface IStatusMessage extends IMessageBarProps {
    content;
}

export default interface IDiceCalculatorState extends IBaseWebPartState {
    statusMessage?: IStatusMessage;
    elements?: DiceCalculatorElement[];
    scoreSubmitted?: boolean;
    scoreId?: number;
}

export { DiceCalculatorElement };
