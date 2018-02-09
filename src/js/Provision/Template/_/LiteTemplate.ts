import RESOURCE_MANAGER from "../../../@localization";
import { Schema } from "sp-pnp-provisioning/lib/schema";
import { Files, Lists, WebSettings, ComposedLook } from "../Objects";

export default function LiteTemplate(language: number): Schema {
    return {
        Files,
        Lists,
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
