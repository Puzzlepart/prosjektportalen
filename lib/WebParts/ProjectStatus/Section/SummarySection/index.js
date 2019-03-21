"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const Icon_1 = require("office-ui-fabric-react/lib/Icon");
const react_scroll_1 = require("react-scroll");
const StatusElement_1 = require("./StatusElement");
const ProjectInfo_1 = require("../../../ProjectInfo");
const SummarySectionHeader = ({ title, titleUrl }) => {
    return (React.createElement("div", { hidden: !title, className: "ms-Grid-row" },
        React.createElement("div", { className: "ms-Grid-col ms-sm12" },
            React.createElement("div", { className: "ms-Grid" },
                React.createElement("div", { className: "section-header ms-Grid-row" },
                    React.createElement("div", { className: "section-details ms-Grid-col ms-sm12 ms-md11 ms-lg11" },
                        React.createElement("h1", null, title)),
                    React.createElement("div", { className: "section-navigate-to ms-Grid-col ms-sm12 ms-md1 ms-lg1" },
                        React.createElement("a", { href: titleUrl },
                            React.createElement(Icon_1.Icon, { iconName: "Forward" }))))))));
};
const SummarySectionProjectData = ({ propertiesLabel, webUrl }) => {
    return (React.createElement("div", { className: "ms-Grid-col ms-lg12 ms-xl4 status-project-data" },
        React.createElement("div", { className: "status-elements" },
            React.createElement("div", { className: "status-element" },
                React.createElement("div", { className: "status-icons ms-Grid-col ms-sm12 ms-md2 ms-lg2" },
                    React.createElement(Icon_1.Icon, { iconName: "CustomList" })),
                React.createElement("div", { className: "status-details ms-Grid-col ms-sm12 ms-md10 ms-lg8" },
                    React.createElement("h2", null, propertiesLabel),
                    React.createElement("h1", null),
                    React.createElement(ProjectInfo_1.default, { hideChrome: true, webUrl: webUrl, showActionLinks: false, showMissingPropsWarning: false, filterField: "GtPcProjectStatus", labelSize: "m", valueSize: "s" }))))));
};
exports.SummarySectionStatusColumns = ({ sections }) => {
    const statusElements = sections.map((section, key) => (React.createElement(StatusElement_1.default, { key: key, section: section, scrollTo: `section-${key}` })));
    const statusElementsOdd = statusElements.filter((_, idx) => idx % 2 === 0);
    const statusElementsEven = statusElements.filter((_, idx) => idx % 2 !== 0);
    return (React.createElement("div", { className: "ms-Grid-col ms-lg12 ms-xl8" },
        React.createElement("div", { className: "status-elements" },
            React.createElement("div", { className: "ms-Grid" },
                React.createElement("div", { className: "ms-Grid-row" },
                    React.createElement("div", { className: "ms-Grid-col ms-sm6" }, statusElementsOdd),
                    React.createElement("div", { className: "ms-Grid-col ms-sm6" }, statusElementsEven))))));
};
const SummarySection = ({ title, titleUrl, sections, webUrl = _spPageContextInfo.webAbsoluteUrl, style, propertiesLabel }) => {
    return (React.createElement(react_scroll_1.Element, { name: "status-section", className: "status-section section ms-Grid-row", style: style },
        React.createElement("div", { className: "ms-Grid-col ms-sm12" },
            React.createElement("div", { className: "ms-Grid" },
                React.createElement(SummarySectionHeader, { title: title, titleUrl: titleUrl }),
                React.createElement("div", { className: "ms-Grid-row" },
                    React.createElement(SummarySectionProjectData, { propertiesLabel: propertiesLabel, webUrl: webUrl }),
                    React.createElement(exports.SummarySectionStatusColumns, { sections: sections }))))));
};
exports.default = SummarySection;
