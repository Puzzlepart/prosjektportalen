"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const Resources_1 = require("../../../Resources");
const Panel_1 = require("office-ui-fabric-react/lib/Panel");
const DynamicPortfolioFilter_1 = require("./DynamicPortfolioFilter");
/**
 * DynamicPortfolioFilter Panel
 *
 * @param {DynamicPortfolioFilterPanelProps} props Props
 */
const DynamicPortfolioFilterPanel = ({ filters, onFilterChange, onDismiss, isOpen, showIcons }) => {
    return (React.createElement(Panel_1.Panel, { isOpen: isOpen, isBlocking: true, onDismiss: onDismiss, headerText: Resources_1.default.getResource("String_Filters"), type: Panel_1.PanelType.smallFixedFar },
        React.createElement("div", { className: "ms-Grid" }, filters
            .filter(filter => filter.items.length > 1)
            .map((filter, idx) => (React.createElement(DynamicPortfolioFilter_1.default, { key: idx, filter: filter, onFilterChange: onFilterChange }))))));
};
exports.default = DynamicPortfolioFilterPanel;
