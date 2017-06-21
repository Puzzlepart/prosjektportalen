import * as  jQuery from "jquery";
import { Logger, LogLevel } from "sp-pnp-js";
import * as FormUtils from "./Util";

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

export default HandleQueryParams;

