"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const logging_1 = require("@pnp/logging");
const FormUtils = require("./FormUtils");
/**
 * Handle query parameters
 */
function HandleQueryParams() {
    let { HideContentTypeChoice, HideFormFields, HideWebPartMaintenancePageLink, HideViewSelector } = FormUtils.getQueryParams();
    if (HideContentTypeChoice === "1") {
        logging_1.Logger.log({ message: "(HandleQueryParams) HideContentTypeChoice specified in URL, hiding Content Type choice", level: 1 /* Info */, data: {} });
        FormUtils.hideContentTypeChoice();
    }
    if (HideWebPartMaintenancePageLink === "1") {
        logging_1.Logger.log({ message: "(HandleQueryParams) HideWebPartMaintenancePageLink specified in URL, hiding WebPartMaintenancePageLink", level: 1 /* Info */, data: {} });
        const linkDomElement = document.querySelector("a[id*='WebPartMaintenancePageLink']");
        if (linkDomElement) {
            linkDomElement.parentNode.parentNode.parentNode.parentNode.style.display = "none";
        }
    }
    if (HideFormFields) {
        const fieldsArray = HideFormFields.split(",");
        logging_1.Logger.log({ message: "(HandleQueryParams) HideFormFields specified in URL, hiding fields", level: 1 /* Info */, data: { fieldsArray } });
        fieldsArray.forEach(fName => FormUtils.hideFormField(fName));
    }
    if (HideViewSelector) {
        logging_1.Logger.log({ message: "(HandleQueryParams) HideViewSelector specified in URL, hiding .ms-csrlistview-controldiv", level: 1 /* Info */, data: {} });
        const divDomElement = document.querySelector(".ms-csrlistview-controldiv");
        if (divDomElement) {
            divDomElement.style.display = "none";
        }
    }
}
exports.default = HandleQueryParams;
