import * as  jQuery from "jquery";
import { Logger, LogLevel } from "sp-pnp-js";
import * as Util from "../Util";
import * as FormUtils from "./Util";
import { IBaseFormModifications } from "./Base";

const formModifications: { [key: string]: IBaseFormModifications } = {};
formModifications[__("Lists_ProjectLog_Url")] = require("./ProjectLog").default;
formModifications[__("Lists_MeetingCalendar_Url")] = require("./MeetingCalendar").default;
formModifications[__("Lists_PhaseChecklist_Url")] = require("./PhaseChecklist").default;
formModifications[__("Lists_ChangeAnalysis_Url")] = require("./ChangeAnalysis").default;
formModifications[__("Lists_BenefitsAnalysis_Url")] = require("./BenefitsAnalysis").default;

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
    let urlParts = Util.getUrlParts();
    let [list] = Object.keys(formModifications).filter(key => _spPageContextInfo.serverRequestPath.indexOf(key) !== -1);
    if (list) {
        if (urlParts[1] === "Lists") {
            formModifications[list][urlParts[3]]();
        } else {
            formModifications[list][urlParts[3]]();
        }
    }
    HandleQueryParams();
};

export { Initialize };
