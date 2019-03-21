"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Resources_1 = require("../../../../Resources");
const SiteFields_1 = require("./SiteFields");
const ProjectLog = {
    Title: Resources_1.default.getResource("Lists_ProjectLog_Title"),
    Description: "",
    Template: 100,
    ContentTypesEnabled: true,
    RemoveExistingContentTypes: true,
    ContentTypeBindings: [{
            ContentTypeID: "0x010088578E7470CC4AA68D5663464831070206",
        }],
    AdditionalSettings: {
        EnableVersioning: true,
    },
    Fields: [SiteFields_1.GtProjectLogProductLookup],
    Views: [{
            Title: Resources_1.default.getResource("View_AllItems_DisplayName"),
            ViewFields: ["LinkTitle", "GtProjectLogType", "GtProjectLogReporter", "GtProjectLogResponsible", "GtProjectLogConsequence", "GtProjectLogRecommendation", "GtProjectLogExperience"],
            AdditionalSettings: {
                RowLimit: 30,
                Paged: true,
                ViewQuery: "",
            },
        }],
};
exports.default = ProjectLog;
