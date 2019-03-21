"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Resources_1 = require("../../../../Resources");
const ChangeAnalysis = {
    Title: Resources_1.default.getResource("Lists_ChangeAnalysis_Title"),
    Description: "",
    Template: 100,
    ContentTypesEnabled: true,
    RemoveExistingContentTypes: true,
    ContentTypeBindings: [{
            ContentTypeID: "0x01004D8897A0212F9A40A4C2209D89E5AD4C",
        }],
    AdditionalSettings: {
        EnableVersioning: true,
    },
    FieldRefs: [{
            ID: "fa564e0f-0c70-4ab9-b863-0177e6ddd247",
            Required: true,
            DisplayName: "Endring",
        }],
    Views: [{
            Title: Resources_1.default.getResource("View_AllItems_DisplayName"),
            ViewFields: ["LinkTitle", "GtProcess", "GtChallengeDescription"],
            AdditionalSettings: {
                RowLimit: 30,
                Paged: true,
                ViewQuery: `<OrderBy>
              <FieldRef Name="ID" />
            </OrderBy>`,
            },
        },
        {
            Title: Resources_1.default.getResource("View_GroupedProcess_DisplayName"),
            ViewFields: ["GtChallengeDescription", "LinkTitle"],
            AdditionalSettings: {
                RowLimit: 30,
                Paged: true,
                ViewQuery: `<GroupBy Collapse="TRUE" GroupLimit="30">
              <FieldRef Name="GtProcess" Ascending="FALSE" />
            </GroupBy>
            <OrderBy>
              <FieldRef Name="ID" />
            </OrderBy>`,
            },
        }],
};
exports.default = ChangeAnalysis;
