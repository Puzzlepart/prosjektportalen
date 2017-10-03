import { IDropdownOption } from "office-ui-fabric-react/lib/Dropdown";
import { IBaseWebPartProps } from "../@BaseWebPart";

export default interface IWebPropertyBagEditorProps extends IBaseWebPartProps {
    propKey?: string;
    settingsOptions?: { [key: string]: IDropdownOption[] };
}

export const WebPropertyBagEditorDefaultProps: Partial<IWebPropertyBagEditorProps> = {
    propKey: "pp_settings",
    settingsOptions: {
        LOG_LEVEL: [
            { key: "3", text: "Error" },
            { key: "2", text: "Warning" },
            { key: "1", text: "Info" },
        ],
    },
};
