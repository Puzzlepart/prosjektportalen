import * as  jQuery from "jquery";
import * as FormUtils from "./Util";

const __forms = {
    "Prosjektlogg": require("./Prosjektlogg").default,
    "Mtekalender": require("./Motekalender").default,
    "Fasesjekkliste": require("./Fasesjekkliste").default,
    "Endringsanalyse": require("./Endringsanalyse").default,
    "Gevinstanalyse og gevinstrealiseringsplan": require("./Gevinstanalyse og gevinstrealiseringsplan").default,
};

/**
 * Handle query parameters
 */
const HandleQueryParams = () => {
    let { HideContentTypeChoice, HideFormFields, HideWebPartMaintenancePageLink, HideAddNew, HideViewSelector } = FormUtils.getQueryParams();
    if (HideContentTypeChoice === "1") {
        FormUtils.hideFormField("ContentTypeChoice");
    }
    if (HideWebPartMaintenancePageLink === "1") {
        jQuery("a[id*='WebPartMaintenancePageLink']").parents("table").first().hide();
    }
    if (HideFormFields) {
        HideFormFields.split(",").forEach(fName => FormUtils.hideFormField(fName));
    }
    if (HideAddNew) {
        jQuery(".ms-list-addnew").hide();
    }
    if (HideViewSelector) {
        jQuery(".ms-csrlistview-controldiv").hide();
    }
};

/**
 * Initialize form modifications and web parts
 */
const Initialize = () => {
    let [, , List, Form] = _spPageContextInfo.serverRequestPath.replace(".aspx", "").replace(_spPageContextInfo.webServerRelativeUrl, "").split("/");
    if (__forms.hasOwnProperty(List)) {
        if (__forms[List].hasOwnProperty(Form)) {
            __forms[List][Form]();
        }
    }
    HandleQueryParams();
};

export { Initialize };
