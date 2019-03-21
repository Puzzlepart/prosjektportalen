"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Resources_1 = require("../../Resources");
exports.LatestProjectsDefaultProps = {
    chromeTitle: Resources_1.default.getResource("WebPart_RecentProjects_Title"),
    itemsCount: 5,
    listClassName: "pp-simpleList spacing-m",
    loadingText: Resources_1.default.getResource("LatestProjects_LoadingText"),
};
