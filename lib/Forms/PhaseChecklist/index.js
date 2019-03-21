"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Resources_1 = require("../../Resources");
const FormUtil = require("../FormUtils");
const _ = {
    NewForm: () => {
        // NewForm
    },
    EditForm: () => {
        FormUtil.overridePreSaveAction(() => {
            let formValidation = document.querySelector(".ms-formvalidation");
            if (formValidation) {
                formValidation.style.display = "none";
            }
            let status = document.querySelector("select[id*='GtChecklistStatus']").value;
            if (status === Resources_1.default.getResource("Choice_GtChecklistStatus_NotRelevant")) {
                let comment = document.querySelector("textarea[id*='GtComment']");
                if (comment.value === "") {
                    formValidation = document.createElement("div");
                    formValidation.classList.add("ms-formvalidation");
                    formValidation.innerText = Resources_1.default.getResource("SiteFields_GtChecklistStatus_FormValidation_NotRelevant");
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
exports.default = _;
