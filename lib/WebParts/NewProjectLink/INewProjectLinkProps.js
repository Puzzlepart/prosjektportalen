"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Resources_1 = require("../../Resources");
exports.NewProjectLinkDefaultProps = {
    linkText: Resources_1.default.getResource("NewProjectForm_Header"),
    iconProps: { iconName: "CirclePlus" },
    permissionKind: 24,
    dlgHeaderText: Resources_1.default.getResource("NewProjectForm_Title"),
    dlgSubHeaderText: Resources_1.default.getResource("NewProjectForm_SubText"),
    creationModalTitle: Resources_1.default.getResource("CreationModal_Title"),
};
