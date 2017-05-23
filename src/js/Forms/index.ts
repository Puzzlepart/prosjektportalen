import * as  jQuery from "jquery";
import { Logger, LogLevel } from "sp-pnp-js";
import * as FormUtils from "./Util";

const __forms = {
    "Prosjektlogg": require("./ProjectLog").default,
    "Mtekalender": require("./MeetingCalendar").default,
    "Fasesjekkliste": require("./PhaseChecklist").default,
    "Endringsanalyse": require("./ChangeAnalysis").default,
    "Gevinstanalyse og gevinstrealiseringsplan": require("./GainsAnalysis").default,
};

/**
 * Handle query parameters
 */
const HandleQueryParams = () => {
    Logger.log({ message: "Forms: HandleQueryParams", level: LogLevel.Info, data: { queryParams: FormUtils.getQueryParams() } });
    let { HideContentTypeChoice, HideFormFields, HideWebPartMaintenancePageLink, HideAddNew, HideViewSelector } = FormUtils.getQueryParams();
    if (HideContentTypeChoice === "1") {
        FormUtils.hideContentTypeChoice();
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
    Logger.log({ message: "Forms: Initialize", level: LogLevel.Info, data: {} });
    let [, , List, Form] = _spPageContextInfo.serverRequestPath.replace(".aspx", "").replace(_spPageContextInfo.webServerRelativeUrl, "").split("/");
    if (__forms.hasOwnProperty(List)) {
        if (__forms[List].hasOwnProperty(Form)) {
            __forms[List][Form]();
        }
    }
    HandleQueryParams();
};

export { Initialize };
