"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Resources_1 = require("../../../../Resources");
const ProjectStatus = {
    Title: Resources_1.default.getResource("Lists_ProjectStatus_Title"),
    Description: "",
    Template: 101,
    ContentTypesEnabled: true,
    RemoveExistingContentTypes: true,
    ContentTypeBindings: [{
            ContentTypeID: "0x010100293FDE3FCADA480B9A77BBDAD7DFA28C02",
        }],
    AdditionalSettings: {
        EnableVersioning: true,
    },
    Views: [{
            Title: Resources_1.default.getResource("View_AllDocuments_DisplayName"),
            ViewFields: ["DocIcon", "LinkFilename", "Modified", "Editor"],
            AdditionalSettings: {
                RowLimit: 30,
                Paged: true,
                ViewQuery: `<OrderBy>
              <FieldRef Name="ID" Ascending="FALSE" />
            </OrderBy>`,
            },
        }],
};
exports.default = ProjectStatus;
