"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Resources_1 = require("../../../../Resources");
const SiteFields_1 = require("./SiteFields");
const Tasks = {
    Title: Resources_1.default.getResource("Lists_Tasks_Title"),
    Description: "",
    Template: 171,
    ContentTypesEnabled: true,
    RemoveExistingContentTypes: true,
    ContentTypeBindings: [{
            ContentTypeID: "0x010800233B015F95174C9A8EB505493841DE8D",
        }],
    AdditionalSettings: {
        EnableVersioning: true,
    },
    Fields: [
        SiteFields_1.GtProjectTaskComElement,
        SiteFields_1.GtProjectTaskRisk,
        SiteFields_1.GtProjectTaskProduct,
        SiteFields_1.GtProjectTaskChange,
        SiteFields_1.GtProjectTaskGain,
    ],
    Views: [{
            Title: Resources_1.default.getResource("View_AllTasks_DisplayName"),
            ViewFields: ["Checkmark", "LinkTitle", "StartDate", "DueDate", "AssignedTo", "GtProjectPhase", "Modified", "Editor"],
            AdditionalSettings: {
                RowLimit: 30,
                Paged: true,
                ViewQuery: "",
            },
        },
        {
            Title: Resources_1.default.getResource("View_RelevantLinks_DisplayName"),
            ViewFields: ["LinkTitle", "GtProjectTaskChange", "GtProjectTaskGain", "GtProjectTaskComElement", "GtProjectTaskProduct", "GtProjectTaskRisk"],
            AdditionalSettings: {
                RowLimit: 30,
                Paged: true,
                ViewQuery: "",
            },
        },
        {
            Title: Resources_1.default.getResource("View_BenefitTasks_DisplayName"),
            ViewFields: ["Checkmark", "LinkTitle", "StartDate", "DueDate", "AssignedTo", "GtProjectPhase", "Modified", "Editor", "GtProjectTaskGain"],
            AdditionalSettings: {
                RowLimit: 30,
                Paged: true,
                ViewQuery: `<Where><IsNotNull><FieldRef Name="GtProjectTaskGain" /></IsNotNull></Where>`,
            },
        }],
};
exports.default = Tasks;
