import { IMessageBarProps } from "office-ui-fabric-react/lib/MessageBar";
import { IBaseWebPartState } from "../@BaseWebPart";

export default interface IWebPropertyBagEditorState extends IBaseWebPartState {
    settings?: { [key: string]: string };
    options?: { [key: string]: string };
    isSaving?: boolean;
    statusMessage?: IMessageBarProps;
}
