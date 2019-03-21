"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Resources_1 = require("../../../../Resources");
const ProjectProperties = {
    Title: Resources_1.default.getResource("Lists_ProjectProperties_Title"),
    Description: "",
    Template: 100,
    ContentTypesEnabled: true,
    RemoveExistingContentTypes: true,
    AdditionalSettings: {
        EnableVersioning: true,
        OnQuickLaunch: false,
    },
    FieldRefs: [{
            ID: "fa564e0f-0c70-4ab9-b863-0177e6ddd247",
            Required: false,
            Hidden: true,
        }],
    ContentTypeBindings: [{ ContentTypeID: Resources_1.default.getResource("ContentTypes_Prosjektegenskaper_ContentTypeId") }],
};
exports.default = ProjectProperties;
