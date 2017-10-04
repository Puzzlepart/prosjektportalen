import * as  querystring from "querystring";

/**
 * Query Params
 */
export interface IQueryParams {
    HideWebPartMaintenancePageLink: string;
    HideContentTypeChoice: string;
    HideFormFields: string;
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
    (document.querySelector(`input[id*='${fieldName}_'], select[id*='${fieldName}_'], div[id*='${fieldName}_']`) as any).parentNode.parentNode.style.display = "none";
};

/**
 * Hides content type choice
 */
export const hideContentTypeChoice = (): void => {
    (document.querySelector(`select[id*='ContentTypeChoice']`) as any).parentNode.parentNode.style.display = "none";
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
