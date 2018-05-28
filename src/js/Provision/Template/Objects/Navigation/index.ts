import RESOURCE_MANAGER from "../../../../Resources";
import { INavigation } from "sp-js-provisioning/lib/schema";

const Navigation: INavigation = {
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
            Url: "SitePages/Mom.aspx",
            Title: RESOURCE_MANAGER.getResource("Navigation_Mom_Title"),
        },
        {
            Url: "#",
            Title: RESOURCE_MANAGER.getResource("Navigation_Notebook_Title"),
        },
        {
            Url: RESOURCE_MANAGER.getResource("DefaultView_ChangeAnalysis_Url"),
            Title: RESOURCE_MANAGER.getResource("Lists_ChangeAnalysis_Title"),
        },
        {
            Url: RESOURCE_MANAGER.getResource("DefaultView_BenefitsAnalysis_Url"),
            Title: RESOURCE_MANAGER.getResource("Lists_BenefitsAnalysis_Title"),
        },
        {
            Url: RESOURCE_MANAGER.getResource("DefaultView_BenefitsFollowup_Url"),
            Title: RESOURCE_MANAGER.getResource("Lists_BenefitsFollowup_Title"),
        },
        {
            Url: "SitePages/BenefitsOverview.aspx",
            Title: RESOURCE_MANAGER.getResource("Navigation_BenefitsOverview_Title"),
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
};

export default Navigation;
