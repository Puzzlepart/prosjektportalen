"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Resources_1 = require("../../Resources");
exports.RiskMatrixDefaultProps = {
    columns: [
        {
            key: "ID",
            fieldName: "id",
            name: "ID",
            minWidth: 100,
            maxWidth: 100,
        },
        {
            key: "Title",
            fieldName: "title",
            name: Resources_1.default.getResource("SiteFields_Title_DisplayName"),
            minWidth: 220,
            isMultiline: true,
        },
        {
            key: "SiteTitle",
            fieldName: "siteTitle",
            name: Resources_1.default.getResource("String_Project"),
            minWidth: 200,
        },
        {
            key: "Probability",
            fieldName: "probability",
            name: Resources_1.default.getResource("SiteFields_GtRiskProbability_DisplayName"),
            minWidth: 100,
        },
        {
            key: "Consequence",
            fieldName: "consequence",
            name: Resources_1.default.getResource("SiteFields_GtRiskConsequence_DisplayName"),
            minWidth: 100,
        },
        {
            key: "ProbabilityPostAction",
            fieldName: "probabilityPostAction",
            name: Resources_1.default.getResource("SiteFields_GtRiskProbabilityPostAction_DisplayName"),
            minWidth: 100,
        },
        {
            key: "ConsequencePostAction",
            fieldName: "consequencePostAction",
            name: Resources_1.default.getResource("SiteFields_GtRiskConsequencePostAction_DisplayName"),
            minWidth: 100,
        },
        {
            key: "Action",
            fieldName: "action",
            name: Resources_1.default.getResource("SiteFields_GtRiskAction_DisplayName"),
            minWidth: 300,
            isMultiline: true,
        },
    ],
    contentTypeId: "0x010088578E7470CC4AA68D566346483107020101",
    loadingText: Resources_1.default.getResource("RiskMatrix_LoadingText"),
    className: "risk-matrix-container",
    id: "risk-matrix",
    showEmptyMessage: false,
    showViewSelector: true,
    hideLabelsBreakpoint: 900,
    rowLimit: 100,
    postActionShowOriginal: true,
};
