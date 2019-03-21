"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Resources_1 = require("../../Resources");
const React = require("react");
const ReactDOM = require("react-dom");
const FormUtil = require("../FormUtils");
const _Components_1 = require("../../WebParts/@Components");
const _ = {
    NewForm: () => {
        //
    },
    EditForm: () => {
        //
    },
    DispForm: () => {
        //
    },
    AllItems: () => {
        const id = "pp-next-step";
        const container = FormUtil.insertFormContainer(id);
        ReactDOM.render((React.createElement("div", null,
            React.createElement(_Components_1.ChromeTitle, { title: Resources_1.default.getResource("ChangeAnalysis_NextStep_Title") }),
            React.createElement("p", null,
                "\u200B\u200B",
                Resources_1.default.getResource("ChangeAnalysis_NextStep_Text"),
                " ",
                React.createElement("a", { href: `../../${Resources_1.default.getResource("DefaultView_BenefitsAnalysis_Url")}` }, Resources_1.default.getResource("ChangeAnalysis_NextStep_LinkText")),
                "\u200B."))), container);
    },
};
exports.default = _;
