"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Resources_1 = require("../../../../Resources");
const Stakeholders = {
    Title: Resources_1.default.getResource("Lists_Stakeholders_Title"),
    Description: "",
    Template: 100,
    ContentTypesEnabled: true,
    RemoveExistingContentTypes: true,
    ContentTypeBindings: [{
            ContentTypeID: "0x010088578E7470CC4AA68D5663464831070202",
        }],
    AdditionalSettings: {
        EnableVersioning: true,
    },
    Views: [{
            Title: Resources_1.default.getResource("View_AllItems_DisplayName"),
            ViewFields: ["LinkTitle", "GtStakeholderGroup", "GtStakeholderContext", "GtStakeholderStrategy", "GtStakeholderInterest", "GtStakeholderInfluence", "GtStakeholderInfluencePossibilty", "GtStakeholderActions"],
            AdditionalSettings: {
                RowLimit: 30,
                Paged: true,
                ViewQuery: "",
            },
        }],
};
exports.default = Stakeholders;
