import { IBaseWebPartState } from "../@BaseWebPart";
import IDiceElement from "./IDiceElement";

export default interface IDiceCalculatorState extends IBaseWebPartState {
    elements: IDiceElement[];
}

export { IDiceElement };
