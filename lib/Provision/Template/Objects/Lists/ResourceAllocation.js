"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Resources_1 = require("../../../../Resources");
const ResourceAllocation = {
    Title: Resources_1.default.getResource("Lists_ResourceAllocation_Title"),
    Description: "",
    Template: 100,
    ContentTypesEnabled: false,
    RemoveExistingContentTypes: true,
    AdditionalSettings: { EnableVersioning: true },
    Fields: [
        `<Field ID="{fa564e0f-0c70-4ab9-b863-0177e6ddd247}" Type="Text" Name="Title" StaticName="Title" DisplayName="${Resources_1.default.getResource("SiteFields_LinkTitleResourceAllocation_DisplayName")}" />`,
    ],
    FieldRefs: [{
            ID: "fa564e0f-0c70-4ab9-b863-0177e6ddd247",
            DisplayName: Resources_1.default.getResource("SiteFields_LinkTitleResourceAllocation_DisplayName"),
            Required: false,
            Hidden: false,
        }],
    ContentTypeBindings: [{ ContentTypeID: "0x010088578E7470CC4AA68D5663464831070209" }],
    Views: [{
            Title: Resources_1.default.getResource("View_AllItems_DisplayName"),
            ViewFields: ["LinkTitle", "GtResourceUser", "GtResourceRole", "GtStartDate", "GtEndDate", "GtResourceLoad", "GtResourceAbsenceComment", "Modified"],
            AdditionalSettings: {
                RowLimit: 100,
                Paged: true,
                ViewQuery: `<OrderBy>
              <FieldRef Name="GtEndDate" Ascending="FALSE" />
            </OrderBy>`,
            },
        }],
};
exports.default = ResourceAllocation;
