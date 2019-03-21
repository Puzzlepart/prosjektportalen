"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Resources_1 = require("../Resources");
const ProjectList_1 = require("./ProjectList");
exports.ProjectList = ProjectList_1.default;
const ProjectInfo_1 = require("./ProjectInfo");
exports.ProjectInfo = ProjectInfo_1.default;
const ProjectPhases_1 = require("./ProjectPhases");
exports.ProjectPhases = ProjectPhases_1.default;
const NewProjectLink_1 = require("./NewProjectLink");
exports.NewProjectLink = NewProjectLink_1.default;
const Announcements_1 = require("./Announcements");
exports.Announcements = Announcements_1.default;
const LatestProjects_1 = require("./LatestProjects");
exports.LatestProjects = LatestProjects_1.default;
const QuickLinks_1 = require("./QuickLinks");
exports.QuickLinks = QuickLinks_1.default;
const DynamicPortfolio_1 = require("./DynamicPortfolio");
exports.DynamicPortfolio = DynamicPortfolio_1.default;
const BenefitsOverview_1 = require("./BenefitsOverview");
exports.BenefitsOverview = BenefitsOverview_1.default;
const ProjectStatus_1 = require("./ProjectStatus");
exports.ProjectStatus = ProjectStatus_1.default;
const ExperienceLog_1 = require("./ExperienceLog");
exports.ExperienceLog = ExperienceLog_1.default;
const WebPropertyBagEditor_1 = require("./WebPropertyBagEditor");
exports.WebPropertyBagEditor = WebPropertyBagEditor_1.default;
const NewProjectForm_1 = require("./NewProjectForm");
exports.NewProjectForm = NewProjectForm_1.default;
const RiskMatrix_1 = require("./RiskMatrix");
exports.RiskMatrix = RiskMatrix_1.default;
const OpportunityMatrix_1 = require("./OpportunityMatrix");
const DiceCalculator_1 = require("./DiceCalculator");
exports.DiceCalculator = DiceCalculator_1.default;
const ProjectStats_1 = require("./ProjectStats");
exports.ProjectStats = ProjectStats_1.default;
const DeliveriesOverview_1 = require("./DeliveriesOverview");
const ResourceAllocation_1 = require("./ResourceAllocation");
const WebPartComponent_1 = require("./WebPartComponent");
/**
 * An array containing WebPartComponents
 */
const WebPartComponents = [
    new WebPartComponent_1.default(ProjectList_1.default, "pp-projectlist"),
    new WebPartComponent_1.default(ProjectInfo_1.default, "pp-projectinfo", { filterField: "GtPcFrontpage" }),
    new WebPartComponent_1.default(ProjectPhases_1.default, "pp-projectphases"),
    new WebPartComponent_1.default(NewProjectLink_1.default, "pp-newprojectlink"),
    new WebPartComponent_1.default(Announcements_1.default, "pp-announcements"),
    new WebPartComponent_1.default(LatestProjects_1.default, "pp-latestprojects", { itemsCount: 8 }),
    new WebPartComponent_1.default(QuickLinks_1.default, "pp-quicklinks"),
    new WebPartComponent_1.default(DynamicPortfolio_1.default, "pp-dynamicportfolio"),
    new WebPartComponent_1.default(BenefitsOverview_1.default, "pp-benefitsoverview", {
        queryTemplate: "(ContentTypeID:0x0100B384774BA4EBB842A5E402EBF4707367* OR ContentTypeID:0x01007A831AC68204F04AAA022CFF06C7BAA2* OR 0x0100FF4E12223AF44F519AF40C441D05DED0*) Path:{Site.URL}",
        showSiteTitleColumn: false,
        showSearchBox: true,
    }),
    new WebPartComponent_1.default(BenefitsOverview_1.default, "pp-benefitsoverview-search", {
        dataSourceName: "BENEFITSOVERVIEW",
        groupByOptions: [{ name: Resources_1.default.getResource("String_Project"), key: "siteTitle" }],
    }),
    new WebPartComponent_1.default(ProjectStatus_1.default, "pp-projectstatus"),
    new WebPartComponent_1.default(ExperienceLog_1.default, "pp-experiencelog"),
    new WebPartComponent_1.default(WebPropertyBagEditor_1.default, "pp-webPropertyBagEditor"),
    new WebPartComponent_1.default(NewProjectForm_1.default, "pp-newProjectForm", { style: { width: 500 } }),
    new WebPartComponent_1.default(RiskMatrix_1.default, "pp-riskMatrix", { showEmptyMessage: true }),
    new WebPartComponent_1.default(OpportunityMatrix_1.default, "pp-opportunityMatrix", { showEmptyMessage: true }),
    new WebPartComponent_1.default(DeliveriesOverview_1.default, "pp-deliveriesoverview"),
    new WebPartComponent_1.default(DiceCalculator_1.default, "pp-diceCalculator", {}),
    new WebPartComponent_1.default(ProjectStats_1.default, "pp-projectStats", {
        viewSelectorEnabled: true,
        statsFieldsListName: Resources_1.default.getResource("Lists_StatsFieldsConfig_Title"),
        chartsConfigListName: Resources_1.default.getResource("Lists_ChartsConfig_Title"),
    }),
    new WebPartComponent_1.default(ResourceAllocation_1.default, "pp-resourceAllocation"),
];
/**
 * Get webpart component by name
 *
 * @param {string} name Name of the component
 */
exports.GetWebPartComponentByName = (name) => {
    let [component] = WebPartComponents.filter(wpc => wpc.name === name);
    return component;
};
/**
 * Render the webparts
 */
exports.RenderWebPartsOnPage = () => {
    WebPartComponents.forEach(wpc => wpc.renderOnPage());
};
