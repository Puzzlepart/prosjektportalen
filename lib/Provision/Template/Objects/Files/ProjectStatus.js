"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Resources_1 = require("../../../../Resources");
const ProjectStatus = {
    Folder: "SitePages",
    Src: "{sitecollection}/Resources/ProjectStatus.txt",
    Url: "ProjectStatus.aspx",
    Overwrite: true,
    Properties: {
        Title: Resources_1.default.getResource("Navigation_ProjectStatus_Title"),
    },
};
exports.default = ProjectStatus;
