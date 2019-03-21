"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Resources_1 = require("../../Resources");
const React = require("react");
const Util = require("../../Util");
const _Components_1 = require("../../WebParts/@Components");
const FollowupElement = ({ data }) => {
    let dispFormUrl = `../../${Resources_1.default.getResource("DefaultView_BenefitsFollowup_Url")}?ID=${data.ID}`.replace("AllItems", "DispForm");
    return (React.createElement("li", null,
        React.createElement("h3", null,
            React.createElement(_Components_1.ModalLink, { label: Util.dateFormat(data.GtMeasurementDate, "LL"), url: dispFormUrl, options: { HideRibbon: true } })),
        React.createElement("p", { className: "ms-metadata" },
            React.createElement("b", null,
                Resources_1.default.getResource("SiteFields_GtMeasurementValue_DisplayName"),
                ":"),
            " ",
            data.GtMeasurementValue),
        React.createElement("p", { className: "ms-metadata", hidden: !Comment },
            React.createElement("b", null,
                Resources_1.default.getResource("String_Comment"),
                ":"),
            " ",
            data.GtMeasurementComment)));
};
exports.RelatedFollowups = ({ followups }) => {
    return (React.createElement("div", null,
        React.createElement(_Components_1.ChromeTitle, { title: Resources_1.default.getResource("Lists_BenefitsFollowup_Title") }),
        React.createElement("ul", { className: "pp-simpleList", style: { width: "300px" } }, followups.map((e, idx) => React.createElement(FollowupElement, { key: idx, data: e })))));
};
