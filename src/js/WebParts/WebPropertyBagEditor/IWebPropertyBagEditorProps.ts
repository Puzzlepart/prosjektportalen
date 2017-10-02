import { IDropdownOption } from "office-ui-fabric-react/lib/Dropdown";
import { IBaseWebPartProps } from "../@BaseWebPart";

export default interface IWebPropertyBagEditorProps extends IBaseWebPartProps {
    readOnlySettings?: string[];
    settingsOptions?: { [key: string]: IDropdownOption[] };
}

export const WebPropertyBagEditorDefaultProps: Partial<IWebPropertyBagEditorProps> = {
    readOnlySettings: ["pp_version", "pp_datasourcesiteurl", "pp_assetssiteurl"],
    settingsOptions: {
        pp_loglevel: [
            { key: "3", text: "Error" },
            { key: "2", text: "Warning" },
            { key: "1", text: "Info" },
        ],
    },
};
