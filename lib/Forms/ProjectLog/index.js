"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _ = {
    NewForm: () => {
        const select = document.querySelectorAll("select");
        select.forEach(ele => {
            const options = ele.querySelectorAll("option");
            if (options.length === 0) {
                ele.parentNode.parentNode.parentNode.style.display = "none";
            }
        });
    },
    EditForm: () => {
        // EditForm
    },
    DispForm: () => {
        // DispForm
    },
};
exports.default = _;
