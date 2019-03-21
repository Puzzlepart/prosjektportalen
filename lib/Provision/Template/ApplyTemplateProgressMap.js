"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Resources_1 = require("../../Resources");
const ApplyTemplateProgressMap = {
    Files: Resources_1.default.getResource("ProvisionWeb_Progress_Handler_Files"),
    Lists: Resources_1.default.getResource("ProvisionWeb_Progress_Handler_Lists"),
    Navigation: Resources_1.default.getResource("ProvisionWeb_Progress_Handler_Navigation"),
    WebSettings: Resources_1.default.getResource("ProvisionWeb_Progress_Handler_WebSettings"),
    ComposedLook: Resources_1.default.getResource("ProvisionWeb_Progress_Handler_ComposedLook"),
    PropertyBagEntries: Resources_1.default.getResource("ProvisionWeb_Progress_Handler_PropertyBagEntries"),
};
exports.default = ApplyTemplateProgressMap;
