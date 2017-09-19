import Localization from "localization";
import { INavigation } from "sp-pnp-provisioning/lib/schema";

const Navigation: INavigation = {
    QuickLaunch: [
        {
            Url: Localization.getResource("Project_WelcomePage"),
            Title: Localization.getResource("Navigation_Home_Title"),
            IgnoreExisting: true,
        },
        {
            Url: "SitePages/ProjectStatus.aspx",
            Title: Localization.getResource("Navigation_ProjectStatus_Title"),
        },
        {
            Url: Localization.getResource("DefaultView_ProjectLog_Url"),
            Title: Localization.getResource("Lists_ProjectLog_Title"),
        },
        {
            Url: Localization.getResource("DefaultView_Stakeholders_Url"),
            Title: Localization.getResource("Lists_Stakeholders_Title"),
        },
        {
            Url: Localization.getResource("DefaultView_CommunicationPlan_Url"),
            Title: Localization.getResource("Lists_CommunicationPlan_Title"),
        },
        {
            Url: Localization.getResource("DefaultView_Uncertainties_Url"),
            Title: Localization.getResource("Lists_Uncertainties_Title"),
        },
        {
            Url: Localization.getResource("DefaultView_Tasks_Url"),
            Title: Localization.getResource("Lists_Tasks_Title"),
        },
        {
            Url: Localization.getResource("DefaultView_MeetingCalendar_Url"),
            Title: Localization.getResource("Lists_MeetingCalendar_Title"),
        },
        {
            Url: Localization.getResource("DefaultView_Documents_Url"),
            Title: Localization.getResource("Lists_Documents_Title"),
        },
        {
            Url: Localization.getResource("DefaultView_PhaseChecklist_Url"),
            Title: Localization.getResource("Lists_PhaseChecklist_Title"),
        },
        {
            Url: "SitePages/Mom.aspx",
            Title: Localization.getResource("Navigation_Mom_Title"),
        },
        {
            Url: "#",
            Title: Localization.getResource("Navigation_Notebook_Title"),
        },
        {
            Url: Localization.getResource("DefaultView_ChangeAnalysis_Url"),
            Title: Localization.getResource("Lists_ChangeAnalysis_Title"),
        },
        {
            Url: Localization.getResource("DefaultView_BenefitsAnalysis_Url"),
            Title: Localization.getResource("Lists_BenefitsAnalysis_Title"),
        },
        {
            Url: Localization.getResource("DefaultView_BenefitsFollowup_Url"),
            Title: Localization.getResource("Lists_BenefitsFollowup_Title"),
        },
        {
            Url: "SitePages/BenefitsOverview.aspx",
            Title: Localization.getResource("Navigation_BenefitsOverview_Title"),
        },
        {
            Url: Localization.getResource("DefaultView_ProjectDeliveries_Url"),
            Title: Localization.getResource("Lists_ProjectDeliveries_Title"),
        },
        {
            Url: "SitePages/Nofilter.aspx",
            Title: Localization.getResource("Navigation_NoFilterFrontpage_Title"),
        },
        {
            Url: Localization.getResource("Navigation_NoPhaseProjectItems_Url"),
            Title: Localization.getResource("Navigation_NoPhaseProjectItems_Title"),
        },
        {
            Url: "SitePages/Assigned.aspx",
            Title: Localization.getResource("Navigation_MyProjectItems_Title"),
        },
        {
            Url: "_layouts/15/viewlsts.aspx",
            Title: Localization.getResource("Navigation_SiteContents_Title"),
        },
    ],
};

export default Navigation;
