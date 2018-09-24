import * as PropertyBagUtil from "../Util/PropertyBag";
import { IDropdownOption } from "office-ui-fabric-react/lib/Dropdown";

export const CHOSEN_SETTINGS_PROPERTY_KEY = "pp_chosensettings";
export const SETTINGS_PROPERTY_KEY = "pp_settings";
export const SETTINGS_OPTIONS_PROPERTY_KEY = "pp_settings_options";

export interface ISetting {
    settingKey: string;
    settingValue: string;
    options?: IDropdownOption[];
}


/**
 * Get settings and options
 */
export async function GetSettingsAndOptions(): Promise<{ settings: { [key: string]: string }, options: { [key: string]: string } }> {
    const webPropertyBag = await PropertyBagUtil.GetAllProperties();
    let options;
    try {
        options = JSON.parse(webPropertyBag[SETTINGS_OPTIONS_PROPERTY_KEY]);
    } catch (err) {
        options = {};
    }
    const settings = await GetSettings(webPropertyBag);
    return { settings, options };
}

/**
 * Get setting
 *
 * @param {Object} webPropertyBag Web property bag
 */
export async function GetSettings(webPropertyBag?: { [key: string]: string }): Promise<{ [key: string]: string }> {
    if (!webPropertyBag) {
        webPropertyBag = await PropertyBagUtil.GetAllProperties();
    }
    let settings, settingsJson, chosenSettingsJson;
    try {
        settingsJson = JSON.parse(webPropertyBag[SETTINGS_PROPERTY_KEY]);
    } catch (err) {
        settingsJson = null;
    }
    try {
        chosenSettingsJson = JSON.parse(webPropertyBag[CHOSEN_SETTINGS_PROPERTY_KEY]);
    } catch (err) {
        chosenSettingsJson = null;
    }
    settings = chosenSettingsJson || settingsJson || {};
    if (chosenSettingsJson && settingsJson) {
        settings = Object.keys(settingsJson).reduce((obj, key) => {
            if (!settings.hasOwnProperty(key)) {
                obj[key] = settingsJson[key];
            }
            return obj;
        }, settings);
    }
    return settings;
}

/**
 * Get setting
 *
 * @param {string} key Key of the setting
 * @param {boolean} toLowerCase Return the value in lowercase
 */
export async function GetSetting(key: string, toLowerCase = false): Promise<string> {
    const settings = await GetSettings();
    if (settings.hasOwnProperty(key)) {
        if (toLowerCase) {
            return settings[key].toLowerCase();
        }
        return settings[key];
    }
    return "";
}

/**
 * Update settings
 *
 * @param {Object} settings Updated settings
 */
export async function UpdateSettings(settings: { [key: string]: string }): Promise<boolean> {
    try {
        const settingsString = JSON.stringify(settings);
        await PropertyBagUtil.SetProperty(CHOSEN_SETTINGS_PROPERTY_KEY, settingsString);
        return true;
    } catch (err) {
        return false;
    }
}
