"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Resources_1 = require("../../Resources");
exports.WebPropertyBagEditorDefaultProps = {
    columns: [
        {
            key: "key",
            fieldName: "key",
            name: Resources_1.default.getResource("SiteFields_GtKey_DisplayName"),
            minWidth: 150,
            maxWidth: 200,
            isResizable: true,
        },
        {
            key: "value",
            fieldName: "value",
            name: Resources_1.default.getResource("SiteFields_GtValue_DisplayName"),
            minWidth: 100,
            maxWidth: 300,
            isResizable: true,
        },
    ],
};
