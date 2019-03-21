"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Resources_1 = require("../../../../Resources");
const SiteFields_1 = require("./SiteFields");
const MeasurementIndicators = {
    Title: Resources_1.default.getResource("Lists_MeasurementIndicators_Title"),
    Description: "",
    Template: 100,
    ContentTypesEnabled: false,
    RemoveExistingContentTypes: true,
    ContentTypeBindings: [{
            ContentTypeID: "0x0100FF4E12223AF44F519AF40C441D05DED0",
        }],
    AdditionalSettings: {
        EnableVersioning: true,
    },
    Fields: [
        SiteFields_1.GtGainLookup,
        SiteFields_1.GtGainLookup_ID,
    ],
    Views: [{
            Title: Resources_1.default.getResource("View_AllItems_DisplayName"),
            ViewFields: ["GtGainLookup", "LinkTitle", "GtStartValue", "GtDesiredValue", "GtMeasurementUnit"],
            AdditionalSettings: {
                RowLimit: 30,
                Paged: true,
                ViewQuery: "",
            },
        }],
};
exports.default = MeasurementIndicators;
