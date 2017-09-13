import * as  querystring from "querystring";
import * as  jQuery from "jquery";

/**
 * Query Params
 */
export interface IQueryParams {
    HideWebPartMaintenancePageLink: string;
    HideContentTypeChoice: string;
    HideFormFields: string;
    HideAddNew: string;
    HideViewSelector: string;
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
 * @param {string} fieldName Field name
 */
export const hideFormField = (fieldName: string): void => {
    const $fieldRow = jQuery(`input[id*='${fieldName}_'], select[id*='${fieldName}_'], div[id*='${fieldName}_']`).parents("tr").first();
    $fieldRow.hide();
};

/**
 * Hides content type choice
 */
export const hideContentTypeChoice = (): void => {
    const $ctcRow = jQuery(`select[id*='ContentTypeChoice']`).parents("tr").first();
    $ctcRow.hide();
};

/**
 * Inserts form container with the specified ID
 *
 * @param {string} id ID of form container
 * @param {string} refNodeId Reference node ID
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
 * @param {Function} func Override function
 */
export const overridePreSaveAction = (func): void => {
    let f = "PreSaveAction";
    window[f] = func;
};
