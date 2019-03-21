import { IDropdownOption } from "office-ui-fabric-react/lib/Dropdown";
export declare const CHOSEN_SETTINGS_PROPERTY_KEY = "pp_chosensettings";
export declare const SETTINGS_PROPERTY_KEY = "pp_settings";
export declare const SETTINGS_OPTIONS_PROPERTY_KEY = "pp_settings_options";
export interface ISetting {
    settingKey: string;
    settingValue: string;
    options?: IDropdownOption[];
}
/**
 * Get settings and options
 */
export declare function GetSettingsAndOptions(): Promise<{
    settings: {
        [key: string]: string;
    };
    options: {
        [key: string]: string;
    };
}>;
/**
 * Get setting
 *
 * @param {Object} webPropertyBag Web property bag
 */
export declare function GetSettings(webPropertyBag?: {
    [key: string]: string;
}): Promise<{
    [key: string]: string;
}>;
/**
 * Get setting
 *
 * @param {string} key Key of the setting
 * @param {boolean} toLowerCase Return the value in lowercase
 */
export declare function GetSetting(key: string, toLowerCase?: boolean): Promise<string>;
/**
 * Update settings
 *
 * @param {Object} settings Updated settings
 */
export declare function UpdateSettings(settings: {
    [key: string]: string;
}): Promise<boolean>;
