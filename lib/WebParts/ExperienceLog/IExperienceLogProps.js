"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Resources_1 = require("../../Resources");
exports.ExperienceLogDefaultProps = {
    dataSource: "LESSONSLOG",
    columns: [{
            key: "Title",
            fieldName: "Title",
            name: Resources_1.default.getResource("SiteFields_Title_DisplayName"),
            minWidth: 220,
        },
        {
            key: "SiteTitle",
            fieldName: "SiteTitle",
            name: Resources_1.default.getResource("String_Project"),
            minWidth: 100,
            isResizable: true,
        },
        {
            key: "GtProjectLogTypeOWSCHCS",
            fieldName: "LogType",
            name: Resources_1.default.getResource("SiteFields_GtProjectLogType_DisplayName"),
            minWidth: 100,
            isResizable: true,
        },
        {
            key: "GtProjectLogDescriptionOWSMTXT",
            fieldName: "Description",
            name: Resources_1.default.getResource("SiteFields_GtProjectLogDescription_DisplayName"),
            minWidth: 250,
            isResizable: true,
        },
        {
            key: "GtProjectLogResponsibleOWSCHCS",
            fieldName: "Responsible",
            name: Resources_1.default.getResource("SiteFields_GtProjectLogResponsible_DisplayName"),
            minWidth: 100,
            isResizable: true,
        },
        {
            key: "GtProjectLogConsequenceOWSMTXT",
            fieldName: "Consequence",
            name: Resources_1.default.getResource("SiteFields_GtProjectLogConsequence_DisplayName"),
            minWidth: 250,
            isResizable: true,
        },
        {
            key: "GtProjectLogRecommendationOWSMTXT",
            fieldName: "Recommendation",
            name: Resources_1.default.getResource("SiteFields_GtProjectLogRecommendation_DisplayName"),
            minWidth: 250,
            isResizable: true,
        },
        {
            key: "GtProjectLogActorsOWSCHCM",
            fieldName: "Actors",
            name: Resources_1.default.getResource("SiteFields_GtProjectLogActors_DisplayName"),
            minWidth: 100,
            isResizable: true,
        }],
    groupByOptions: [
        {
            key: "SiteTitle",
            name: Resources_1.default.getResource("String_Project"),
        },
        {
            key: "LogType",
            name: Resources_1.default.getResource("SiteFields_GtProjectLogType_DisplayName"),
        },
    ],
    excelExportEnabled: true,
    excelExportConfig: {
        fileNamePrefix: Resources_1.default.getResource("ExperienceLog_ExcelExportFileNamePrefix"),
        sheetName: "Sheet A",
        buttonLabel: Resources_1.default.getResource("DynamicPortfolio_ExcelExportButtonLabel"),
        buttonIcon: "ExcelDocument",
    },
};
