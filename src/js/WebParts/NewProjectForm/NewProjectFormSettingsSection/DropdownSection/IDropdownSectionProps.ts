import { IDropdownOption, IDropdownProps } from "office-ui-fabric-react/lib/Dropdown";

export default  interface IDropdownSectionProps extends IDropdownProps {
    headerClassName?: string;
    options: IDropdownOption[];
}
