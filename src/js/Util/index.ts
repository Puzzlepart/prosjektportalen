import Localization from "localization";
import * as moment from "moment";
import { sp } from "sp-pnp-js";
import AudienceTargeting from "../WebParts/AudienceTargeting";
import WaitDialog from "./WaitDialog";
import StampVersion from "./StampVersion";

declare var MSOWebPartPageFormName: string;

/**
 * HTML decodes the string
 *
 * @param {string} input Input
 */
export const htmlDecode = (input: string): string => {
    const e = document.createElement("div");
    e.innerHTML = input;
    return e.childNodes.length === 0 ? "" : e.childNodes[0].nodeValue;
};

/**
 * Is the current user in the specified group
 *
 * @param {any} group The group to check
 */
const isCurrentUserInGroup = (group) => new Promise<boolean>(resolve => {
    group
        .users.get()
        .then(users => {
            resolve(Array.contains(users.map(user => user.Id), _spPageContextInfo.userId));
        })
        .catch(_ => resolve(false));
});

/**
 * Is the current user in the visitors group
 */
export const isCurrentUserInVisitorsGroup = () => isCurrentUserInGroup(sp.web.associatedVisitorGroup);

/**
 * Is the current user in the members group
 */
export const isCurrentUserInMembersGroup = () => isCurrentUserInGroup(sp.web.associatedMemberGroup);

/**
 * Is the current user in the owners group
 */
export const isCurrentUserInOwnersGroup = () => isCurrentUserInGroup(sp.web.associatedOwnerGroup);

/**
 * Does the current user match the audience target
 *
 * @param {AudienceTargeting} audienceTarget Audience target
 */
export const doesUserMatchAudience = (audienceTarget: AudienceTargeting) => new Promise<boolean>(resolve => {
    switch (audienceTarget) {
        case AudienceTargeting.None: {
            resolve(true);
        }
            break;
        case AudienceTargeting.Visitors: {
            isCurrentUserInVisitorsGroup().then(bool => resolve(bool));
        }
            break;
        case AudienceTargeting.Members: {
            isCurrentUserInMembersGroup().then(bool => resolve(bool));
        }
            break;
        case AudienceTargeting.Owners: {
            if (_spPageContextInfo.hasOwnProperty("isSiteAdmin") && _spPageContextInfo["isSiteAdmin"] === true) {
                resolve(true);
            } else {
                isCurrentUserInOwnersGroup().then(bool => resolve(bool));
            }
        }
            break;
        default: {
            resolve(true);
        }
    }
});

/**
 * Formats a date using moment.js (defaults for dFormat and locale are set in resources)
 *
 * @param {string} date Date
 * @param {string} dFormat Date format
 * @param {string} locale Date locale
 */
export const dateFormat = (date: string, dFormat = Localization.getResource("MomentDate_DefaultFormat"), locale = Localization.getResource("MomentDate_Locale")): string => {
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
 * @param {string} absUrl Absolute URL
 */
export const makeRelative = (absUrl: string): string => {
    return absUrl.replace(document.location.protocol + "//" + document.location.hostname, "");
};

/**
 * Make URL absolute
 *
 * @param {string} relUrl Absolute URL
 */
export const makeAbsolute = (relUrl: string): string => {
    if (relUrl.startsWith("http")) {
        return relUrl;
    }
    let properRelativeUrl = relUrl;
    if (!relUrl.startsWith("/")) {
        properRelativeUrl = "/" + relUrl;
    }
    return document.location.protocol + "//" + document.location.hostname + properRelativeUrl;
};
/**
 * Generates URL. Replaces norwegian characters and spaces.
 *
 * @param {string} str The string
 */
export const generateUrl = (str: string, length?: number): string => {
    str = str
        .trim()
        .toLowerCase()
        .replace(/ /g, "-")
        .replace(/å/g, "a")
        .replace(/æ/g, "ae")
        .replace(/ø/g, "o")
        .replace(/[^a-z0-9-]/gi, "");
    return str.substring(0, length ? length : Math.min(80, str.length));
};

/**
 * Cleans search property name
 *
 * @param {string} searchProp Search property name
 */
export const cleanSearchPropName = (searchProp: string): string => {
    return searchProp.match(/(.*?)OWS*/)[1];
};

export enum UserPhotoSource {
    UserPhotoAspx,
    OWA,
}

/**
 * Get user photo URL from userphoto.aspx
 *
 * @param {string} email Email adress
 * @param {string} source User photo source (OWA is not supported on premise)
 * @param {string} size Size S/M/L
 */
export const userPhoto = (email: string, source = UserPhotoSource.UserPhotoAspx, size = "L"): string => {
    switch (source) {
        case UserPhotoSource.UserPhotoAspx: {
            return `${_spPageContextInfo.siteAbsoluteUrl}/${_spPageContextInfo.layoutsUrl}/userphoto.aspx?size=${size}&accountname=${email}`;
        }
        case UserPhotoSource.OWA: {
            return `https://outlook.office.com/owa/service.svc/s/GetPersonaPhoto?email=${email}&UA=0&size=HR120x120`;
        }
    }
};

/**
 * Converts a string to a hex color
 *
 * @param {string} str The string
 */
export const stringToColour = (str: string): string => {
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
};

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
 * @param {number} startValue The start value, i.e. equal to 0%
 * @param {number} partValue The part of the target value you want to calculate percentage of
 * @param {number} targetValue The target value, i.e. equal to 100%
 * @param {boolean} addPrefix Add prefix (%)
 */
export const percentage = (startValue: number, partValue: number, targetValue: number, addPrefix = true): any => {
    let value = Math.round(((partValue - startValue) / (targetValue - startValue)) * 100);
    if (addPrefix) {
        return `${value}%`;
    } else {
        return value;
    }
};

/**
 * Encodes spaces
 *
 * @param {string} str The string
 */
export const encodeSpaces = (str: string): string => {
    return str.replace(/ /g, "%20");
};

/**
 * Sets item field value (supports text/choice, number and taxonomy)
 *
 * @param {string} fieldName Field name
 * @param {SP.ListItem} item SP list item
 * @param {any} fieldValue Field value
 * @param {SP.ClientContext} ctx Client context
 * @param {SP.List} list SP list
 */
export const setItemFieldValue = (fieldName: string, item: SP.ListItem, fieldValue: any, ctx: SP.ClientContext, list: SP.List): void => {
    if (fieldValue === null) {
        return;
    }
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
            let { Label, TermGuid, get_termGuid, get_url, get_description } = fieldValue;
            if (TermGuid || get_termGuid) {
                let field = list.get_fields().getByInternalNameOrTitle(fieldName),
                    taxField: any = ctx.castTo(field, SP.Taxonomy.TaxonomyField),
                    taxSingle = new SP.Taxonomy.TaxonomyFieldValue();
                taxSingle.set_label(Label || fieldValue.get_label());
                taxSingle.set_termGuid(TermGuid || fieldValue.get_termGuid());
                taxSingle.set_wssId(-1);
                taxField.setFieldValueByValue(item, taxSingle);
            }
            if (get_url && get_description) {
                const webServerUrl = _spPageContextInfo.siteAbsoluteUrl.replace(_spPageContextInfo.siteServerRelativeUrl, "");
                const ctxRelativeUrl = ctx.get_url().replace(webServerUrl, "");
                let url = fieldValue.get_url()
                    .replace("{webRelativeUrl}", ctxRelativeUrl)
                    .replace(/([^:]\/)\/+/g, "$1");
                let fieldUrlValue = new SP.FieldUrlValue();
                fieldUrlValue.set_url(url);
                fieldUrlValue.set_description(fieldValue.get_description());
                item.set_item(fieldName, fieldUrlValue);
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

interface ISafeTerm {
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
export const getSafeTerm = (term): ISafeTerm => {
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
};

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
export const setTaxonomySingleValue = (ctx: SP.ClientContext, list: SP.List, item: SP.ListItem, fieldName: string, label: string, termGuid, wssId = -1) => {
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
        window.setTimeout(loadTimeout, reject);
    });
};

/**
 * Generate storage key with or without web prefix (_spPageContextInfo.webServerRelativeUrl)
 *
 * @param {string[]} parts Parts to include in the key
 * @param {boolean} addWebPrefix Should web prefix be added
 */
export const generateStorageKey = (parts: string[], addWebPrefix = true) => {
    const webPrefix = _spPageContextInfo.webServerRelativeUrl.replace(/[^\w\s]/gi, "");
    if (addWebPrefix) {
        parts.unshift(webPrefix);
    }
    return parts.join("_");
};

/**
 * Formats a string (containing a currency value) to currency
 *
 * @param {string} val The value
 * @param {string} prefix Currency prefix
 */
export const toCurrencyFormat = (val: string, prefix = Localization.getResource("CurrencySymbol")): string => {
    let str = parseInt(val, 10).toString().split(".");
    if (str[0].length >= 5) {
        str[0] = str[0].replace(/(\d)(?=(\d{3})+$)/g, "$1 ");
    }
    if (str[1] && str[1].length >= 5) {
        str[1] = str[1].replace(/(\d{3})/g, "$1 ");
    }
    return prefix + str.join(" ");
};

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
 * Get URL hash object
 */
export const getUrlHash = (): { [key: string]: string } => {
    const hash = document.location.hash.substring(1);
    let hashObject: { [key: string]: string } = {};
    hash.split("&").map(str => {
        const [key, value] = str.split("=");
        hashObject[key] = value;
    });
    return hashObject;
};

/**
 * Set URL hash
 *
 * @param {Object} hashObject Hash object
 */
export const setUrlHash = (hashObject: { [key: string]: string }): void => {
    let hash = "#";
    let hashParts = Object.keys(hashObject).map(key => `${key}=${hashObject[key]}`);
    hash += hashParts.join("&");
    document.location.hash = hash;
};

/**
 * Get URL parts
 */
export const getUrlParts = (): string[] => {
    return _spPageContextInfo.serverRequestPath.replace(".aspx", "").replace(_spPageContextInfo.webServerRelativeUrl, "").split("/");
};

export {
    WaitDialog,
    StampVersion,
};
