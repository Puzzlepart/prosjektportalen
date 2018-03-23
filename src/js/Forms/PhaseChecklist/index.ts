import RESOURCE_MANAGER from "../../Resources";
import { IBaseFormModifications } from "../Base";
import * as FormUtil from "../FormUtils";

const _: IBaseFormModifications = {
    NewForm: () => {
        // NewForm
    },
    EditForm: () => {
        FormUtil.overridePreSaveAction(() => {
            let formValidation: any = document.querySelector(".ms-formvalidation");
            if (formValidation) {
                formValidation.style.display = "none";
            }
            let status = (document.querySelector("select[id*='GtChecklistStatus']") as any).value;
            if (status === RESOURCE_MANAGER.getResource("Choice_GtChecklistStatus_NotRelevant")) {
                let comment: any = document.querySelector("textarea[id*='GtComment']");
                if (comment.value === "") {
                    formValidation = document.createElement("div");
                    formValidation.classList.add("ms-formvalidation");
                    formValidation.innerText = RESOURCE_MANAGER.getResource("SiteFields_GtChecklistStatus_FormValidation_NotRelevant");
                    comment.parentNode.insertBefore(formValidation, comment.nextSibling);
                    return false;
                }
            }
            return true;
        });
    },
    DispForm: () => {
        // DispForm
    },
};

export default _;
