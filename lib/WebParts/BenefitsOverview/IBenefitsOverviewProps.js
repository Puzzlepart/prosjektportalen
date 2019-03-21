"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Resources_1 = require("../../Resources");
exports.BenefitsOverviewDefaultProps = {
    groupByOptions: [],
    searchProperty: "title",
    showCommandBar: false,
    showSearchBox: false,
    modalHeaderClassName: "ms-font-xxl",
    projectInfoFilterField: "GtPcPortfolioPage",
    excelExportEnabled: true,
    excelExportConfig: {
        fileName: Resources_1.default.getResource("DynamicPortfolio_ExcelExportFileName"),
        sheetName: "Sheet A",
        buttonLabel: Resources_1.default.getResource("DynamicPortfolio_ExcelExportButtonLabel"),
        buttonIcon: "ExcelDocument",
    },
    showSiteTitleColumn: true,
};
