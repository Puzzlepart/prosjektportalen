"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Resources_1 = require("../../../../Resources");
const MeetingCalendar = {
    Title: Resources_1.default.getResource("Lists_MeetingCalendar_Title"),
    Description: "",
    Template: 106,
    ContentTypesEnabled: true,
    RemoveExistingContentTypes: true,
    ContentTypeBindings: [{
            ContentTypeID: "0x010200A2B2AC17A2244B8590398A9D1E7E3E3701",
        }],
    AdditionalSettings: {
        EnableVersioning: true,
    },
};
exports.default = MeetingCalendar;
