"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Resources_1 = require("../../../Resources");
const Objects_1 = require("../Objects");
const PhaseChecklist_1 = require("../Objects/Lists/PhaseChecklist");
const Information_1 = require("../Objects/Lists/Information");
const Stakeholders_1 = require("../Objects/Lists/Stakeholders");
const CommunicationPlan_1 = require("../Objects/Lists/CommunicationPlan");
const Milestones_1 = require("../Objects/Lists/Milestones");
const ProjectLog_1 = require("../Objects/Lists/ProjectLog");
const ProjectDeliveries_1 = require("../Objects/Lists/ProjectDeliveries");
const Uncertainties_1 = require("../Objects/Lists/Uncertainties");
const MeetingCalendar_1 = require("../Objects/Lists/MeetingCalendar");
const Documents_1 = require("../Objects/Lists/Documents");
const ProjectStatus_1 = require("../Objects/Lists/ProjectStatus");
const SiteFields_1 = require("../Objects/Lists/SiteFields");
const ProjectStatus_2 = require("../Objects/Files/ProjectStatus");
const Nofilter_1 = require("../Objects/Files/Nofilter");
const Assigned_1 = require("../Objects/Files/Assigned");
const MoM_1 = require("../Objects/Files/MoM");
const ProjectProperties_1 = require("../Objects/Lists/ProjectProperties");
const LiteTemplate = {
    Files: [
        {
            Folder: "SitePages",
            Src: "{sitecollection}/Resources/SitePage.txt",
            Url: "ProjectHome.aspx",
            Overwrite: true,
            Properties: {
                Title: "Hjemmeside",
                ContentTypeId: "0x01010901",
            },
            RemoveExistingWebParts: true,
            WebParts: [
                {
                    Title: Resources_1.default.getResource("WebPart_ProjectPhases_Title"),
                    Zone: "LeftColumn",
                    Order: 0,
                    Contents: {
                        FileSrc: "{wpgallery}/ProjectPhases.webpart",
                    },
                },
                {
                    Title: Resources_1.default.getResource("WebPart_Timeline_Title"),
                    Zone: "LeftColumn",
                    Order: 1,
                    PropertyOverrides: [{
                            name: "Title",
                            type: "string",
                            value: Resources_1.default.getResource("WebPart_Timeline_Title"),
                        },
                        {
                            name: "ListUrl",
                            type: "string",
                            value: `{site}/${Resources_1.default.getResource("Lists_Tasks_Url")}`,
                        },
                        {
                            name: "TitleUrl",
                            type: "string",
                            value: `{site}/${Resources_1.default.getResource("DefaultView_Tasks_Url")}`,
                        },
                        {
                            name: "CurrentTaskListWebAddress",
                            type: "string",
                            value: "{site}",
                        },
                        {
                            name: "PageAddress",
                            type: "string",
                            value: "{site}",
                        },
                        {
                            name: "ViewName",
                            type: "string",
                            value: Resources_1.default.getResource("WebPart_Timeline_ViewName"),
                        },
                        {
                            name: "TimelineType",
                            type: "string",
                            value: "TaskListTimeline",
                        }],
                    Contents: {
                        FileSrc: "{wpgallery}/Timeline.webpart",
                    },
                },
                {
                    Title: Resources_1.default.getResource("WebPart_DocumentsCurrentPhase_Title"),
                    Zone: "LeftColumn",
                    Order: 2,
                    PropertyOverrides: [{
                            name: "Title",
                            type: "string",
                            value: Resources_1.default.getResource("WebPart_DocumentsCurrentPhase_Title"),
                        },
                        {
                            name: "ListUrl",
                            type: "string",
                            value: `{site}/${Resources_1.default.getResource("Lists_Documents_Url")}`,
                        },
                        {
                            name: "TitleUrl",
                            type: "string",
                            value: `{site}/${Resources_1.default.getResource("DefaultView_Documents_Url")}`,
                        }],
                    Contents: {
                        FileSrc: "{sitecollection}/Resources/ListViewWebPart.txt",
                    },
                    ListView: {
                        List: Resources_1.default.getResource("Lists_Documents_Title"),
                        View: {
                            Title: "",
                            ViewFields: ["DocIcon", "LinkFilename", "Modified", "Editor"],
                            AdditionalSettings: {
                                RowLimit: 10,
                                Paged: true,
                                ViewQuery: "<OrderBy><FieldRef Name='Created' Ascending='FALSE' /></OrderBy>",
                                Scope: 0,
                            },
                        },
                    },
                },
                {
                    Title: Resources_1.default.getResource("WebPart_ProjectInfo_Title"),
                    Zone: "RightColumn",
                    Order: 0,
                    Contents: {
                        FileSrc: "{wpgallery}/ProjectInfo.webpart",
                    },
                },
                {
                    Title: Resources_1.default.getResource("WebPart_SiteFeed_Title"),
                    Zone: "RightColumn",
                    Order: 1,
                    Contents: {
                        FileSrc: "{wpgallery}/SiteFeed.dwp",
                    },
                },
                {
                    Title: Resources_1.default.getResource("WebPart_UncertaintiesCurrentPhase_Title"),
                    Zone: "RightColumn",
                    Order: 2,
                    PropertyOverrides: [{
                            name: "Title",
                            type: "string",
                            value: Resources_1.default.getResource("WebPart_UncertaintiesCurrentPhase_Title"),
                        },
                        {
                            name: "ListUrl",
                            type: "string",
                            value: `{site}/${Resources_1.default.getResource("Lists_Uncertainties_Url")}`,
                        },
                        {
                            name: "TitleUrl",
                            type: "string",
                            value: `{site}/${Resources_1.default.getResource("DefaultView_Uncertainties_Url")}`,
                        }],
                    Contents: {
                        FileSrc: "{sitecollection}/Resources/ListViewWebPart.txt",
                    },
                    ListView: {
                        List: Resources_1.default.getResource("Lists_Uncertainties_Title"),
                        View: {
                            Title: "",
                            ViewFields: ["LinkTitle", "GtRiskProximity", "GtRiskFactor"],
                            AdditionalSettings: {
                                RowLimit: 10,
                                Paged: true,
                                ViewQuery: "<OrderBy><FieldRef Name='Created' Ascending='FALSE' /></OrderBy>",
                            },
                        },
                    },
                },
            ],
        },
        Nofilter_1.default,
        Assigned_1.default,
        MoM_1.default,
        ProjectStatus_2.default,
    ],
    Lists: [
        ProjectProperties_1.default,
        PhaseChecklist_1.default,
        Information_1.default,
        Stakeholders_1.default,
        CommunicationPlan_1.default,
        Milestones_1.default,
        ProjectLog_1.default,
        ProjectDeliveries_1.default,
        Uncertainties_1.default,
        {
            Title: Resources_1.default.getResource("Lists_Tasks_Title"),
            Description: "",
            Template: 171,
            ContentTypesEnabled: true,
            RemoveExistingContentTypes: true,
            ContentTypeBindings: [{
                    ContentTypeID: "0x010800233B015F95174C9A8EB505493841DE8D",
                }],
            AdditionalSettings: {
                EnableVersioning: true,
            },
            Fields: [
                SiteFields_1.GtProjectTaskComElement,
                SiteFields_1.GtProjectTaskRisk,
                SiteFields_1.GtProjectTaskProduct,
            ],
            Views: [{
                    Title: Resources_1.default.getResource("View_AllTasks_DisplayName"),
                    ViewFields: ["Checkmark", "LinkTitle", "StartDate", "DueDate", "AssignedTo", "GtProjectPhase", "Modified", "Editor"],
                    AdditionalSettings: {
                        RowLimit: 30,
                        Paged: true,
                        ViewQuery: "",
                    },
                },
                {
                    Title: Resources_1.default.getResource("View_RelevantLinks_DisplayName"),
                    ViewFields: ["LinkTitle", "GtProjectTaskComElement", "GtProjectTaskProduct", "GtProjectTaskRisk"],
                    AdditionalSettings: {
                        RowLimit: 30,
                        Paged: true,
                        ViewQuery: "",
                    },
                }],
        },
        MeetingCalendar_1.default,
        Documents_1.default,
        ProjectStatus_1.default,
    ],
    Navigation: {
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
                Url: "#",
                Title: Resources_1.default.getResource("Navigation_Notebook_Title"),
            },
            {
                Url: Resources_1.default.getResource("DefaultView_ProjectDeliveries_Url"),
                Title: Resources_1.default.getResource("Lists_ProjectDeliveries_Title"),
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
    },
    WebSettings: Objects_1.WebSettings,
    ComposedLook: Objects_1.ComposedLook,
    Features: [{
            id: "87294c72-f260-42f3-a41b-981a2ffce37a",
            deactivate: true,
            force: true,
        }],
};
exports.default = LiteTemplate;
