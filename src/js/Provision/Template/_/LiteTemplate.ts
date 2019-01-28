import __ from "../../../Resources";
import { Schema } from "sp-js-provisioning/lib/schema";
import { WebSettings, ComposedLook } from "../Objects";
import SitePages from "../Objects/Lists/SitePages";
import PhaseChecklist from "../Objects/Lists/PhaseChecklist";
import Information from "../Objects/Lists/Information";
import Stakeholders from "../Objects/Lists/Stakeholders";
import CommunicationPlan from "../Objects/Lists/CommunicationPlan";
import Milestones from "../Objects/Lists/Milestones";
import ProjectLog from "../Objects/Lists/ProjectLog";
import ProjectDeliveries from "../Objects/Lists/ProjectDeliveries";
import Uncertainties from "../Objects/Lists/Uncertainties";
import MeetingCalendar from "../Objects/Lists/MeetingCalendar";
import Documents from "../Objects/Lists/Documents";
import ProjectStatus from "../Objects/Lists/ProjectStatus";
import { GtProjectTaskComElement, GtProjectTaskRisk, GtProjectTaskProduct } from "../Objects/Lists/SiteFields";
import { default as ProjectStatusPage } from "../Objects/Files/ProjectStatus";
import { default as NofilterPage } from "../Objects/Files/Nofilter";
import { default as AssignedPage } from "../Objects/Files/Assigned";
import { default as MoMPage } from "../Objects/Files/MoM";


const LiteTemplate: Schema = {
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
                    Title: __.getResource("WebPart_ProjectPhases_Title"),
                    Zone: "LeftColumn",
                    Order: 0,
                    Contents: {
                        FileSrc: "{wpgallery}/ProjectPhases.webpart",
                    },
                },
                {
                    Title: __.getResource("WebPart_Timeline_Title"),
                    Zone: "LeftColumn",
                    Order: 1,
                    PropertyOverrides: [{
                        name: "Title",
                        type: "string",
                        value: __.getResource("WebPart_Timeline_Title"),
                    },
                    {
                        name: "ListUrl",
                        type: "string",
                        value: `{site}/${__.getResource("Lists_Tasks_Url")}`,
                    },
                    {
                        name: "TitleUrl",
                        type: "string",
                        value: `{site}/${__.getResource("DefaultView_Tasks_Url")}`,
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
                        value: __.getResource("WebPart_Timeline_ViewName"),
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
                    Title: __.getResource("WebPart_DocumentsCurrentPhase_Title"),
                    Zone: "LeftColumn",
                    Order: 2,
                    PropertyOverrides: [{
                        name: "Title",
                        type: "string",
                        value: __.getResource("WebPart_DocumentsCurrentPhase_Title"),
                    },
                    {
                        name: "ListUrl",
                        type: "string",
                        value: `{site}/${__.getResource("Lists_Documents_Url")}`,
                    },
                    {
                        name: "TitleUrl",
                        type: "string",
                        value: `{site}/${__.getResource("DefaultView_Documents_Url")}`,
                    }],
                    Contents: {
                        FileSrc: "{sitecollection}/Resources/ListViewWebPart.txt",
                    },
                    ListView: {
                        List: __.getResource("Lists_Documents_Title"),
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
                    Title: __.getResource("WebPart_ProjectInfo_Title"),
                    Zone: "RightColumn",
                    Order: 0,
                    Contents: {
                        FileSrc: "{wpgallery}/ProjectInfo.webpart",
                    },
                },
                {
                    Title: __.getResource("WebPart_SiteFeed_Title"),
                    Zone: "RightColumn",
                    Order: 1,
                    Contents: {
                        FileSrc: "{wpgallery}/SiteFeed.dwp",
                    },
                },
                {
                    Title: __.getResource("WebPart_UncertaintiesCurrentPhase_Title"),
                    Zone: "RightColumn",
                    Order: 2,
                    PropertyOverrides: [{
                        name: "Title",
                        type: "string",
                        value: __.getResource("WebPart_UncertaintiesCurrentPhase_Title"),
                    },
                    {
                        name: "ListUrl",
                        type: "string",
                        value: `{site}/${__.getResource("Lists_Uncertainties_Url")}`,
                    },
                    {
                        name: "TitleUrl",
                        type: "string",
                        value: `{site}/${__.getResource("DefaultView_Uncertainties_Url")}`,
                    }],
                    Contents: {
                        FileSrc: "{sitecollection}/Resources/ListViewWebPart.txt",
                    },
                    ListView: {
                        List: __.getResource("Lists_Uncertainties_Title"),
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
        NofilterPage,
        AssignedPage,
        MoMPage,
        ProjectStatusPage,
    ],
    Lists: [
        SitePages,
        PhaseChecklist,
        Information,
        Stakeholders,
        CommunicationPlan,
        Milestones,
        ProjectLog,
        ProjectDeliveries,
        Uncertainties,
        {
            Title: __.getResource("Lists_Tasks_Title"),
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
                GtProjectTaskComElement,
                GtProjectTaskRisk,
                GtProjectTaskProduct,
            ],
            Views: [{
                Title: __.getResource("View_AllTasks_DisplayName"),
                ViewFields: ["Checkmark", "LinkTitle", "StartDate", "DueDate", "AssignedTo", "GtProjectPhase", "Modified", "Editor"],
                AdditionalSettings: {
                    RowLimit: 30,
                    Paged: true,
                    ViewQuery: "",
                },
            },
            {
                Title: __.getResource("View_RelevantLinks_DisplayName"),
                ViewFields: ["LinkTitle", "GtProjectTaskComElement", "GtProjectTaskProduct", "GtProjectTaskRisk"],
                AdditionalSettings: {
                    RowLimit: 30,
                    Paged: true,
                    ViewQuery: "",
                },
            }],
        },
        MeetingCalendar,
        Documents,
        ProjectStatus,
    ],
    Navigation: {
        QuickLaunch: [
            {
                Url: __.getResource("Project_WelcomePage"),
                Title: __.getResource("Navigation_Home_Title"),
                IgnoreExisting: true,
            },
            {
                Url: "SitePages/ProjectStatus.aspx",
                Title: __.getResource("Navigation_ProjectStatus_Title"),
            },
            {
                Url: __.getResource("DefaultView_ProjectLog_Url"),
                Title: __.getResource("Lists_ProjectLog_Title"),
            },
            {
                Url: __.getResource("DefaultView_Stakeholders_Url"),
                Title: __.getResource("Lists_Stakeholders_Title"),
            },
            {
                Url: __.getResource("DefaultView_CommunicationPlan_Url"),
                Title: __.getResource("Lists_CommunicationPlan_Title"),
            },
            {
                Url: __.getResource("DefaultView_Uncertainties_Url"),
                Title: __.getResource("Lists_Uncertainties_Title"),
            },
            {
                Url: __.getResource("DefaultView_Tasks_Url"),
                Title: __.getResource("Lists_Tasks_Title"),
            },
            {
                Url: __.getResource("DefaultView_MeetingCalendar_Url"),
                Title: __.getResource("Lists_MeetingCalendar_Title"),
            },
            {
                Url: __.getResource("DefaultView_Documents_Url"),
                Title: __.getResource("Lists_Documents_Title"),
            },
            {
                Url: __.getResource("DefaultView_PhaseChecklist_Url"),
                Title: __.getResource("Lists_PhaseChecklist_Title"),
            },
            {
                Url: "#",
                Title: __.getResource("Navigation_Notebook_Title"),
            },
            {
                Url: __.getResource("DefaultView_ProjectDeliveries_Url"),
                Title: __.getResource("Lists_ProjectDeliveries_Title"),
            },
            {
                Url: "SitePages/Nofilter.aspx",
                Title: __.getResource("Navigation_NoFilterFrontpage_Title"),
            },
            {
                Url: __.getResource("Navigation_NoPhaseProjectItems_Url"),
                Title: __.getResource("Navigation_NoPhaseProjectItems_Title"),
            },
            {
                Url: "SitePages/Assigned.aspx",
                Title: __.getResource("Navigation_MyProjectItems_Title"),
            },
            {
                Url: "_layouts/15/viewlsts.aspx",
                Title: __.getResource("Navigation_SiteContents_Title"),
            },
        ],

    },
    WebSettings,
    ComposedLook,
    Features: [{
        id: "87294c72-f260-42f3-a41b-981a2ffce37a",
        deactivate: true,
        force: true,
    }],
};

export default LiteTemplate;

