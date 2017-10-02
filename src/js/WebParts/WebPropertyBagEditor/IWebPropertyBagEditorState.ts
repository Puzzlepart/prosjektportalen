import { IBaseWebPartState } from "../@BaseWebPart";
import ISetting from "./ISetting";

export default interface IWebPropertyBagEditorState extends IBaseWebPartState {
    settings?: ISetting[];
    userInput?: { [key: string]: string };
}
