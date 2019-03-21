"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Resources_1 = require("../../../../Resources");
const Documents = {
    Title: Resources_1.default.getResource("Lists_Documents_Title"),
    Description: "",
    Template: 101,
    ContentTypesEnabled: false,
    RemoveExistingContentTypes: true,
    ContentTypeBindings: [{ ContentTypeID: "0x010100293FDE3FCADA480B9A77BBDAD7DFA28C01" }],
    AdditionalSettings: { EnableVersioning: true },
    Views: [{
            Title: Resources_1.default.getResource("View_AllDocuments_DisplayName"),
            ViewFields: ["DocIcon", "LinkFilename", "GtProjectPhase", "Modified", "Editor"],
            AdditionalSettings: {
                RowLimit: 30,
                Paged: true,
                ViewQuery: "",
            },
        }],
};
exports.default = Documents;
