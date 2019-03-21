"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Resources_1 = require("../../../../Resources");
const SiteFields_1 = require("./SiteFields");
const ProjectDeliveries = {
    Title: Resources_1.default.getResource("Lists_ProjectDeliveries_Title"),
    Description: "",
    Template: 100,
    ContentTypesEnabled: true,
    RemoveExistingContentTypes: true,
    ContentTypeBindings: [{
            ContentTypeID: "0x010088578E7470CC4AA68D5663464831070205",
        }],
    AdditionalSettings: {
        EnableVersioning: true,
    },
    Fields: [SiteFields_1.GtProductInteressent],
    Views: [{
            Title: Resources_1.default.getResource("View_AllItems_DisplayName"),
            ViewFields: ["LinkTitle", "GtProductDescription", "GtProductStartTime", "GtProductEndTime", "GtProductStatus", "GtProductStatusComment", "GtProductPhase"],
            AdditionalSettings: {
                RowLimit: 30,
                Paged: true,
                ViewQuery: "",
            },
        },
        {
            Title: Resources_1.default.getResource("View_ProductionPhase_DisplayName"),
            ViewFields: ["LinkTitle", "GtProductDescription", "GtProductStartTime", "GtProductEndTime", "GtProductStatus", "GtProductStatusComment"],
            AdditionalSettings: {
                RowLimit: 30,
                Paged: true,
                ViewQuery: `<GroupBy Collapse="FALSE" GroupLimit="30">
            <FieldRef Name="GtProductPhase" />
          </GroupBy>`,
            },
        }],
};
exports.default = ProjectDeliveries;
