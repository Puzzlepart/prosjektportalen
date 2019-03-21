"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Resources_1 = require("../../../../Resources");
const SiteFields_1 = require("./SiteFields");
const BenefitsAnalysis = {
    Title: Resources_1.default.getResource("Lists_BenefitsAnalysis_Title"),
    Description: "",
    Template: 100,
    ContentTypesEnabled: true,
    RemoveExistingContentTypes: true,
    ContentTypeBindings: [{
            ContentTypeID: "0x0100B384774BA4EBB842A5E402EBF4707367",
        }],
    AdditionalSettings: {
        EnableVersioning: true,
    },
    Fields: [SiteFields_1.GtChangeLookup],
    FieldRefs: [{
            ID: "fa564e0f-0c70-4ab9-b863-0177e6ddd247",
            Required: true,
            DisplayName: Resources_1.default.getResource("Lists_BenefitsAnalysis_Fields_Title_DisplayName"),
        }],
    Views: [{
            Title: Resources_1.default.getResource("View_AllItems_DisplayName"),
            ViewFields: ["LinkTitle", "GtChangeLookup", "GtGainsType", "GtGainsTurnover", "GtGainsResponsible", "GtRealizationTime"],
            AdditionalSettings: {
                RowLimit: 30,
                Paged: true,
                ViewQuery: "",
            },
        },
        {
            Title: Resources_1.default.getResource("View_GroupedBenefitType_DisplayName"),
            ViewFields: ["GtChangeLookup", "Title", "GtGainsTurnover", "GtGainsResponsible", "GtRealizationTime"],
            AdditionalSettings: {
                RowLimit: 30,
                Paged: true,
                ViewQuery: `<GroupBy Collapse="TRUE" GroupLimit="30">
              <FieldRef Name="GtGainsType" Ascending="FALSE" />
            </GroupBy>
            <OrderBy>
              <FieldRef Name="ID" />
            </OrderBy>`,
            },
        }],
};
exports.default = BenefitsAnalysis;
