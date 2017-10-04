import { IBaseWebPartProps } from "../@BaseWebPart";

export default interface IWebPropertyBagEditorProps extends IBaseWebPartProps {
    settingsPropKey?: string;
    settingsOptionsPropKey?: string;
}

export const WebPropertyBagEditorDefaultProps: Partial<IWebPropertyBagEditorProps> = {
    settingsPropKey: "pp_settings",
    settingsOptionsPropKey: "pp_settings_options",
};
