"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const Icon_1 = require("office-ui-fabric-react/lib/Icon");
/**
 * Status element
 */
const StatusElement = ({ section, scrollTo }) => {
    function statusContents() {
        return { __html: (section.fieldName !== "GtOverallStatus" ? section.statusComment : section.statusValue) };
    }
    return (React.createElement("div", { className: "status-element ms-Grid-row" },
        React.createElement("div", { className: "status-icons ms-Grid-col ms-sm12 ms-md2 ms-lg2" },
            React.createElement(Icon_1.Icon, { iconName: section.iconName, className: section.statusProperties.statusClassName })),
        React.createElement("div", { className: "status-details ms-Grid-col ms-sm12 ms-md10 ms-lg8" },
            React.createElement("h3", null, section.name),
            React.createElement("h2", null, section.fieldName !== "GtOverallStatus" ? section.statusValue : ""),
            React.createElement("p", { dangerouslySetInnerHTML: statusContents() }))));
};
exports.default = StatusElement;
