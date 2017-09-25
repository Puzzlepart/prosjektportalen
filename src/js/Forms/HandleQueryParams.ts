import * as  jQuery from "jquery";
import {
    Logger,
    LogLevel,
} from "sp-pnp-js";
import * as FormUtils from "./FormUtils";

/**
 * Handle query parameters
 */
const HandleQueryParams = () => {
    Logger.log({ message: "Forms: HandleQueryParams", level: LogLevel.Info, data: { queryParams: FormUtils.getQueryParams() } });
    let { HideContentTypeChoice, HideFormFields, HideWebPartMaintenancePageLink, HideAddNew, HideViewSelector } = FormUtils.getQueryParams();
    if (HideContentTypeChoice === "1") {
        Logger.log({ message: "HideContentTypeChoice specified in URL, hiding Content Type choice", level: LogLevel.Info, data: {} });
        FormUtils.hideContentTypeChoice();
    }
    if (HideWebPartMaintenancePageLink === "1") {
        Logger.log({ message: "HideWebPartMaintenancePageLink specified in URL, hiding WebPartMaintenancePageLink", level: LogLevel.Info, data: {} });
        jQuery("a[id*='WebPartMaintenancePageLink']").parents("table").first().hide();
    }
    if (HideFormFields) {
        const fieldsArray = HideFormFields.split(",");
        Logger.log({ message: "HideFormFields specified in URL, hiding fields", level: LogLevel.Info, data: { fieldsArray } });
        fieldsArray.forEach(fName => FormUtils.hideFormField(fName));
    }
    if (HideAddNew) {
        Logger.log({ message: "HideAddNew specified in URL, hiding .ms-list-addnew", level: LogLevel.Info, data: {} });
        jQuery(".ms-list-addnew").hide();
    }
    if (HideViewSelector) {
        Logger.log({ message: "HideViewSelector specified in URL, hiding .ms-csrlistview-controldiv", level: LogLevel.Info, data: {} });
        jQuery(".ms-csrlistview-controldiv").hide();
    }
};

export default HandleQueryParams;

