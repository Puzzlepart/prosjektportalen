"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Resources_1 = require("../../Resources");
exports.DeliveriesOverviewDefaultProps = {
    groupByOptions: [
        { name: Resources_1.default.getResource("String_Project"), key: "SiteTitle" },
        { name: Resources_1.default.getResource("SiteFields_GtProductStatus_DisplayName"), key: "ProductStatus" },
    ],
    dataSourceName: "DELIVERIESOVERVIEW",
    columns: [{
            key: "Title",
            fieldName: "Title",
            name: Resources_1.default.getResource("SiteFields_Title_DisplayName"),
            minWidth: 220,
            isMultiline: true,
        },
        {
            key: "SiteTitle",
            fieldName: "SiteTitle",
            name: Resources_1.default.getResource("String_Project"),
            minWidth: 220,
            isMultiline: true,
            isResizable: true,
        },
        {
            key: "GtProductDescriptionOWSMTXT",
            fieldName: "ProductDescription",
            name: Resources_1.default.getResource("SiteFields_GtProductDescription_DisplayName"),
            minWidth: 220,
            isMultiline: true,
            isResizable: true,
        },
        {
            key: "GtProductStartTimeOWSDATE",
            fieldName: "ProductStartTime",
            name: Resources_1.default.getResource("SiteFields_GtProductStartTime_DisplayName"),
            minWidth: 100,
            isMultiline: false,
            isResizable: true,
        },
        {
            key: "GtProductEndTimeOWSDATE",
            fieldName: "ProductEndTime",
            name: Resources_1.default.getResource("SiteFields_GtProductEndTime_DisplayName"),
            minWidth: 100,
            isMultiline: false,
            isResizable: true,
        },
        {
            key: "GtProductStatusOWSCHCS",
            fieldName: "ProductStatus",
            name: Resources_1.default.getResource("SiteFields_GtProductStatus_DisplayName"),
            minWidth: 100,
            isMultiline: false,
            isResizable: true,
        },
        {
            key: "GtProductStatusCommentOWSMTXT",
            fieldName: "ProductStatusComment",
            name: Resources_1.default.getResource("SiteFields_GtProductStatusComment_DisplayName"),
            minWidth: 220,
            isMultiline: true,
            isResizable: true,
        }],
    excelExportEnabled: true,
    excelExportConfig: {
        fileNamePrefix: Resources_1.default.getResource("DeliveriesOverview_ExcelExportFileNamePrefix"),
        sheetName: "Sheet A",
        buttonLabel: Resources_1.default.getResource("DynamicPortfolio_ExcelExportButtonLabel"),
        buttonIcon: "ExcelDocument",
    },
};
