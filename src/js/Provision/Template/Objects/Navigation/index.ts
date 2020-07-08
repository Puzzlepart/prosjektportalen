import __ from '../../../../Resources'
import { INavigation } from 'sp-js-provisioning/lib/schema'

const Navigation: INavigation = {
    QuickLaunch: [
        {
            Url: __.getResource('Project_WelcomePage'),
            Title: __.getResource('Navigation_Home_Title'),
            IgnoreExisting: true,
        },
        {
            Url: 'SitePages/ProjectStatus.aspx',
            Title: __.getResource('Navigation_ProjectStatus_Title'),
        },
        {
            Url: __.getResource('DefaultView_ProjectLog_Url'),
            Title: __.getResource('Lists_ProjectLog_Title'),
        },
        {
            Url: __.getResource('DefaultView_Stakeholders_Url'),
            Title: __.getResource('Lists_Stakeholders_Title'),
        },
        {
            Url: __.getResource('DefaultView_CommunicationPlan_Url'),
            Title: __.getResource('Lists_CommunicationPlan_Title'),
        },
        {
            Url: __.getResource('DefaultView_Uncertainties_Url'),
            Title: __.getResource('Lists_Uncertainties_Title'),
        },
        {
            Url: __.getResource('DefaultView_Tasks_Url'),
            Title: __.getResource('Lists_Tasks_Title'),
        },
        {
            Url: __.getResource('DefaultView_MeetingCalendar_Url'),
            Title: __.getResource('Lists_MeetingCalendar_Title'),
        },
        {
            Url: __.getResource('DefaultView_Documents_Url'),
            Title: __.getResource('Lists_Documents_Title'),
        },
        {
            Url: __.getResource('DefaultView_PhaseChecklist_Url'),
            Title: __.getResource('Lists_PhaseChecklist_Title'),
        },
        {
            Url: 'SitePages/Mom.aspx',
            Title: __.getResource('Navigation_Mom_Title'),
        },
        {
            Url: '#',
            Title: __.getResource('Navigation_Notebook_Title'),
        },
        {
            Url: __.getResource('DefaultView_ChangeAnalysis_Url'),
            Title: __.getResource('Lists_ChangeAnalysis_Title'),
        },
        {
            Url: __.getResource('DefaultView_BenefitsAnalysis_Url'),
            Title: __.getResource('Lists_BenefitsAnalysis_Title'),
        },
        {
            Url: __.getResource('DefaultView_MeasurementIndicators_Url'),
            Title: __.getResource('Lists_MeasurementIndicators_Title'),
        },
        {
            Url: __.getResource('DefaultView_BenefitsFollowup_Url'),
            Title: __.getResource('Navigation_BenefitsFollowup_Title'),
        },
        {
            Url: 'SitePages/BenefitsOverview.aspx',
            Title: __.getResource('Navigation_BenefitsOverview_Title'),
        },
        {
            Url: __.getResource('DefaultView_ProjectDeliveries_Url'),
            Title: __.getResource('Lists_ProjectDeliveries_Title'),
        },
        {
            Url: __.getResource('DefaultView_ResourceAllocation_Url'),
            Title: __.getResource('Lists_ResourceAllocation_Title'),
        },
        {
            Url: 'SitePages/Nofilter.aspx',
            Title: __.getResource('Navigation_NoFilterFrontpage_Title'),
        },
        {
            Url: __.getResource('Navigation_NoPhaseProjectItems_Url'),
            Title: __.getResource('Navigation_NoPhaseProjectItems_Title'),
        },
        {
            Url: 'SitePages/Assigned.aspx',
            Title: __.getResource('Navigation_MyProjectItems_Title'),
        },
        {
            Url: '_layouts/15/viewlsts.aspx',
            Title: __.getResource('Navigation_SiteContents_Title'),
        },
    ],
}

export default Navigation
