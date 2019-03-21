"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Resources_1 = require("../../Resources");
const ProjectInfoRenderMode_1 = require("./ProjectInfoRenderMode");
exports.ProjectInfoDefaultProps = {
    chromeTitle: Resources_1.default.getResource("WebPart_ProjectInfo_Title"),
    loadingText: Resources_1.default.getResource("ProjectInfo_LoadingText"),
    hideChrome: false,
    showActionLinks: true,
    showMissingPropsWarning: true,
    webUrl: _spPageContextInfo.webAbsoluteUrl,
    rootSiteUrl: _spPageContextInfo.siteAbsoluteUrl,
    renderMode: ProjectInfoRenderMode_1.default.Normal,
    containerClassName: "pp-projectInfo",
    innerClassName: "pp-projectInfoInner",
    actionsClassName: "pp-project-actions",
};
