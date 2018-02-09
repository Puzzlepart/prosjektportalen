import RESOURCE_MANAGER from "../../../../@localization";
import { INavigation } from "sp-pnp-provisioning/lib/schema";

export default function Navigation(language: number): INavigation {
    return {
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
                Url: "SitePages/Mom.aspx",
                Title: RESOURCE_MANAGER.getResource("Navigation_Mom_Title", language),
            },
            {
                Url: "#",
                Title: RESOURCE_MANAGER.getResource("Navigation_Notebook_Title", language),
            },
            {
                Url: RESOURCE_MANAGER.getResource("DefaultView_ChangeAnalysis_Url", language),
                Title: RESOURCE_MANAGER.getResource("Lists_ChangeAnalysis_Title", language),
            },
            {
                Url: RESOURCE_MANAGER.getResource("DefaultView_BenefitsAnalysis_Url", language),
                Title: RESOURCE_MANAGER.getResource("Lists_BenefitsAnalysis_Title", language),
            },
            {
                Url: RESOURCE_MANAGER.getResource("DefaultView_BenefitsFollowup_Url", language),
                Title: RESOURCE_MANAGER.getResource("Lists_BenefitsFollowup_Title", language),
            },
            {
                Url: "SitePages/BenefitsOverview.aspx",
                Title: RESOURCE_MANAGER.getResource("Navigation_BenefitsOverview_Title", language),
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
    };
}
