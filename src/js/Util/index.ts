import * as moment from "moment";

import { default as WaitDialog } from "./WaitDialog";
import { default as LoadTaxonomy } from "./LoadTaxonomy";
import { default as StampVersion } from "./StampVersion";


export const dateFormat = (date: string, dFormat = __("MomentDate_DefaultFormat"), locale = __("MomentDate_Locale")): string => {
    return moment(new Date(date).toISOString()).locale(locale).format(dFormat);
};

export const inEditMode = (): boolean => {
    return document.forms[MSOWebPartPageFormName].MSOLayout_InDesignMode.value === "1";
};

export const makeRelative = (absUrl: string): string => {
    return absUrl.replace(document.location.protocol + "//" + document.location.hostname, "");
};

export const generateUrl = (str: string): string => {
    return str
        .toLowerCase()
        .replace(/ /g, "-")
        .replace(/å/g, "aa")
        .replace(/æ/g, "ae")
        .replace(/ø/g, "oe");
};

export const cleanSearchPropName = (searchProp: string): string => {
    return searchProp.match(/(.*?)OWS*/)[1];
};

export const userPhoto = (email: string, size = "L"): string => {
    return `${_spPageContextInfo.siteAbsoluteUrl}/${_spPageContextInfo.layoutsUrl}/userphoto.aspx?size=${size}&accountname=${email}`;
};

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

export const percentage = (value1: number, value2: number, addPrefix = true): any => {
    let value = Math.floor((((value1 / value2)) * 100));
    if (addPrefix) {
        return `${value}%`;
    } else {
        return value;
    }
};

export const encodeSpaces = (str: string): string => {
    return str.replace(/ /g, "%20");
};

export const setItemFieldValue = (fieldName: string, item: SP.ListItem, fieldValue: any, ctx: SP.ClientContext, list: SP.List): void => {
    let fieldValueType = (typeof fieldValue);
    switch (fieldValueType) {
        case "string": {
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

export const reloadPage = (): void => {
    document.location.href = _spPageContextInfo.serverRequestPath;
};

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

export { WaitDialog, LoadTaxonomy, StampVersion };
