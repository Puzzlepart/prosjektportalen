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
const Util_1 = require("../Util");
/**
 * Get property values from the web property bag
 *
 * @param {string} url URL for the webb
 */
function GetAllProperties(url = _spPageContextInfo.siteAbsoluteUrl) {
    return __awaiter(this, void 0, void 0, function* () {
        const { ctx, propertyBag } = yield Util_1.getJsomContext(url);
        yield Util_1.executeJsom(ctx, [propertyBag]);
        return propertyBag.get_fieldValues();
    });
}
exports.GetAllProperties = GetAllProperties;
/**
 * Get property value for the provided key from the web property bag
 *
 * @param {string} key Property key
 * @param {string} url URL for the web
 */
function GetProperty(key, url = _spPageContextInfo.siteAbsoluteUrl) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const properties = yield GetAllProperties(url);
            return properties[key];
        }
        catch (err) {
            return "";
        }
    });
}
exports.GetProperty = GetProperty;
/**
 * Get property value for the provided key from the web property bag
 *
 * @param {string} key Property key
 * @param {string} delimiter Delimiter
 * @param {string} url URL for the web
 */
function GetPropertyAsArray(key, delimiter = ",", url = _spPageContextInfo.siteAbsoluteUrl) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const property = yield GetProperty(key, url);
            const array = property.split(delimiter);
            return array;
        }
        catch (err) {
            return [];
        }
    });
}
exports.GetPropertyAsArray = GetPropertyAsArray;
/**
 * Get property value for the provided key from the web property bag
 *
 * @param {string} key Property key
 * @param {string} valueToAdd Value to add to the array
 * @param {string} delimiter Delimiter
 * @param {string} url URL for the web
 */
function UpdatePropertyArray(key, valueToAdd, delimiter = ",", url = _spPageContextInfo.siteAbsoluteUrl) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let array = yield GetPropertyAsArray(key, delimiter, url);
            array.push(valueToAdd);
            yield SetProperty(key, array.join(delimiter), url);
            return true;
        }
        catch (err) {
            return false;
        }
    });
}
exports.UpdatePropertyArray = UpdatePropertyArray;
/**
 * Get property value for the provided key from the web property bag
 *
 * @param {string} key Property key
 * @param {string} value Property value
 * @param {string} url URL for the web
 */
function SetProperty(key, value, url = _spPageContextInfo.siteAbsoluteUrl) {
    return __awaiter(this, void 0, void 0, function* () {
        const { ctx, web } = yield Util_1.getJsomContext(url);
        web.get_allProperties().set_item(key, value);
        web.update();
        yield Util_1.executeJsom(ctx);
        return;
    });
}
exports.SetProperty = SetProperty;
