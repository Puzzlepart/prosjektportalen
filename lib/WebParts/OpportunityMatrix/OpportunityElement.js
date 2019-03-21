"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const Resources_1 = require("../../Resources");
const _Components_1 = require("../@Components");
const OpportunityElement = ({ item: { ID, Title }, style }) => {
    let dispFormUrl = `${_spPageContextInfo.webAbsoluteUrl}/${Resources_1.default.getResource("DefaultView_Uncertainties_Url").replace("AllItems", "DispForm")}?ID=${ID}`;
    return (React.createElement("div", { className: "opportunity-matrix-element", title: Title, style: style },
        React.createElement(_Components_1.ModalLink, { label: ID, url: dispFormUrl, options: { HideRibbon: true } })));
};
exports.default = OpportunityElement;
