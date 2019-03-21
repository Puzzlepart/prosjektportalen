"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Resources_1 = require("../../Resources");
const sp_1 = require("@pnp/sp");
const React = require("react");
const ReactDOM = require("react-dom");
const FormUtil = require("../FormUtils");
const RelatedFollowups_1 = require("./RelatedFollowups");
const _Components_1 = require("../../WebParts/@Components");
const _ = {
    DispForm: () => {
        const measuresList = sp_1.sp.web.lists.getByTitle(Resources_1.default.getResource("Lists_BenefitsFollowup_Title"));
        const id = "pp-related-gains-followup";
        const lookupField = "GtGainLookup";
        const container = FormUtil.insertFormContainer(id);
        measuresList
            .items
            .filter(`${lookupField}Id eq ${GetUrlKeyValue("ID")}`)
            .orderBy("GtMeasurementDate", false)
            .get().then(items => {
            ReactDOM.render(React.createElement(RelatedFollowups_1.RelatedFollowups, { followups: items }), container);
        });
    },
    AllItems: () => {
        const id = "pp-next-step";
        const container = FormUtil.insertFormContainer(id);
        ReactDOM.render(React.createElement("div", null,
            React.createElement(_Components_1.ChromeTitle, { title: Resources_1.default.getResource("BenefitAnalysis_NextStep_Title") }),
            React.createElement("p", null,
                Resources_1.default.getResource("BenefitAnalysis_NextStep_Text"),
                React.createElement("a", { href: `../../${Resources_1.default.getResource("DefaultView_Tasks_Url")}` }, Resources_1.default.getResource("BenefitAnalysis_NextStep_LinkText")),
                "\u200B.")), container);
    },
};
exports.default = _;
