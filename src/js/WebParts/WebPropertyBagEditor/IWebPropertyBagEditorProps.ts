import { IDropdownOption } from "office-ui-fabric-react/lib/Dropdown";
import { IBaseWebPartProps } from "../@BaseWebPart";

export default interface IWebPropertyBagEditorProps extends IBaseWebPartProps {
    readOnlySettings: string[];
    settingsOptions: { [key: string]: IDropdownOption[] };
}
