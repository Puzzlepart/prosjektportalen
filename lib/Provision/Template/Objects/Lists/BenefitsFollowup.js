"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Resources_1 = require("../../../../Resources");
const SiteFields_1 = require("./SiteFields");
const BenefitsFollowup = {
    Title: Resources_1.default.getResource("Lists_BenefitsFollowup_Title"),
    Description: "",
    Template: 100,
    ContentTypesEnabled: true,
    RemoveExistingContentTypes: true,
    ContentTypeBindings: [{
            ContentTypeID: "0x01007A831AC68204F04AAA022CFF06C7BAA2",
        }],
    AdditionalSettings: {
        EnableVersioning: true,
    },
    FieldRefs: [{
            ID: "fa564e0f-0c70-4ab9-b863-0177e6ddd247",
            Required: false,
            Hidden: true,
        }],
    Fields: [
        SiteFields_1.GtMeasureIndicatorLookup,
        SiteFields_1.GtMeasureIndicatorLookup_ID,
    ],
    Views: [{
            Title: Resources_1.default.getResource("View_AllItems_DisplayName"),
            ViewFields: ["GtMeasureIndicatorLookup", "GtMeasurementDate", "GtMeasurementValue", "GtMeasurementComment"],
            AdditionalSettings: {
                RowLimit: 30,
                Paged: true,
                ViewQuery: `<GroupBy Collapse="TRUE" GroupLimit="30">
                            <FieldRef Name="GtMeasureIndicatorLookup" />
                        </GroupBy>
                        <OrderBy>
                            <FieldRef Name="GtMeasurementDate" Ascending="FALSE" />
                        </OrderBy>`,
            },
        },
        {
            Title: Resources_1.default.getResource("View_Flat_DisplayName"),
            ViewFields: ["GtMeasureIndicatorLookup", "GtMeasurementDate", "GtMeasurementValue", "GtMeasurementComment"],
            AdditionalSettings: {
                RowLimit: 30,
                Paged: true,
                ViewQuery: `<OrderBy>
                            <FieldRef Name="GtMeasureIndicatorLookup" />
                            <FieldRef Name="GtMeasurementDate" Ascending="FALSE" />
                        </OrderBy>`,
            },
        }],
};
exports.default = BenefitsFollowup;
