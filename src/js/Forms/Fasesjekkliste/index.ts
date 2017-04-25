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
            if (status === "Ignorert" || status === "Ikke relevant") {
                let comment = jQuery("textarea[id*='GtComment']");
                if (comment.val() === "") {
                    comment.after(`<div class="ms-formvalidation">Du må angi en kommentar for hvorfor sjekklistepunktet har fått denne statusen.</div>`);
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
