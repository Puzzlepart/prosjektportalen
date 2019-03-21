"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Resources_1 = require("../../../../Resources");
const PhaseChecklist = {
    Title: Resources_1.default.getResource("Lists_PhaseChecklist_Title"),
    Description: "",
    Template: 100,
    ContentTypesEnabled: true,
    RemoveExistingContentTypes: true,
    ContentTypeBindings: [{
            ContentTypeID: "0x010088578E7470CC4AA68D5663464831070204",
        }],
    AdditionalSettings: {
        EnableVersioning: true,
    },
    Views: [{
            Title: Resources_1.default.getResource("View_AllItems_DisplayName"),
            ViewFields: ["LinkTitle", "GtProjectPhase", "GtChecklistStatus", "GtComment"],
            AdditionalSettings: {
                RowLimit: 50,
                ViewQuery: `<OrderBy>
              <FieldRef Name="GtSortOrder" />
              <FieldRef Name="ID" />
            </OrderBy>
            <Where>
                <Neq>
                    <FieldRef Name="GtChecklistStatus" />
                    <Value Type="Text">${Resources_1.default.getResource("Choice_GtChecklistStatus_Archived")}</Value>
                </Neq>
            </Where>`,
            },
        },
        {
            Title: Resources_1.default.getResource("View_Archived_DisplayName"),
            ViewFields: ["LinkTitle", "GtProjectPhase", "GtComment"],
            AdditionalSettings: {
                RowLimit: 50,
                ViewQuery: `<OrderBy>
              <FieldRef Name="GtSortOrder" />
              <FieldRef Name="ID" />
            </OrderBy>
            <Where>
                <Eq>
                    <FieldRef Name="GtChecklistStatus" />
                    <Value Type="Text">${Resources_1.default.getResource("Choice_GtChecklistStatus_Archived")}</Value>
                </Eq>
            </Where>`,
            },
        },
        {
            Title: Resources_1.default.getResource("View_GroupedStatus_DisplayName"),
            ViewFields: ["LinkTitle", "GtProjectPhase", "GtComment"],
            AdditionalSettings: {
                RowLimit: 50,
                ViewQuery: `<GroupBy Collapse="TRUE" GroupLimit="30">
              <FieldRef Name="GtChecklistStatus" Ascending="FALSE" />
            </GroupBy>
            <OrderBy>
                <FieldRef Name="GtSortOrder" />
                <FieldRef Name="ID" />
            </OrderBy>`,
            },
        }],
};
exports.default = PhaseChecklist;
