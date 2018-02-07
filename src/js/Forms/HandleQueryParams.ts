import { Logger, LogLevel } from "sp-pnp-js";
import * as FormUtils from "./FormUtils";

/**
 * Handle query parameters
 */
export default function HandleQueryParams() {
    let { HideContentTypeChoice, HideFormFields, HideWebPartMaintenancePageLink, HideViewSelector } = FormUtils.getQueryParams();
    if (HideContentTypeChoice === "1") {
        Logger.log({ message: "(HandleQueryParams) HideContentTypeChoice specified in URL, hiding Content Type choice", level: LogLevel.Info, data: {} });
        FormUtils.hideContentTypeChoice();
    }
    if (HideWebPartMaintenancePageLink === "1") {
        Logger.log({ message: "(HandleQueryParams) HideWebPartMaintenancePageLink specified in URL, hiding WebPartMaintenancePageLink", level: LogLevel.Info, data: {} });
        (document.querySelector("a[id*='WebPartMaintenancePageLink']") as any).parentNode.parentNode.parentNode.parentNode.style.display = "none";
    }
    if (HideFormFields) {
        const fieldsArray = (HideFormFields as string).split(",");
        Logger.log({ message: "(HandleQueryParams) HideFormFields specified in URL, hiding fields", level: LogLevel.Info, data: { fieldsArray } });
        fieldsArray.forEach(fName => FormUtils.hideFormField(fName));
    }
    if (HideViewSelector) {
        Logger.log({ message: "(HandleQueryParams) HideViewSelector specified in URL, hiding .ms-csrlistview-controldiv", level: LogLevel.Info, data: {} });
        (document.querySelector(".ms-csrlistview-controldiv") as any).style.display = "none";
    }
}
