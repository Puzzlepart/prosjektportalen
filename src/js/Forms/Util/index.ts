import * as  querystring from "querystring";
import * as  jQuery from "jquery";

export interface IQueryParams {
    HideWebPartMaintenancePageLink: "1" | "0";
    HideContentTypeChoice: "1" | "0";
    HideFormFields: "1" | "0";
    HideAddNew: "1" | "0";
    HideViewSelector: "1" | "0";
}

/**
 * Get query parameters using querystring
 */
export const getQueryParams = (): IQueryParams => {
    return querystring.parse(document.location.search.substring(1));
};

/**
 * Hides field in form
 *
 * @param fieldName Field name
 */
export const hideFormField = (fieldName: string): void => {
    jQuery(`input[id*='${fieldName}'], select[id*='${fieldName}']`).parents("tr").first().hide();
};

/**
 * Inserts form container with the specified ID
 *
 * @param id ID of form container
 * @param refNodeId Reference node ID
 */
export const insertFormContainer = (id: string, refNodeId = "WebPartWPQ1"): HTMLElement => {
    let refNode = document.getElementById(refNodeId),
        newNode = document.createElement("div");
    newNode.id = id;
    refNode.parentNode.insertBefore(newNode, refNode.nextSibling);
    return document.getElementById(id);
};

/**
 * Overrides pre save action with the specified function
 *
 * @param func Override function
 */
export const overridePreSaveAction = (func) => {
    let f = "PreSaveAction";
    window[f] = func;
};
