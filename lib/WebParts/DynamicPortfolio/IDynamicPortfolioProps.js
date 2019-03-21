"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Resources_1 = require("../../Resources");
const DetailsList_1 = require("office-ui-fabric-react/lib/DetailsList");
exports.DynamicPortfolioDefaultProps = {
    loadingText: Resources_1.default.getResource("DynamicPortfolio_LoadingText"),
    searchBoxLabelText: Resources_1.default.getResource("DynamicPortfolio_SearchBox_Placeholder"),
    showCountText: Resources_1.default.getResource("DynamicPortfolio_ShowCounts"),
    showCountTextWithFilters: Resources_1.default.getResource("DynamicPortfolio_ShowCountsWithFilters"),
    showGroupBy: true,
    modalHeaderClassName: "ms-font-xxl",
    projectInfoFilterField: "GtPcPortfolioPage",
    constrainMode: DetailsList_1.ConstrainMode.horizontalConstrained,
    layoutMode: DetailsList_1.DetailsListLayoutMode.fixedColumns,
    selectionMode: DetailsList_1.SelectionMode.none,
    excelExportEnabled: true,
    excelExportConfig: {
        fileName: Resources_1.default.getResource("DynamicPortfolio_ExcelExportFileName"),
        sheetName: "Sheet A",
        buttonLabel: Resources_1.default.getResource("DynamicPortfolio_ExcelExportButtonLabel"),
        buttonIcon: "ExcelDocument",
    },
    defaultSortFunction: (a, b) => a.SiteTitle > b.SiteTitle ? 1 : -1,
    viewSelectorEnabled: true,
};
