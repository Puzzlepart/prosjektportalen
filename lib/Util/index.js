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
const Resources_1 = require("../Resources");
const moment = require("moment");
const sp_1 = require("@pnp/sp");
const logging_1 = require("@pnp/logging");
const ExportToExcel_1 = require("./ExportToExcel");
exports.ExportToExcel = ExportToExcel_1.default;
const WaitDialog_1 = require("./WaitDialog");
exports.WaitDialog = WaitDialog_1.default;
const StampVersion_1 = require("./StampVersion");
exports.StampVersion = StampVersion_1.default;
const PropertyBag_1 = require("./PropertyBag");
const GetBreakpoint_1 = require("./GetBreakpoint");
exports.GetBreakpoint = GetBreakpoint_1.default;
/**
 * HTML decodes the string
 *
 * @param {string} input Input
 */
function htmlDecode(input) {
    const e = document.createElement("div");
    e.innerHTML = input;
    return e.childNodes.length === 0 ? "" : e.childNodes[0].nodeValue;
}
exports.htmlDecode = htmlDecode;
/**
 * Formats a date using moment.js (defaults for dFormat and locale are set in resources)
 *
 * @param {string} date Date
 * @param {string} dFormat Date format
 * @param {string} locale Date locale
 */
function dateFormat(date, dFormat = Resources_1.default.getResource("MomentDate_DefaultFormat"), locale = Resources_1.default.getResource("MomentDate_Locale")) {
    return moment(new Date(date).toISOString()).locale(locale).format(dFormat);
}
exports.dateFormat = dateFormat;
/**
 * Is the page in edit mode
 */
function inEditMode() {
    return document.forms[MSOWebPartPageFormName].MSOLayout_InDesignMode.value === "1";
}
exports.inEditMode = inEditMode;
/**
 * Make URL relative
 *
 * @param {string} absUrl Absolute URL
 */
function makeUrlRelativeToSite(absUrl) {
    return absUrl.replace(document.location.protocol + "//" + document.location.hostname, "");
}
exports.makeUrlRelativeToSite = makeUrlRelativeToSite;
/**
 * Make URL absolute
 *
 * @param {string} relUrl Absolute URL
 */
function makeUrlAbsolute(relUrl) {
    const rootSite = document.location.protocol + "//" + document.location.hostname;
    if (!relUrl) {
        return rootSite;
    }
    if (relUrl.startsWith("http")) {
        return relUrl;
    }
    let properRelativeUrl = relUrl;
    if (!relUrl.startsWith("/")) {
        properRelativeUrl = "/" + relUrl;
    }
    return rootSite + properRelativeUrl;
}
exports.makeUrlAbsolute = makeUrlAbsolute;
/**
 * Clean string
 *
 * @param {string} str The string
 */
function cleanString(str, length) {
    str = str
        .trim()
        .toLowerCase()
        .replace(/ /g, "-")
        .replace(/å/g, "a")
        .replace(/æ/g, "ae")
        .replace(/ø/g, "o")
        .replace(/[^a-z0-9-]/gi, "");
    return str.substring(0, length ? length : Math.min(80, str.length));
}
exports.cleanString = cleanString;
/**
 * Cleans search property name
 *
 * @param {string} searchProp Search property name
 */
function cleanSearchPropName(searchProp) {
    return searchProp.match(/(.*?)OWS*/)[1];
}
exports.cleanSearchPropName = cleanSearchPropName;
/**
 * Get user photo URL from userphoto.aspx
 *
 * @param {string} email Email adress
 * @param {string} size Size S/M/L
 */
function userPhoto(email, size = "L") {
    return `${_spPageContextInfo.siteAbsoluteUrl}/${_spPageContextInfo.layoutsUrl}/userphoto.aspx?size=${size}&accountname=${email}`;
}
exports.userPhoto = userPhoto;
/**
 * Converts a string to a hex color
 *
 * @param {string} str The string
 */
function stringToColour(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    let colour = "#";
    for (let i = 0; i < 3; i++) {
        let value = (hash >> (i * 8)) & 0xFF;
        colour += ("00" + value.toString(16)).substr(-2);
    }
    return colour;
}
exports.stringToColour = stringToColour;
/**
 * Shows a user message using SP.UI
 *
 * @param {string} title Title
 * @param {string} message Message
 * @param {string} color Color
 * @param {number} duration Duration (ms)
 * @param {boolean} reloadWhenDone Reload page when done
 * @param {boolean} removeUrlParams Remove url params
 */
function userMessage(title, message, color, duration = 10000, reloadWhenDone = false, removeUrlParams = false) {
    const status = SP.UI.Status.addStatus(title, message);
    SP.UI.Status.setStatusPriColor(status, color);
    if (duration !== -1) {
        window.setTimeout(() => {
            SP.UI.Status.removeStatus(status);
            if (reloadWhenDone) {
                document.location.href = removeUrlParams ? document.location.href.replace(document.location.search, "") : document.location.href;
            }
        }, duration);
    }
}
exports.userMessage = userMessage;
/**
 * Calculates percentage
 *
 * @param {number} startValue The start value, i.e. equal to 0%
 * @param {number} partValue The part of the target value you want to calculate percentage of
 * @param {number} targetValue The target value, i.e. equal to 100%
 * @param {boolean} addPrefix Add prefix (%)
 */
function percentage(startValue, partValue, targetValue, addPrefix = true) {
    let value = Math.round(((partValue - startValue) / (targetValue - startValue)) * 100);
    if (addPrefix) {
        return `${value}%`;
    }
    else {
        return value;
    }
}
exports.percentage = percentage;
/**
 * Encodes spaces
 *
 * @param {string} str The string
 */
function encodeSpaces(str) {
    return str.replace(/ /g, "%20");
}
exports.encodeSpaces = encodeSpaces;
var SetItemFieldValueResult;
(function (SetItemFieldValueResult) {
    SetItemFieldValueResult[SetItemFieldValueResult["ValueNull"] = 0] = "ValueNull";
    SetItemFieldValueResult[SetItemFieldValueResult["OK"] = 1] = "OK";
    SetItemFieldValueResult[SetItemFieldValueResult["FieldTypeNotSupported"] = 2] = "FieldTypeNotSupported";
})(SetItemFieldValueResult = exports.SetItemFieldValueResult || (exports.SetItemFieldValueResult = {}));
/**
 * Sets item field value (supports text/choice, number, url and taxonomy)
 *
 * @param {string} fieldName Field name
 * @param {SP.ListItem} item SP list item
 * @param {any} fieldValue Field value
 * @param {string} fieldType Field type
 * @param {SP.ClientContext} ctx Client context
 * @param {SP.List} list SP list
 *
 * @returns {SetItemFieldValueResult} SetItemFieldValueResult
 */
function setItemFieldValue(fieldName, item, fieldValue, fieldType, clientContext, list) {
    if (fieldValue === null) {
        return SetItemFieldValueResult.ValueNull;
    }
    switch (fieldType) {
        case "Text":
        case "Note":
        case "Choice":
        case "MultiChoice":
        case "Number":
        case "User":
        case "UserMulti":
        case "Boolean":
        case "Currency": {
            item.set_item(fieldName, fieldValue);
            item.update();
            return SetItemFieldValueResult.OK;
        }
        case "TaxonomyFieldType": {
            setTaxonomySingleValue(clientContext, list, item, fieldName, (fieldValue.Label || fieldValue.get_label()), (fieldValue.TermGuid || fieldValue.get_termGuid()), -1);
            return SetItemFieldValueResult.OK;
        }
        case "TaxonomyFieldTypeMulti": {
            const taxonomyFieldValues = fieldValue.get_data();
            const listField = list.get_fields().getByInternalNameOrTitle(fieldName);
            const taxField = clientContext.castTo(listField, SP.Taxonomy.TaxonomyField);
            const taxMulti = new SP.Taxonomy.TaxonomyFieldValueCollection(clientContext, taxonomyFieldValues.map(t => `-1;#${t.get_label()}|${t.get_termGuid()}`).join(";#"), taxField);
            taxField.setFieldValueByValueCollection(item, taxMulti);
            return SetItemFieldValueResult.OK;
        }
        case "URL": {
            const webServerUrl = _spPageContextInfo.siteAbsoluteUrl.replace(_spPageContextInfo.siteServerRelativeUrl, "");
            const ctxRelativeUrl = clientContext.get_url().replace(webServerUrl, "");
            let url = fieldValue.get_url().replace("{webRelativeUrl}", ctxRelativeUrl).replace(/([^:]\/)\/+/g, "$1");
            let fieldUrlValue = new SP.FieldUrlValue();
            fieldUrlValue.set_url(url);
            fieldUrlValue.set_description(fieldValue.get_description());
            item.set_item(fieldName, fieldUrlValue);
            item.update();
            return SetItemFieldValueResult.OK;
        }
        case "DateTime": {
            item.set_item(fieldName, fieldValue.toISOString());
            item.update();
            return SetItemFieldValueResult.OK;
        }
        default: {
            return SetItemFieldValueResult.FieldTypeNotSupported;
        }
    }
}
exports.setItemFieldValue = setItemFieldValue;
/**
 * Relods the page
 */
function reloadPage() {
    document.location.href = _spPageContextInfo.serverRequestPath;
}
exports.reloadPage = reloadPage;
/**
 * Get safe term. The term object is different depending on if SP.Taxonomy is loaded on the page
 *
 * @param {any} term Term
 */
function getSafeTerm(term) {
    if (term === null) {
        return null;
    }
    if (term !== undefined) {
        if (term.Label === undefined && term.TermGuid === undefined && term.WssId === undefined && term.get_label !== undefined) {
            term.Label = term.get_label();
            term.TermGuid = term.get_termGuid();
            term.WssId = term.get_wssId();
        }
        else if (term.get_label === undefined && term.get_termGuid === undefined && term.get_wssId === undefined) {
            term.get_label = () => term.Label;
            term.get_termGuid = () => term.TermGuid;
            term.get_wssId = () => term.WssId;
        }
    }
    return term;
}
exports.getSafeTerm = getSafeTerm;
/**
 * Sets Taxonomy single value
 *
 * @param {SP.ClientContext} ctx Client context
 * @param {SP.List} list SP List
 * @param {SP.ListItem} item SP list item
 * @param {string} fieldName Field name
 * @param {string} label Term label
 * @param {any} termGuid Term GUID
 * @param {number} wssId Term WSS ID
 */
function setTaxonomySingleValue(ctx, list, item, fieldName, label, termGuid, wssId = -1) {
    const field = list.get_fields().getByInternalNameOrTitle(fieldName);
    const taxField = ctx.castTo(field, SP.Taxonomy.TaxonomyField);
    const taxSingle = new SP.Taxonomy.TaxonomyFieldValue();
    taxSingle.set_label(label);
    taxSingle.set_termGuid(termGuid);
    taxSingle.set_wssId(wssId);
    taxField.setFieldValueByValue(item, taxSingle);
    item.update();
}
exports.setTaxonomySingleValue = setTaxonomySingleValue;
/**
 * Ensure taxonomy
 *
 * @param {number} loadTimeout Loading timeout (ms)
 */
exports.ensureTaxonomy = (loadTimeout = 10000) => {
    return new Promise((resolve, reject) => {
        let scriptbase = `${_spPageContextInfo.siteAbsoluteUrl}/_layouts/15`, sodKey = "_v_dictSod";
        if (!window[sodKey]["sp.taxonomy.js"]) {
            SP.SOD.registerSod("sp.taxonomy.js", `${scriptbase}/sp.taxonomy.js`);
        }
        SP.SOD.executeOrDelayUntilScriptLoaded(() => {
            SP.SOD.executeFunc("sp.taxonomy.js", "SP.Taxonomy", () => {
                SP.SOD.notifyScriptLoadedAndExecuteWaitingJobs("sp.taxonomy.js");
                resolve();
            });
        }, "sp.js");
        window.setTimeout(reject, loadTimeout);
    });
};
/**
 * Generate storage key with or without web prefix (_spPageContextInfo.webServerRelativeUrl)
 *
 * @param {string[]} parts Parts to include in the key
 * @param {boolean} addWebPrefix Should web prefix be added
 */
function generateStorageKey(parts, addWebPrefix = true) {
    if (addWebPrefix) {
        const webPrefix = _spPageContextInfo.webServerRelativeUrl.replace(/[^\w\s]/gi, "");
        parts.unshift(webPrefix);
    }
    return parts.join("_");
}
exports.generateStorageKey = generateStorageKey;
/**
 * Formats a string (containing a currency value) to currency
 *
 * @param {string} val The value
 * @param {string} prefix Currency prefix
 */
function toCurrencyFormat(val, prefix = Resources_1.default.getResource("CurrencySymbol")) {
    let str = parseInt(val, 10).toString().split(".");
    if (str[0].length >= 5) {
        str[0] = str[0].replace(/(\d)(?=(\d{3})+$)/g, "$1 ");
    }
    if (str[1] && str[1].length >= 5) {
        str[1] = str[1].replace(/(\d{3})/g, "$1 ");
    }
    return prefix + str.join(" ");
}
exports.toCurrencyFormat = toCurrencyFormat;
/**
 * Get client context for the specified URL
 *
 * @param {string} url The URL
 */
exports.getClientContext = (url) => new Promise((resolve, reject) => {
    SP.SOD.executeFunc("sp.js", "SP.ClientContext", () => {
        const clientContext = new SP.ClientContext(url);
        resolve(clientContext);
    });
});
/**
 * Executes a JSOM query using SP.ClientContext.executeQueryAsync. Allows for async-await
 *
 * @param {SP.ClientContext} ctx Client context
 * @param {SP.ClientObject[]} clientObjects Client objects to load
 */
function executeJsom(ctx, clientObjects = []) {
    return new Promise((resolve, reject) => {
        clientObjects.forEach(clientObj => ctx.load(clientObj));
        ctx.executeQueryAsync((sender, args) => {
            resolve({ sender, args, url: ctx.get_url() });
        }, (sender, args) => {
            reject({ sender, args, url: ctx.get_url() });
        });
    });
}
exports.executeJsom = executeJsom;
/**
 * Gets JSOM context (IJsomContext) for the specified URL
 *
 * @param {string} url The URL
 */
function getJsomContext(url) {
    return __awaiter(this, void 0, void 0, function* () {
        const ctx = yield exports.getClientContext(url);
        const web = ctx.get_web();
        const propertyBag = web.get_allProperties();
        const lists = web.get_lists();
        return { ctx, web, propertyBag, lists };
    });
}
exports.getJsomContext = getJsomContext;
/**
 * Get URL hash object
 *
 * @param {string} hash URL hash
 */
function getUrlHash(hash = document.location.hash.substring(1)) {
    let hashObject = {};
    hash.split("&").map(str => {
        const [key, value] = str.split("=");
        hashObject[key] = value;
    });
    return hashObject;
}
exports.getUrlHash = getUrlHash;
/**
 * Set URL hash
 *
 * @param {Object} hashObject Hash object
 */
function setUrlHash(hashObject) {
    let hash = "#";
    let hashParts = Object.keys(hashObject).map(key => `${key}=${hashObject[key]}`);
    hash += hashParts.join("&");
    document.location.hash = hash;
}
exports.setUrlHash = setUrlHash;
/**
 * Get URL parts
 *
 * @param {string} serverRequestPath Server request path
 * @param {string} webServerRelativeUrl Web server relative url
 */
function getUrlParts(serverRequestPath = _spPageContextInfo.serverRequestPath, webServerRelativeUrl = _spPageContextInfo.webServerRelativeUrl) {
    return serverRequestPath.replace(".aspx", "").replace(webServerRelativeUrl, "").split("/");
}
exports.getUrlParts = getUrlParts;
/**
 * Loads a 3rd party library using SP.SOD
 *
 * @param {string} filename Filename
 */
function loadLibrary(filename) {
    return new Promise((resolve, reject) => {
        PropertyBag_1.GetProperty("pp_assetssiteurl").then(assetsUrl => {
            SP.SOD.registerSod(filename, `${assetsUrl}/SiteAssets/pp/libs/${filename}`);
            SP.SOD.executeFunc(filename, null, resolve);
        });
    });
}
exports.loadLibrary = loadLibrary;
/**
 * Loads 3rd party libraries using SP.SOD
 *
 * @param {string[]} filenames Filenames
 */
function loadLibraries(filenames) {
    return __awaiter(this, void 0, void 0, function* () {
        for (let i = 0; i < filenames.length; i++) {
            yield loadLibrary(filenames[i]);
        }
    });
}
exports.loadLibraries = loadLibraries;
/**
 * Loads JSON configuration
 *
 * @param {string} name Config name
 */
function loadJsonConfiguration(name) {
    return __awaiter(this, void 0, void 0, function* () {
        const assetsUrl = yield PropertyBag_1.GetProperty("pp_assetssiteurl");
        const assetsWeb = new sp_1.Web(makeUrlAbsolute(assetsUrl));
        const fileServerRelativeUrl = `${assetsUrl}/SiteAssets/pp/config/${name}.txt`;
        try {
            const json = yield assetsWeb.getFileByServerRelativeUrl(fileServerRelativeUrl).usingCaching().getJSON();
            return json;
        }
        catch (err) {
            logging_1.Logger.write(`[loadJsonConfiguration] Failed to load JSON from ${fileServerRelativeUrl}`, 3 /* Error */);
            return null;
        }
    });
}
exports.loadJsonConfiguration = loadJsonConfiguration;
/**
 * Sort an array alphabetically
 */
function SortAlphabetically(a, b, prop) {
    if (a[prop] < b[prop]) {
        return -1;
    }
    if (a[prop] > b[prop]) {
        return 1;
    }
    return 0;
}
exports.SortAlphabetically = SortAlphabetically;
