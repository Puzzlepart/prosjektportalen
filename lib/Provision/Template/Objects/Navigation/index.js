"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Resources_1 = require("../../../../Resources");
const Navigation = {
    QuickLaunch: [
        {
            Url: Resources_1.default.getResource("Project_WelcomePage"),
            Title: Resources_1.default.getResource("Navigation_Home_Title"),
            IgnoreExisting: true,
        },
        {
            Url: "SitePages/ProjectStatus.aspx",
            Title: Resources_1.default.getResource("Navigation_ProjectStatus_Title"),
        },
        {
            Url: Resources_1.default.getResource("DefaultView_ProjectLog_Url"),
            Title: Resources_1.default.getResource("Lists_ProjectLog_Title"),
        },
        {
            Url: Resources_1.default.getResource("DefaultView_Stakeholders_Url"),
            Title: Resources_1.default.getResource("Lists_Stakeholders_Title"),
        },
        {
            Url: Resources_1.default.getResource("DefaultView_CommunicationPlan_Url"),
            Title: Resources_1.default.getResource("Lists_CommunicationPlan_Title"),
        },
        {
            Url: Resources_1.default.getResource("DefaultView_Uncertainties_Url"),
            Title: Resources_1.default.getResource("Lists_Uncertainties_Title"),
        },
        {
            Url: Resources_1.default.getResource("DefaultView_Tasks_Url"),
            Title: Resources_1.default.getResource("Lists_Tasks_Title"),
        },
        {
            Url: Resources_1.default.getResource("DefaultView_MeetingCalendar_Url"),
            Title: Resources_1.default.getResource("Lists_MeetingCalendar_Title"),
        },
        {
            Url: Resources_1.default.getResource("DefaultView_Documents_Url"),
            Title: Resources_1.default.getResource("Lists_Documents_Title"),
        },
        {
            Url: Resources_1.default.getResource("DefaultView_PhaseChecklist_Url"),
            Title: Resources_1.default.getResource("Lists_PhaseChecklist_Title"),
        },
        {
            Url: "SitePages/Mom.aspx",
            Title: Resources_1.default.getResource("Navigation_Mom_Title"),
        },
        {
            Url: "#",
            Title: Resources_1.default.getResource("Navigation_Notebook_Title"),
        },
        {
            Url: Resources_1.default.getResource("DefaultView_ChangeAnalysis_Url"),
            Title: Resources_1.default.getResource("Lists_ChangeAnalysis_Title"),
        },
        {
            Url: Resources_1.default.getResource("DefaultView_BenefitsAnalysis_Url"),
            Title: Resources_1.default.getResource("Lists_BenefitsAnalysis_Title"),
        },
        {
            Url: Resources_1.default.getResource("DefaultView_MeasurementIndicators_Url"),
            Title: Resources_1.default.getResource("Lists_MeasurementIndicators_Title"),
        },
        {
            Url: Resources_1.default.getResource("DefaultView_BenefitsFollowup_Url"),
            Title: Resources_1.default.getResource("Navigation_BenefitsFollowup_Title"),
        },
        {
            Url: "SitePages/BenefitsOverview.aspx",
            Title: Resources_1.default.getResource("Navigation_BenefitsOverview_Title"),
        },
        {
            Url: Resources_1.default.getResource("DefaultView_ProjectDeliveries_Url"),
            Title: Resources_1.default.getResource("Lists_ProjectDeliveries_Title"),
        },
        {
            Url: Resources_1.default.getResource("DefaultView_ResourceAllocation_Url"),
            Title: Resources_1.default.getResource("Lists_ResourceAllocation_Title"),
        },
        {
            Url: "SitePages/Nofilter.aspx",
            Title: Resources_1.default.getResource("Navigation_NoFilterFrontpage_Title"),
        },
        {
            Url: Resources_1.default.getResource("Navigation_NoPhaseProjectItems_Url"),
            Title: Resources_1.default.getResource("Navigation_NoPhaseProjectItems_Title"),
        },
        {
            Url: "SitePages/Assigned.aspx",
            Title: Resources_1.default.getResource("Navigation_MyProjectItems_Title"),
        },
        {
            Url: "_layouts/15/viewlsts.aspx",
            Title: Resources_1.default.getResource("Navigation_SiteContents_Title"),
        },
    ],
};
exports.default = Navigation;
