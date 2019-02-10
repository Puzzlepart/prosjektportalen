import * as queryString from "querystring";

/**
 * Get query parameters using querystring
 */
export function getQueryParams(): any {
    return queryString.parse(document.location.search.substring(1));
}

/**
 * Hides field in form
 *
 * @param {string} fieldName Field name
 */
export function hideFormField(fieldName: string): void {
    const domElements = (document.querySelector(`input[id*='${fieldName}_'], select[id*='${fieldName}_'], div[id*='${fieldName}_']`) as any);
    if (domElements) { domElements.parentNode.parentNode.style.display = "none"; }
}

/**
 * Hides content type choice
 */
export function hideContentTypeChoice(): void {
    const domElement = (document.querySelector(`select[id*='ContentTypeChoice']`) as any);
    if (domElement) { domElement.parentNode.parentNode.style.display = "none"; }
}

/**
 * Inserts form container with the specified ID
 *
 * @param {string} id ID of form container
 * @param {string} refNodeId Reference node ID
 */
export function insertFormContainer(id: string, refNodeId = "DeltaPlaceHolderMain"): HTMLElement {
    let refNode = document.getElementById(refNodeId),
        newNode = document.createElement("div");
    newNode.id = id;
    refNode.parentNode.insertBefore(newNode, refNode.nextSibling);
    return document.getElementById(id);
}

/**
 * Overrides pre save action with the specified function
 *
 * @param {Function} func Override function
 */
export function overridePreSaveAction(func): void {
    let f = "PreSaveAction";
    window[f] = func;
}
