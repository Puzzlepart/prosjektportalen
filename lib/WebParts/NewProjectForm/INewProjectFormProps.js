"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Resources_1 = require("../../Resources");
const NewProjectFormRenderMode_1 = require("./NewProjectFormRenderMode");
exports.NewProjectFormDefaultProps = {
    titleMinLength: 4,
    className: "pp-newProjectForm",
    settingsClassName: "advanced-settings",
    maxUrlLength: 18,
    doesWebExistDelayMs: 200,
    renderMode: NewProjectFormRenderMode_1.default.Default,
    onDialogDismiss: () => {
        // Empty
    },
    headerText: Resources_1.default.getResource("NewProjectForm_Title"),
    subHeaderText: Resources_1.default.getResource("NewProjectForm_SubText"),
    creationModalTitle: Resources_1.default.getResource("CreationModal_Title"),
    inputContainerStyle: { marginBottom: 5 },
    showSettings: true,
};
