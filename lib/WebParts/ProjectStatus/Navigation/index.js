"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const Resources_1 = require("../../../Resources");
const Icon_1 = require("office-ui-fabric-react/lib/Icon");
const react_scroll_1 = require("react-scroll");
const ExportReport_1 = require("../ExportReport");
const Navigation = ({ project, sections, exportType }) => {
    return (React.createElement("div", { className: "ms-Grid nav-status-container" },
        React.createElement("div", { className: "nav-details ms-Grid-row" },
            React.createElement("div", { className: "ms-Grid-col ms-md6" },
                React.createElement("h2", { className: "status-page-header" }, `${Resources_1.default.getResource("String_StatusReport")}: ${_spPageContextInfo.webTitle}`)),
            React.createElement("div", { className: " ms-Grid-col ms-md6" },
                React.createElement(ExportReport_1.default, { exportType: exportType, project: project, sections: sections }))),
        React.createElement("div", { className: "nav-links", hidden: sections.length === 0 }, sections.map((section, key) => (React.createElement(react_scroll_1.Link, { key: key, className: "nav-link", activeClass: "active", to: `section-${key}`, offset: -100, spy: true, smooth: true, duration: 300 },
            React.createElement(Icon_1.Icon, { iconName: section.iconName }),
            React.createElement("span", null, section.name)))))));
};
exports.default = Navigation;
