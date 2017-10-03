import { IDropdownOption } from "office-ui-fabric-react/lib/Dropdown";

export default interface ISetting {
    settingKey: string;
    settingValue: string;
    options?: IDropdownOption[];
}
