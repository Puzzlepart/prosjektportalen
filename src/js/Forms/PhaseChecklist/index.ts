import * as  jQuery from "jquery";
import RESOURCE_MANAGER from "localization";
import { IBaseFormModifications } from "../Base";
import * as FormUtil from "../FormUtils";

const _: IBaseFormModifications = {
    NewForm: () => {
        //
    },
    EditForm: () => {
        FormUtil.overridePreSaveAction(() => {
            jQuery(".ms-formvalidation").remove();
            let status = jQuery("select[id*='GtChecklistStatus'] option:selected").text();
            if (status === RESOURCE_MANAGER.getResource("Choice_GtChecklistStatus_NotRelevant")) {
                let comment = jQuery("textarea[id*='GtComment']");
                if (comment.val() === "") {
                    comment.after(`<div class="ms-formvalidation">${RESOURCE_MANAGER.getResource("SiteFields_GtChecklistStatus_FormValidation_NotRelevant")}</div>`);
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
