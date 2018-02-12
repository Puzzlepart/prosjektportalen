import RESOURCE_MANAGER from "../../../@localization";
import { Schema } from "sp-pnp-provisioning/lib/schema";
import { Files, WebSettings, ComposedLook } from "../Objects";
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


export default function LiteTemplate(language: number): Schema {
    return {
        Files,
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
                Title: RESOURCE_MANAGER.getResource("Lists_Tasks_Title"),
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
                    Title: RESOURCE_MANAGER.getResource("View_AllTasks_DisplayName"),
                    ViewFields: ["Checkmark", "LinkTitle", "StartDate", "DueDate", "AssignedTo", "GtProjectPhase", "Modified", "Editor"],
                    AdditionalSettings: {
                        RowLimit: 30,
                        Paged: true,
                        ViewQuery: "",
                    },
                },
                {
                    Title: RESOURCE_MANAGER.getResource("View_RelevantLinks_DisplayName"),
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
                    Url: RESOURCE_MANAGER.getResource("Project_WelcomePage"),
                    Title: RESOURCE_MANAGER.getResource("Navigation_Home_Title"),
                    IgnoreExisting: true,
                },
                {
                    Url: "SitePages/ProjectStatus.aspx",
                    Title: RESOURCE_MANAGER.getResource("Navigation_ProjectStatus_Title"),
                },
                {
                    Url: RESOURCE_MANAGER.getResource("DefaultView_ProjectLog_Url"),
                    Title: RESOURCE_MANAGER.getResource("Lists_ProjectLog_Title"),
                },
                {
                    Url: RESOURCE_MANAGER.getResource("DefaultView_Stakeholders_Url"),
                    Title: RESOURCE_MANAGER.getResource("Lists_Stakeholders_Title"),
                },
                {
                    Url: RESOURCE_MANAGER.getResource("DefaultView_CommunicationPlan_Url"),
                    Title: RESOURCE_MANAGER.getResource("Lists_CommunicationPlan_Title"),
                },
                {
                    Url: RESOURCE_MANAGER.getResource("DefaultView_Uncertainties_Url"),
                    Title: RESOURCE_MANAGER.getResource("Lists_Uncertainties_Title"),
                },
                {
                    Url: RESOURCE_MANAGER.getResource("DefaultView_Tasks_Url"),
                    Title: RESOURCE_MANAGER.getResource("Lists_Tasks_Title"),
                },
                {
                    Url: RESOURCE_MANAGER.getResource("DefaultView_MeetingCalendar_Url"),
                    Title: RESOURCE_MANAGER.getResource("Lists_MeetingCalendar_Title"),
                },
                {
                    Url: RESOURCE_MANAGER.getResource("DefaultView_Documents_Url"),
                    Title: RESOURCE_MANAGER.getResource("Lists_Documents_Title"),
                },
                {
                    Url: RESOURCE_MANAGER.getResource("DefaultView_PhaseChecklist_Url"),
                    Title: RESOURCE_MANAGER.getResource("Lists_PhaseChecklist_Title"),
                },
                {
                    Url: "#",
                    Title: RESOURCE_MANAGER.getResource("Navigation_Notebook_Title"),
                },
                {
                    Url: RESOURCE_MANAGER.getResource("DefaultView_ProjectDeliveries_Url"),
                    Title: RESOURCE_MANAGER.getResource("Lists_ProjectDeliveries_Title"),
                },
                {
                    Url: "SitePages/Nofilter.aspx",
                    Title: RESOURCE_MANAGER.getResource("Navigation_NoFilterFrontpage_Title"),
                },
                {
                    Url: RESOURCE_MANAGER.getResource("Navigation_NoPhaseProjectItems_Url"),
                    Title: RESOURCE_MANAGER.getResource("Navigation_NoPhaseProjectItems_Title"),
                },
                {
                    Url: "SitePages/Assigned.aspx",
                    Title: RESOURCE_MANAGER.getResource("Navigation_MyProjectItems_Title"),
                },
                {
                    Url: "_layouts/15/viewlsts.aspx",
                    Title: RESOURCE_MANAGER.getResource("Navigation_SiteContents_Title"),
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
}
