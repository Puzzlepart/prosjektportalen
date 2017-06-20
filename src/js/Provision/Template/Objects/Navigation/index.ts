import { INavigation } from "sp-pnp-provisioning/lib/schema";

const Navigation: INavigation = {
    QuickLaunch: [
        {
            Url: __("Project_WelcomePage"),
            Title: __("Navigation_Home_Title"),
            IgnoreExisting: true,
        },
        {
            Url: "SitePages/ProjectStatus.aspx",
            Title: __("Navigation_ProjectStatus_Title"),
        },
        {
            Url: __("DefaultView_ProjectLog_Url"),
            Title: __("Lists_ProjectLog_Title"),
        },
        {
            Url: __("DefaultView_Stakeholders_Url"),
            Title: __("Lists_Stakeholders_Title"),
        },
        {
            Url: __("DefaultView_CommunicationPlan_Url"),
            Title: __("Lists_CommunicationPlan_Title"),
        },
        {
            Url: __("DefaultView_Uncertainties_Url"),
            Title: __("Lists_Uncertainties_Title"),
        },
        {
            Url: __("DefaultView_Tasks_Url"),
            Title: __("Lists_Tasks_Title"),
        },
        {
            Url: __("DefaultView_MeetingCalendar_Url"),
            Title: __("Lists_MeetingCalendar_Title"),
        },
        {
            Url: __("DefaultView_Documents_Url"),
            Title: __("Lists_Documents_Title"),
        },
        {
            Url: __("DefaultView_PhaseChecklist_Url"),
            Title: __("Lists_PhaseChecklist_Title"),
        },
        {
            Url: "SitePages/Mom.aspx",
            Title: __("Navigation_Mom_Title"),
        },
        {
            Url: "#",
            Title: __("Navigation_Notebook_Title"),
        },
        {
            Url: __("DefaultView_ChangeAnalysis_Url"),
            Title: __("Lists_ChangeAnalysis_Title"),
        },
        {
            Url: __("DefaultView_BenefitsAnalysis_Url"),
            Title: __("Lists_BenefitsAnalysis_Title"),
        },
        {
            Url: __("DefaultView_BenefitsFollowup_Url"),
            Title: __("Lists_BenefitsFollowup_Title"),
        },
        {
            Url: "SitePages/BenefitsOverview.aspx",
            Title: __("Navigation_BenefitsOverview_Title"),
        },
        {
            Url: __("DefaultView_ProjectProducts_Url"),
            Title: __("Lists_ProjectProducts_Title"),
        },
        {
            Url: "SitePages/Nofilter.aspx",
            Title: __("Navigation_NoFilterFrontpage_Title"),
        },
        {
            Url: "_layouts/15/osssearchresults.aspx?k=owstaxIdGtProjectPhase%3A%22Ingen%20fase%22",
            Title: __("Navigation_NoPhaseProjectItems_Title"),
        },
        {
            Url: "SitePages/Assigned.aspx",
            Title: __("Navigation_MyProjectItems_Title"),
        },
        {
            Url: "_layouts/15/viewlsts.aspx",
            Title: __("Navigation_SiteContents_Title"),
        },
    ],
};

export default Navigation;
