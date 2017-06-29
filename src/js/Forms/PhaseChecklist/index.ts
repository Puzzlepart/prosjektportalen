import * as  jQuery from "jquery";
import { IBaseFormModifications } from "../Base";
import * as FormUtil from "../Util";

const _: IBaseFormModifications = {
    NewForm: () => {
        //
    },
    EditForm: () => {
        FormUtil.overridePreSaveAction(() => {
            jQuery(".ms-formvalidation").remove();
            let status = jQuery("select[id*='GtChecklistStatus'] option:selected").text();
            if (status === __("Choice_GtChecklistStatus_NotRelevant")) {
                let comment = jQuery("textarea[id*='GtComment']");
                if (comment.val() === "") {
                    comment.after(`<div class="ms-formvalidation">${__("SiteFields_GtChecklistStatus_FormValidation_NotRelevant")}</div>`);
                    return false;
                }
            }
            return true;
        });
    },
    DispForm: () => {
        //
    },
};

export default _;
