"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ProjectStatsChartDataItem_1 = require("./ProjectStatsChart/ProjectStatsChartDataItem");
class Project extends ProjectStatsChartDataItem_1.default {
    constructor(data) {
        super(data.SiteTitle, data);
    }
}
exports.default = Project;
