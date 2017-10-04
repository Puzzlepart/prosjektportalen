import {
    GetAllProperties,
    SetProperty,
} from "../Util/PropertyBag";
import { IDropdownOption } from "office-ui-fabric-react/lib/Dropdown";

export const SETTINGS_PROPERTY_KEY = "pp_settings";
export const SETTINGS_OPTIONS_PROPERTY_KEY = "pp_settings_options";

export interface ISetting {
    settingKey: string;
    settingValue: string;
    options?: IDropdownOption[];
}


export async function GetSettingsAndOptions(): Promise<{ settings: { [key: string]: string }, options: { [key: string]: string } }> {
    const webProperties = await GetAllProperties();
    let settingsJson, settingsOptionsJson;
    try {
        settingsJson = JSON.parse(webProperties[SETTINGS_PROPERTY_KEY]);
    } catch (err) {
        settingsJson = {};
    }
    try {
        settingsOptionsJson = JSON.parse(webProperties[SETTINGS_OPTIONS_PROPERTY_KEY]);
    } catch (err) {
        settingsOptionsJson = {};
    }
    return {
        settings: settingsJson,
        options: settingsOptionsJson,
    };
}

export async function GetSettings(): Promise<{ [key: string]: string }> {
    const webProperties = await GetAllProperties();
    let settingsJson;
    try {
        settingsJson = JSON.parse(webProperties[SETTINGS_PROPERTY_KEY]);
    } catch (err) {
        settingsJson = {};
    }
    return settingsJson;
}

export async function GetSetting(settingKey: string): Promise<string> {
    const webProperties = await GetAllProperties();
    let settingsJson;
    try {
        settingsJson = JSON.parse(webProperties[SETTINGS_PROPERTY_KEY]);
    } catch (err) {
        settingsJson = {};
    }
    return settingsJson[settingKey];
}



export async function UpdateSettings(settings: { [key: string]: string }): Promise<void> {
    let settingsString = "";
    try {
        settingsString = JSON.stringify(settings);
    } catch (err) {
        throw err;
    }
    await SetProperty(SETTINGS_PROPERTY_KEY, settingsString);
}
