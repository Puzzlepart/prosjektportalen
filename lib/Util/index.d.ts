/// <reference types="sharepoint" />
import ExportToExcel from "./ExportToExcel";
import WaitDialog from "./WaitDialog";
import StampVersion from "./StampVersion";
import GetBreakpoint from "./GetBreakpoint";
/**
 * HTML decodes the string
 *
 * @param {string} input Input
 */
export declare function htmlDecode(input: string): string;
/**
 * Formats a date using moment.js (defaults for dFormat and locale are set in resources)
 *
 * @param {string} date Date
 * @param {string} dFormat Date format
 * @param {string} locale Date locale
 */
export declare function dateFormat(date: string, dFormat?: string, locale?: string): string;
/**
 * Is the page in edit mode
 */
export declare function inEditMode(): boolean;
/**
 * Make URL relative
 *
 * @param {string} absUrl Absolute URL
 */
export declare function makeUrlRelativeToSite(absUrl: string): string;
/**
 * Make URL absolute
 *
 * @param {string} relUrl Absolute URL
 */
export declare function makeUrlAbsolute(relUrl: string): string;
/**
 * Clean string
 *
 * @param {string} str The string
 */
export declare function cleanString(str: string, length?: number): string;
/**
 * Cleans search property name
 *
 * @param {string} searchProp Search property name
 */
export declare function cleanSearchPropName(searchProp: string): string;
/**
 * Get user photo URL from userphoto.aspx
 *
 * @param {string} email Email adress
 * @param {string} size Size S/M/L
 */
export declare function userPhoto(email: string, size?: string): string;
/**
 * Converts a string to a hex color
 *
 * @param {string} str The string
 */
export declare function stringToColour(str: string): string;
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
export declare function userMessage(title: string, message: string, color: string, duration?: number, reloadWhenDone?: boolean, removeUrlParams?: boolean): void;
/**
 * Calculates percentage
 *
 * @param {number} startValue The start value, i.e. equal to 0%
 * @param {number} partValue The part of the target value you want to calculate percentage of
 * @param {number} targetValue The target value, i.e. equal to 100%
 * @param {boolean} addPrefix Add prefix (%)
 */
export declare function percentage(startValue: number, partValue: number, targetValue: number, addPrefix?: boolean): any;
/**
 * Encodes spaces
 *
 * @param {string} str The string
 */
export declare function encodeSpaces(str: string): string;
export declare enum SetItemFieldValueResult {
    ValueNull = 0,
    OK = 1,
    FieldTypeNotSupported = 2
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
export declare function setItemFieldValue(fieldName: string, item: SP.ListItem, fieldValue: any, fieldType: string, clientContext: SP.ClientContext, list: SP.List): SetItemFieldValueResult;
/**
 * Relods the page
 */
export declare function reloadPage(): void;
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
export declare function getSafeTerm(term: any): ISafeTerm;
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
export declare function setTaxonomySingleValue(ctx: SP.ClientContext, list: SP.List, item: SP.ListItem, fieldName: string, label: string, termGuid: any, wssId?: number): void;
/**
 * Ensure taxonomy
 *
 * @param {number} loadTimeout Loading timeout (ms)
 */
export declare const ensureTaxonomy: (loadTimeout?: number) => Promise<void>;
/**
 * Generate storage key with or without web prefix (_spPageContextInfo.webServerRelativeUrl)
 *
 * @param {string[]} parts Parts to include in the key
 * @param {boolean} addWebPrefix Should web prefix be added
 */
export declare function generateStorageKey(parts: string[], addWebPrefix?: boolean): string;
/**
 * Formats a string (containing a currency value) to currency
 *
 * @param {string} val The value
 * @param {string} prefix Currency prefix
 */
export declare function toCurrencyFormat(val: string, prefix?: string): string;
/**
 * Get client context for the specified URL
 *
 * @param {string} url The URL
 */
export declare const getClientContext: (url: string) => Promise<SP.ClientContext>;
/**
 * Executes a JSOM query using SP.ClientContext.executeQueryAsync. Allows for async-await
 *
 * @param {SP.ClientContext} ctx Client context
 * @param {SP.ClientObject[]} clientObjects Client objects to load
 */
export declare function executeJsom(ctx: SP.ClientContext, clientObjects?: SP.ClientObject[]): Promise<{
    sender: any;
    args: any;
    url: any;
}>;
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
export declare function getJsomContext(url: string): Promise<IJsomContext>;
/**
 * Get URL hash object
 *
 * @param {string} hash URL hash
 */
export declare function getUrlHash(hash?: string): {
    [key: string]: string;
};
/**
 * Set URL hash
 *
 * @param {Object} hashObject Hash object
 */
export declare function setUrlHash(hashObject: {
    [key: string]: string;
}): void;
/**
 * Get URL parts
 *
 * @param {string} serverRequestPath Server request path
 * @param {string} webServerRelativeUrl Web server relative url
 */
export declare function getUrlParts(serverRequestPath?: string, webServerRelativeUrl?: string): string[];
/**
 * Loads a 3rd party library using SP.SOD
 *
 * @param {string} filename Filename
 */
export declare function loadLibrary(filename: string): Promise<void>;
/**
 * Loads 3rd party libraries using SP.SOD
 *
 * @param {string[]} filenames Filenames
 */
export declare function loadLibraries(filenames: string[]): Promise<void>;
/**
 * Loads JSON configuration
 *
 * @param {string} name Config name
 */
export declare function loadJsonConfiguration<T>(name: string): Promise<T>;
/**
 * Sort an array alphabetically
 */
export declare function SortAlphabetically(a: any, b: any, prop: string): number;
export { ExportToExcel, WaitDialog, StampVersion, GetBreakpoint, };
