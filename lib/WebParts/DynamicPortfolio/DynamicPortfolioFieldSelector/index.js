"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Resources_1 = require("../../../Resources");
const DynamicPortfolioFieldSelector = {
    fieldName: "Fields",
    name: Resources_1.default.getResource("DynamicPortfolio_FieldSelector_Name"),
    key: "Fields",
    emptyMessage: Resources_1.default.getResource("DynamicPortfolio_FieldSelector_EmptyMessage"),
    multi: true,
    defaultHidden: false,
    iconName: "ShowResults",
    items: [],
};
exports.default = DynamicPortfolioFieldSelector;
