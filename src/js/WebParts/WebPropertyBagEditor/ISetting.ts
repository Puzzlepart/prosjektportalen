import { IDropdownOption } from "office-ui-fabric-react/lib/Dropdown";

export default interface ISetting {
    settingKey: string;
    settingValue: string;
    readOnly: boolean;
    options?: IDropdownOption[];
}
