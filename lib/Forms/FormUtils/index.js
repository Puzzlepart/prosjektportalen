"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const queryString = require("querystring");
/**
 * Get query parameters using querystring
 */
function getQueryParams() {
    return queryString.parse(document.location.search.substring(1));
}
exports.getQueryParams = getQueryParams;
/**
 * Hides field in form
 *
 * @param {string} fieldName Field name
 */
function hideFormField(fieldName) {
    const domElements = document.querySelector(`input[id*='${fieldName}_'], select[id*='${fieldName}_'], div[id*='${fieldName}_']`);
    if (domElements) {
        domElements.parentNode.parentNode.style.display = "none";
    }
}
exports.hideFormField = hideFormField;
/**
 * Hides content type choice
 */
function hideContentTypeChoice() {
    const domElement = document.querySelector(`select[id*='ContentTypeChoice']`);
    if (domElement) {
        domElement.parentNode.parentNode.style.display = "none";
    }
}
exports.hideContentTypeChoice = hideContentTypeChoice;
/**
 * Inserts form container with the specified ID
 *
 * @param {string} id ID of form container
 * @param {string} refNodeId Reference node ID
 */
function insertFormContainer(id, refNodeId = "DeltaPlaceHolderMain") {
    let refNode = document.getElementById(refNodeId), newNode = document.createElement("div");
    newNode.id = id;
    refNode.parentNode.insertBefore(newNode, refNode.nextSibling);
    return document.getElementById(id);
}
exports.insertFormContainer = insertFormContainer;
/**
 * Overrides pre save action with the specified function
 *
 * @param {Function} func Override function
 */
function overridePreSaveAction(func) {
    let f = "PreSaveAction";
    window[f] = func;
}
exports.overridePreSaveAction = overridePreSaveAction;
