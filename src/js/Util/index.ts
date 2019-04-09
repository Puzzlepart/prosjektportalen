import __ from "../Resources";
import * as moment from "moment";
import { Web } from "@pnp/sp";
import { Logger, LogLevel } from "@pnp/logging";
import ExportToExcel from "./ExportToExcel";
import WaitDialog from "./WaitDialog";
import StampVersion from "./StampVersion";
import { GetProperty } from "./PropertyBag";
import GetBreakpoint from "./GetBreakpoint";

declare var MSOWebPartPageFormName: string;

/**
 * HTML decodes the string
 *
 * @param {string} input Input
 */
export function htmlDecode(input: string): string {
    const element = document.createElement("div");
    element.innerHTML = input;
    return element.childNodes.length === 0 ? "" : element.childNodes[0].nodeValue;
}

/**
 * Formats a date using moment.js (defaults for format and locale are set in the resource files)
 *
 * @param {string | Date} date Date
 * @param {string} format Date format
 * @param {string} locale Date locale
 */
export function dateFormat(date: string | Date, format = __.getResource("MomentDate_DefaultFormat"), locale = __.getResource("MomentDate_Locale")): string {
    if (typeof date === "string") {
        return moment(new Date(date as string).toISOString()).locale(locale).format(format);
    }
    return moment((date as Date).toISOString()).locale(locale).format(format);
}

/**
 * Is the page in edit mode
 */
export function inEditMode(): boolean {
    return document.forms[MSOWebPartPageFormName].MSOLayout_InDesignMode.value === "1";
}

/**
 * Make URL relative
 *
 * @param {string} absUrl Absolute URL
 */
export function makeUrlRelativeToSite(absUrl: string): string {
    return absUrl.replace(document.location.protocol + "//" + document.location.hostname, "");
}

/**
 * Make URL absolute
 *
 * @param {string} relUrl Absolute URL
 */
export function makeUrlAbsolute(relUrl: string): string {
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

/**
 * Clean string
 *
 * @param {string} str The string
 */
export function cleanString(str: string, length?: number): string {
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

/**
 * Cleans search property name
 *
 * @param {string} searchProp Search property name
 */
export function cleanSearchPropName(searchProp: string): string {
    return searchProp.match(/(.*?)OWS*/)[1];
}


/**
 * Get user photo URL from userphoto.aspx
 *
 * @param {string} email Email adress
 * @param {string} size Size S/M/L
 */
export function userPhoto(email: string, size = "L"): string {
    return `${_spPageContextInfo.siteAbsoluteUrl}/${_spPageContextInfo.layoutsUrl}/userphoto.aspx?size=${size}&accountname=${email}`;
}

/**
 * Converts a string to a hex color
 *
 * @param {string} str The string
 */
export function stringToColour(str: string): string {
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
export function userMessage(title: string, message: string, color: string, duration = 10000, reloadWhenDone = false, removeUrlParams = false): void {
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

/**
 * Calculates percentage
 *
 * @param {number} startValue The start value, i.e. equal to 0%
 * @param {number} partValue The part of the target value you want to calculate percentage of
 * @param {number} targetValue The target value, i.e. equal to 100%
 * @param {boolean} addPrefix Add prefix (%)
 */
export function percentage(startValue: number, partValue: number, targetValue: number, addPrefix = true): any {
    let value = Math.round(((partValue - startValue) / (targetValue - startValue)) * 100);
    if (addPrefix) {
        return `${value}%`;
    } else {
        return value;
    }
}

/**
 * Encodes spaces
 *
 * @param {string} str The string
 */
export function encodeSpaces(str: string): string {
    return str.replace(/ /g, "%20");
}

export enum SetItemFieldValueResult {
    ValueNull,
    OK,
    FieldTypeNotSupported,
}

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
export function setItemFieldValue(fieldName: string, item: SP.ListItem, fieldValue: any, fieldType: string, clientContext: SP.ClientContext, list: SP.List): SetItemFieldValueResult {
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
            const taxonomyFieldValues = (fieldValue as SP.Taxonomy.TaxonomyFieldValueCollection).get_data();
            const listField = list.get_fields().getByInternalNameOrTitle(fieldName);
            const taxField: any = clientContext.castTo(listField, SP.Taxonomy.TaxonomyField);
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

/**
 * Relods the page
 */
export function reloadPage(): void {
    document.location.href = _spPageContextInfo.serverRequestPath;
}

export interface ISafeTerm {
    Label: string;
    TermGuid: any;
    WssId: number;
    get_label(): any;
    get_termGuid(): any;
    get_wssId(): any;
}

/**
 * Get safe term. The term object is different depending on if SP.Taxonomy is loaded on the page
 *
 * @param {any} term Term
 */
export function getSafeTerm(term): ISafeTerm {
    if (term === null) {
        return null;
    }
    if (term !== undefined) {
        if (term.Label === undefined && term.TermGuid === undefined && term.WssId === undefined && term.get_label !== undefined) {
            term.Label = term.get_label();
            term.TermGuid = term.get_termGuid();
            term.WssId = term.get_wssId();
        } else if (term.get_label === undefined && term.get_termGuid === undefined && term.get_wssId === undefined) {
            term.get_label = () => term.Label;
            term.get_termGuid = () => term.TermGuid;
            term.get_wssId = () => term.WssId;
        }
    }
    return term;
}

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
export function setTaxonomySingleValue(ctx: SP.ClientContext, list: SP.List, item: SP.ListItem, fieldName: string, label: string, termGuid, wssId = -1) {
    const field = list.get_fields().getByInternalNameOrTitle(fieldName);
    const taxField: any = ctx.castTo(field, SP.Taxonomy.TaxonomyField);
    const taxSingle = new SP.Taxonomy.TaxonomyFieldValue();
    taxSingle.set_label(label);
    taxSingle.set_termGuid(termGuid);
    taxSingle.set_wssId(wssId);
    taxField.setFieldValueByValue(item, taxSingle);
    item.update();
}

/**
 * Ensure taxonomy
 *
 * @param {number} loadTimeout Loading timeout (ms)
 */
export const ensureTaxonomy = (loadTimeout = 10000): Promise<void> => {
    return new Promise<void>((resolve, reject) => {
        let scriptbase = `${_spPageContextInfo.siteAbsoluteUrl}/_layouts/15`,
            sodKey = "_v_dictSod";
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
export function generateStorageKey(parts: string[], addWebPrefix = true) {
    if (addWebPrefix) {
        const webPrefix = _spPageContextInfo.webServerRelativeUrl.replace(/[^\w\s]/gi, "");
        parts.unshift(webPrefix);
    }
    return parts.join("_");
}

/**
 * Formats a string (containing a currency value) to currency
 *
 * @param {string} val The value
 * @param {string} prefix Currency prefix
 */
export function toCurrencyFormat(val: string, prefix = __.getResource("CurrencySymbol")): string {
    let str = parseInt(val, 10).toString().split(".");
    if (str[0].length >= 5) {
        str[0] = str[0].replace(/(\d)(?=(\d{3})+$)/g, "$1 ");
    }
    if (str[1] && str[1].length >= 5) {
        str[1] = str[1].replace(/(\d{3})/g, "$1 ");
    }
    return prefix + str.join(" ");
}

/**
 * Get client context for the specified URL
 *
 * @param {string} url The URL
 */
export const getClientContext = (url: string) => new Promise<SP.ClientContext>((resolve, reject) => {
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
export function executeJsom(ctx: SP.ClientContext, clientObjects: SP.ClientObject[] = []) {
    return new Promise<{ sender, args, url }>((resolve, reject) => {
        clientObjects.forEach(clientObj => ctx.load(clientObj));
        ctx.executeQueryAsync((sender, args) => {
            resolve({ sender, args, url: ctx.get_url() });
        }, (sender, args) => {
            reject({ sender, args, url: ctx.get_url() });
        });
    });
}

export interface IJsomContext {
    ctx: SP.ClientContext;
    web: SP.Web;
    propertyBag: SP.PropertyValues;
    lists: SP.ListCollection;
}

/**
 * Gets JSOM context (IJsomContext) for the specified URL
 *
 * @param {string} url The URL
 */
export async function getJsomContext(url: string): Promise<IJsomContext> {
    const ctx = await getClientContext(url);
    const web = ctx.get_web();
    const propertyBag = web.get_allProperties();
    const lists = web.get_lists();
    return { ctx, web, propertyBag, lists };
}

/**
 * Get URL hash object
 *
 * @param {string} hash URL hash
 */
export function getUrlHash(hash = document.location.hash.substring(1)): { [key: string]: string } {
    let hashObject: { [key: string]: string } = {};
    hash.split("&").map(str => {
        const [key, value] = str.split("=");
        hashObject[key] = value;
    });
    return hashObject;
}

/**
 * Set URL hash
 *
 * @param {Object} hashObject Hash object
 */
export function setUrlHash(hashObject: { [key: string]: string }): void {
    let hash = "#";
    let hashParts = Object.keys(hashObject).map(key => `${key}=${hashObject[key]}`);
    hash += hashParts.join("&");
    document.location.hash = hash;
}

/**
 * Get URL parts
 *
 * @param {string} serverRequestPath Server request path
 * @param {string} webServerRelativeUrl Web server relative url
 */
export function getUrlParts(serverRequestPath = _spPageContextInfo.serverRequestPath, webServerRelativeUrl = _spPageContextInfo.webServerRelativeUrl): string[] {
    return serverRequestPath.replace(".aspx", "").replace(webServerRelativeUrl, "").split("/");
}

/**
 * Loads a 3rd party library using SP.SOD
 *
 * @param {string} filename Filename
 */
export function loadLibrary(filename: string): Promise<void> {
    return new Promise<void>((resolve, reject) => {
        GetProperty("pp_assetssiteurl").then(assetsUrl => {
            SP.SOD.registerSod(filename, `${assetsUrl}/SiteAssets/pp/libs/${filename}`);
            SP.SOD.executeFunc(filename, null, resolve);
        });
    });
}

/**
 * Loads 3rd party libraries using SP.SOD
 *
 * @param {string[]} filenames Filenames
 */
export async function loadLibraries(filenames: string[]): Promise<void> {
    for (let i = 0; i < filenames.length; i++) {
        await loadLibrary(filenames[i]);
    }
}

/**
 * Loads JSON configuration
 *
 * @param {string} name Config name
 */
export async function loadJsonConfiguration<T>(name: string): Promise<T> {
    const assetsUrl = await GetProperty("pp_assetssiteurl");
    const assetsWeb = new Web(makeUrlAbsolute(assetsUrl));
    const fileServerRelativeUrl = `${assetsUrl}/SiteAssets/pp/config/${name}.txt`;
    try {
        const json = await assetsWeb.getFileByServerRelativeUrl(fileServerRelativeUrl).usingCaching().getJSON();
        return json;
    } catch (err) {
        Logger.write(`[loadJsonConfiguration] Failed to load JSON from ${fileServerRelativeUrl}`, LogLevel.Error);
        return null;
    }
}

/**
 * Sort an array alphabetically
 */
export function SortAlphabetically(a, b, prop: string): number {
    if (a[prop] < b[prop]) { return -1; }
    if (a[prop] > b[prop]) { return 1; }
    return 0;
}


export {
    ExportToExcel,
    WaitDialog,
    StampVersion,
    GetBreakpoint,
};
