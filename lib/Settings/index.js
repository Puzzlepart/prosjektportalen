"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const PropertyBagUtil = require("../Util/PropertyBag");
exports.CHOSEN_SETTINGS_PROPERTY_KEY = "pp_chosensettings";
exports.SETTINGS_PROPERTY_KEY = "pp_settings";
exports.SETTINGS_OPTIONS_PROPERTY_KEY = "pp_settings_options";
/**
 * Get settings and options
 */
function GetSettingsAndOptions() {
    return __awaiter(this, void 0, void 0, function* () {
        const webPropertyBag = yield PropertyBagUtil.GetAllProperties();
        let options;
        try {
            options = JSON.parse(webPropertyBag[exports.SETTINGS_OPTIONS_PROPERTY_KEY]);
        }
        catch (err) {
            options = {};
        }
        const settings = yield GetSettings(webPropertyBag);
        return { settings, options };
    });
}
exports.GetSettingsAndOptions = GetSettingsAndOptions;
/**
 * Get setting
 *
 * @param {Object} webPropertyBag Web property bag
 */
function GetSettings(webPropertyBag) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!webPropertyBag) {
            webPropertyBag = yield PropertyBagUtil.GetAllProperties();
        }
        let settings, settingsJson, chosenSettingsJson;
        try {
            settingsJson = JSON.parse(webPropertyBag[exports.SETTINGS_PROPERTY_KEY]);
        }
        catch (err) {
            settingsJson = null;
        }
        try {
            chosenSettingsJson = JSON.parse(webPropertyBag[exports.CHOSEN_SETTINGS_PROPERTY_KEY]);
        }
        catch (err) {
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
    });
}
exports.GetSettings = GetSettings;
/**
 * Get setting
 *
 * @param {string} key Key of the setting
 * @param {boolean} toLowerCase Return the value in lowercase
 */
function GetSetting(key, toLowerCase = false) {
    return __awaiter(this, void 0, void 0, function* () {
        const settings = yield GetSettings();
        if (settings.hasOwnProperty(key)) {
            if (toLowerCase) {
                return settings[key].toLowerCase();
            }
            return settings[key];
        }
        return "";
    });
}
exports.GetSetting = GetSetting;
/**
 * Update settings
 *
 * @param {Object} settings Updated settings
 */
function UpdateSettings(settings) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const settingsString = JSON.stringify(settings);
            yield PropertyBagUtil.SetProperty(exports.CHOSEN_SETTINGS_PROPERTY_KEY, settingsString);
            return true;
        }
        catch (err) {
            return false;
        }
    });
}
exports.UpdateSettings = UpdateSettings;
