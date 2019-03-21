"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Resources_1 = require("../../Resources");
exports.ProjectListDefaultProps = {
    tileWidth: 206,
    tileImageHeight: 140,
    tileClassName: "pp-projectCard",
    modalHeaderClassName: "ms-font-xxl",
    projectInfoFilterField: "GtPcPortfolioPage",
    dataSourceName: "PROJECTS",
    rowLimit: 500,
    searchBoxLabelText: Resources_1.default.getResource("DynamicPortfolio_SearchBox_Placeholder"),
    loadingText: Resources_1.default.getResource("ProjectList_LoadingText"),
    emptyMessage: Resources_1.default.getResource("ProjectList_NoResults"),
    propertyClassNames: [],
    searchTimeoutMs: 250,
};
