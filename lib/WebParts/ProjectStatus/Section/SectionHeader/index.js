"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const Resources_1 = require("../../../../Resources");
const Icon_1 = require("office-ui-fabric-react/lib/Icon");
const Util = require("../../../../Util");
const SectionHeaderDetails = ({ name, fieldName, statusValue, statusComment }) => {
    return (React.createElement("div", { className: "section-details ms-Grid-col ms-sm12 ms-md9 ms-lg9" },
        React.createElement("h3", null, name),
        React.createElement("div", { hidden: !fieldName },
            React.createElement("h2", null, statusValue),
            React.createElement("p", null, Util.htmlDecode(statusComment)))));
};
const SectionHeaderNavigate = ({ source, fallbackNavigateUrl }) => {
    let navUrl = null;
    if (source) {
        navUrl = `${_spPageContextInfo.webServerRelativeUrl}/${source}`;
    }
    if (fallbackNavigateUrl) {
        navUrl = fallbackNavigateUrl;
    }
    if (navUrl) {
        return (React.createElement("div", { className: "section-navigate-to ms-Grid-col ms-sm12 ms-md1 ms-lg1" },
            React.createElement("a", { href: navUrl },
                React.createElement(Icon_1.Icon, { iconName: "Forward", title: Resources_1.default.getResource("String_NavigateToList") }))));
    }
    return null;
};
const SectionHeader = ({ id, section, fallbackNavigateUrl }) => {
    return (React.createElement("div", { id: id, className: "ms-Grid" },
        React.createElement("div", { className: "section-header ms-Grid-row" },
            React.createElement("div", { className: "section-icons ms-Grid-col ms-sm12 ms-md2 ms-lg2" },
                React.createElement("div", { className: "ms-Grid-row" },
                    React.createElement("div", { className: "section-icons ms-Grid-col ms-sm12 ms-md6 ms-lg6" },
                        React.createElement(Icon_1.Icon, { iconName: section.iconName, className: section.statusProperties.statusClassName })))),
            React.createElement(SectionHeaderDetails, Object.assign({}, section)),
            React.createElement(SectionHeaderNavigate, { source: section.source, fallbackNavigateUrl: fallbackNavigateUrl }))));
};
exports.default = SectionHeader;
