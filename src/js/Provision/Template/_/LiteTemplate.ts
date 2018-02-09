import RESOURCE_MANAGER from "../../../@localization";
import { Schema } from "sp-pnp-provisioning/lib/schema";
import { Files, Lists, WebSettings, ComposedLook } from "../Objects";

export default function LiteTemplate(language: number): Schema {
    return {
        Files: Files(language),
        Lists: Lists(language),
        Navigation: {
            QuickLaunch: [
                {
                    Url: RESOURCE_MANAGER.getResource("Project_WelcomePage", language),
                    Title: RESOURCE_MANAGER.getResource("Navigation_Home_Title", language),
                    IgnoreExisting: true,
                },
                {
                    Url: "SitePages/ProjectStatus.aspx",
                    Title: RESOURCE_MANAGER.getResource("Navigation_ProjectStatus_Title", language),
                },
                {
                    Url: RESOURCE_MANAGER.getResource("DefaultView_ProjectLog_Url", language),
                    Title: RESOURCE_MANAGER.getResource("Lists_ProjectLog_Title", language),
                },
                {
                    Url: RESOURCE_MANAGER.getResource("DefaultView_Stakeholders_Url", language),
                    Title: RESOURCE_MANAGER.getResource("Lists_Stakeholders_Title", language),
                },
                {
                    Url: RESOURCE_MANAGER.getResource("DefaultView_CommunicationPlan_Url", language),
                    Title: RESOURCE_MANAGER.getResource("Lists_CommunicationPlan_Title", language),
                },
                {
                    Url: RESOURCE_MANAGER.getResource("DefaultView_Uncertainties_Url", language),
                    Title: RESOURCE_MANAGER.getResource("Lists_Uncertainties_Title", language),
                },
                {
                    Url: RESOURCE_MANAGER.getResource("DefaultView_Tasks_Url", language),
                    Title: RESOURCE_MANAGER.getResource("Lists_Tasks_Title", language),
                },
                {
                    Url: RESOURCE_MANAGER.getResource("DefaultView_MeetingCalendar_Url", language),
                    Title: RESOURCE_MANAGER.getResource("Lists_MeetingCalendar_Title", language),
                },
                {
                    Url: RESOURCE_MANAGER.getResource("DefaultView_Documents_Url", language),
                    Title: RESOURCE_MANAGER.getResource("Lists_Documents_Title", language),
                },
                {
                    Url: RESOURCE_MANAGER.getResource("DefaultView_PhaseChecklist_Url", language),
                    Title: RESOURCE_MANAGER.getResource("Lists_PhaseChecklist_Title", language),
                },
                {
                    Url: "#",
                    Title: RESOURCE_MANAGER.getResource("Navigation_Notebook_Title", language),
                },
                {
                    Url: RESOURCE_MANAGER.getResource("DefaultView_ProjectDeliveries_Url", language),
                    Title: RESOURCE_MANAGER.getResource("Lists_ProjectDeliveries_Title", language),
                },
                {
                    Url: "SitePages/Nofilter.aspx",
                    Title: RESOURCE_MANAGER.getResource("Navigation_NoFilterFrontpage_Title", language),
                },
                {
                    Url: RESOURCE_MANAGER.getResource("Navigation_NoPhaseProjectItems_Url", language),
                    Title: RESOURCE_MANAGER.getResource("Navigation_NoPhaseProjectItems_Title", language),
                },
                {
                    Url: "SitePages/Assigned.aspx",
                    Title: RESOURCE_MANAGER.getResource("Navigation_MyProjectItems_Title", language),
                },
                {
                    Url: "_layouts/15/viewlsts.aspx",
                    Title: RESOURCE_MANAGER.getResource("Navigation_SiteContents_Title", language),
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
