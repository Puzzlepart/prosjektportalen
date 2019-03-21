"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const Resources_1 = require("../../Resources");
const _Components_1 = require("../../WebParts/@Components");
const LogElement = ({ data }) => {
    let dispFormUrl = `${_spPageContextInfo.webAbsoluteUrl}/${Resources_1.default.getResource("DefaultView_ProjectLog_Url")}?ID=${data.ID}`.replace("AllItems", "DispForm");
    return (React.createElement("li", null,
        React.createElement("h3", null,
            React.createElement(_Components_1.ModalLink, { label: data.Title, url: dispFormUrl, options: { HideRibbon: true } })),
        React.createElement("p", { className: "ms-metadata" }, data.GtProjectLogDescription)));
};
const RelatedLogElements = ({ logElements }) => {
    return (React.createElement("div", { className: "container", style: { marginTop: "25px" } },
        React.createElement(_Components_1.ChromeTitle, { title: Resources_1.default.getResource("WebPart_RelatedLogElements_Title") }),
        React.createElement("ul", { className: "pp-simpleList", style: { width: "300px" } }, logElements.map(e => React.createElement(LogElement, { data: e })))));
};
exports.default = RelatedLogElements;
