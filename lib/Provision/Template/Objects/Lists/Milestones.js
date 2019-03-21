"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Resources_1 = require("../../../../Resources");
const Milestones = {
    Title: Resources_1.default.getResource("Lists_Milestones_Title"),
    Description: "",
    Template: 100,
    ContentTypesEnabled: true,
    RemoveExistingContentTypes: true,
    ContentTypeBindings: [{
            ContentTypeID: "0x01006E5BC3A4008144DC8ACEC0107AFC999A",
        }],
    AdditionalSettings: {
        EnableVersioning: true,
    },
    Views: [{
            Title: Resources_1.default.getResource("View_AllItems_DisplayName"),
            ViewFields: ["LinkTitle", "GtMilestonePlannedDate", "GtMilestoneActualDate", "GtMilestoneStatus", "GtMilestoneComment"],
            AdditionalSettings: {
                RowLimit: 30,
                Paged: true,
                ViewQuery: `<OrderBy>
              <FieldRef Name="GtMilestonePlannedDate" Ascending="TRUE" />
            </OrderBy>`,
            },
        }],
};
exports.default = Milestones;
