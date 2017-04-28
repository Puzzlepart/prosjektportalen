import * as moment from "moment";

/**
 * Formats a date using moment.js
 *
 * @param date Date
 * @param dFormat Date format
 * @param locale Date locale
 */
export const dateFormat = (date: string, dFormat = __("MomentDate_DefaultFormat"), locale = __("MomentDate_Locale")): string => {
    return moment(new Date(date).toISOString()).locale(locale).format(dFormat);
};

/**
 * Is the page in edit mode
 */
export const inEditMode = (): boolean => {
    return document.forms[MSOWebPartPageFormName].MSOLayout_InDesignMode.value === "1";
};

/**
 * Make URL relative
 *
 * @param absUrl Absolute URL
 */
export const makeRelative = (absUrl: string): string => {
    return absUrl.replace(document.location.protocol + "//" + document.location.hostname, "");
};

/**
 * Generates URL. Replaces norwegian characters and spaces.
 *
 * @param str The string
 */
export const generateUrl = (str: string): string => {
    return str
        .toLowerCase()
        .replace(/ /g, "-")
        .replace(/å/g, "aa")
        .replace(/æ/g, "ae")
        .replace(/ø/g, "oe");
};

/**
 * Cleans search property name
 *
 * @param searchProp Search property name
 */
export const cleanSearchPropName = (searchProp: string): string => {
    return searchProp.match(/(.*?)OWS*/)[1];
};

/**
 * Get user photo URL from userphoto.aspx
 *
 * @param email Email adress
 * @param size Size S/M/L
 */
export const userPhoto = (email: string, size = "L"): string => {
    return `${_spPageContextInfo.siteAbsoluteUrl}/${_spPageContextInfo.layoutsUrl}/userphoto.aspx?size=${size}&accountname=${email}`;
};

/**
 * Shows a user message using SP.UI
 *
 * @param title Title
 * @param message Message
 * @param color Color
 * @param duration Duration (ms)
 * @param reloadWhenDone Reload page when done
 * @param removeUrlParams Remove url params
 */
export const userMessage = (title: string, message: string, color: string, duration = 10000, reloadWhenDone = false, removeUrlParams = false): void => {
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
};

/**
 * Calculates percentage
 *
 * @param value1 Value 1
 * @param value2 Value 2
 * @param addPrefix Add prefix (%)
 */
export const percentage = (value1: number, value2: number, addPrefix = true): any => {
    let value = Math.floor((((value1 / value2)) * 100));
    if (addPrefix) {
        return `${value}%`;
    } else {
        return value;
    }
};

/**
 * Encodes spaces
 *
 * @param str The string
 */
export const encodeSpaces = (str: string): string => {
    return str.replace(/ /g, "%20");
};

/**
 * Sets item field value (supports text/choice, number and taxonomy)
 *
 * @param fieldName Field name
 * @param item SP list item
 * @param fieldValue Field value
 * @param ctx Client context
 * @param list SP list
 */
export const setItemFieldValue = (fieldName: string, item: SP.ListItem, fieldValue: any, ctx: SP.ClientContext, list: SP.List): void => {
    let fieldValueType = (typeof fieldValue);
    switch (fieldValueType) {
        case "string": {
            item.set_item(fieldName, fieldValue);
        }
            break;
        case "number": {
            item.set_item(fieldName, fieldValue);
        }
            break;
        case "object": {
            let { Label, TermGuid, get_termGuid } = fieldValue;
            if (TermGuid || get_termGuid) {
                let field = list.get_fields().getByInternalNameOrTitle(fieldName),
                    taxField: any = ctx.castTo(field, SP.Taxonomy.TaxonomyField),
                    taxSingle = new SP.Taxonomy.TaxonomyFieldValue();
                taxSingle.set_label(Label || fieldValue.get_label());
                taxSingle.set_termGuid(TermGuid || fieldValue.get_termGuid());
                taxSingle.set_wssId(-1);
                taxField.setFieldValueByValue(item, taxSingle);
            }
        }
            break;
    }
};

/**
 * Relods the page
 */
export const reloadPage = (): void => {
    document.location.href = _spPageContextInfo.serverRequestPath;
};

/**
 * Get safe term. The term object is different depending on if SP.Taxonomy is loaded on the page
 *
 * @param term Term
 */
export const getSafeTerm = (term) => {
    let obj = term;
    if (obj !== undefined) {
        if (obj.Label === undefined && obj.TermGuid === undefined && obj.WssId === undefined && obj.get_label !== undefined) {
            obj.Label = obj.get_label();
            obj.TermGuid = obj.get_termGuid();
            obj.WssId = obj.get_wssId();
        } else if (obj.get_label === undefined && obj.get_termGuid === undefined && obj.get_wssId === undefined) {
            obj.get_label = () => obj.Label;
            obj.get_termGuid = () => obj.TermGuid;
            obj.get_wssId = () => obj.WssId;
        }
    }
    return obj;
};

/**
 * Sets Taxonomy single value
 *
 * @param ctx Client context
 * @param list SP List
 * @param item SP list item
 * @param fieldName Field name
 * @param label Term label
 * @param termGuid Term GUID
 * @param wssId Term WSS ID
 */
export const setTaxonomySingleValue = (ctx, list, item, fieldName, label, termGuid, wssId = -1) => {
    let field = list.get_fields().getByInternalNameOrTitle(fieldName),
        taxField: any = ctx.castTo(field, SP.Taxonomy.TaxonomyField),
        taxSingle = new SP.Taxonomy.TaxonomyFieldValue();
    taxSingle.set_label(label);
    taxSingle.set_termGuid(termGuid);
    taxSingle.set_wssId(wssId);
    taxField.setFieldValueByValue(item, taxSingle);
    item.update();
};

/**
 * Ensure taxonomy
 *
 * @param loadTimeout Loading timeout (ms)
 */
export const ensureTaxonomy = (loadTimeout = 10000): Promise<void> => {
    return new Promise<void>((resolve, reject) => {
        let scriptbase = `${_spPageContextInfo.siteAbsoluteUrl}/_layouts/15`,
            sodKey = "_v_dictSod";
        if (!window[sodKey]["sp.taxonomy.js"]) {
            SP.SOD.registerSod("sp.taxonomy.js", `${scriptbase}/sp.taxonomy.js`);
        };
        SP.SOD.executeOrDelayUntilScriptLoaded(() => {
            SP.SOD.executeFunc("sp.taxonomy.js", "SP.Taxonomy", () => {
                SP.SOD.notifyScriptLoadedAndExecuteWaitingJobs("sp.taxonomy.js");
                resolve();
            });
        }, "sp.js");
        window.setTimeout(loadTimeout, reject);
    });
};

import { default as WaitDialog } from "./WaitDialog";
import { default as StampVersion } from "./StampVersion";

export { WaitDialog, StampVersion };
