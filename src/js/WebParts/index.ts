import __ from "../Resources";
import ProjectList, { IProjectListProps } from "./ProjectList";
import ProjectInfo, { IProjectInfoProps } from "./ProjectInfo";
import ProjectPhases, { IProjectPhasesProps } from "./ProjectPhases";
import NewProjectLink, { INewProjectLinkProps } from "./NewProjectLink";
import Announcements, { IAnnouncementsProps } from "./Announcements";
import LatestProjects, { ILatestProjectsProps } from "./LatestProjects";
import QuickLinks, { IQuickLinksProps } from "./QuickLinks";
import DynamicPortfolio, { IDynamicPortfolioProps } from "./DynamicPortfolio";
import BenefitsOverview, { IBenefitsOverviewProps } from "./BenefitsOverview";
import ProjectStatus, { IProjectStatusProps } from "./ProjectStatus";
import ExperienceLog, { IExperienceLogProps } from "./ExperienceLog";
import WebPropertyBagEditor, { IWebPropertyBagEditorProps } from "./WebPropertyBagEditor";
import NewProjectForm, { INewProjectFormProps } from "./NewProjectForm";
import RiskMatrix, { IRiskMatrixProps } from "./RiskMatrix";
import OpportunityMatrix, { IOpportunityMatrixProps } from "./OpportunityMatrix";
import DiceCalculator, { IDiceCalculatorProps } from "./DiceCalculator";
import ProjectStats, { IProjectStatsProps } from "./ProjectStats";
import DeliveriesOverview, { IDeliveriesOverviewProps } from "./DeliveriesOverview";
import ResourceAllocation, { IResourceAllocationProps } from "./ResourceAllocation";
import WebPartComponent from "./WebPartComponent";

/**
 * An array containing WebPartComponents
 */
const WebPartComponents: WebPartComponent<any>[] = [
    new WebPartComponent<IProjectListProps>(ProjectList, "pp-projectlist"),
    new WebPartComponent<IProjectInfoProps>(ProjectInfo, "pp-projectinfo", { filterField: "GtPcFrontpage" }),
    new WebPartComponent<IProjectPhasesProps>(ProjectPhases, "pp-projectphases"),
    new WebPartComponent<INewProjectLinkProps>(NewProjectLink, "pp-newprojectlink"),
    new WebPartComponent<IAnnouncementsProps>(Announcements, "pp-announcements"),
    new WebPartComponent<ILatestProjectsProps>(LatestProjects, "pp-latestprojects", { itemsCount: 8 }),
    new WebPartComponent<IQuickLinksProps>(QuickLinks, "pp-quicklinks"),
    new WebPartComponent<IDynamicPortfolioProps>(DynamicPortfolio, "pp-dynamicportfolio"),
    new WebPartComponent<IBenefitsOverviewProps>(BenefitsOverview, "pp-benefitsoverview", {
        queryTemplate: "(ContentTypeID:0x0100B384774BA4EBB842A5E402EBF4707367* OR ContentTypeID:0x01007A831AC68204F04AAA022CFF06C7BAA2* OR 0x0100FF4E12223AF44F519AF40C441D05DED0*) Path:{Site.URL}",
        showSiteTitleColumn: false,
        groupByOptions: [
            {
                name: __.getResource("Lists_BenefitsAnalysis_Fields_Title_DisplayName"), key: "benefit.title",
            },
            {
                name: __.getResource("SiteFields_GtGainsResponsible_DisplayName"), key: "benefit.responsible",
            },
        ],
    }),
    new WebPartComponent<IBenefitsOverviewProps>(BenefitsOverview, "pp-benefitsoverview-search", {
        dataSourceName: "BENEFITSOVERVIEW",
        groupByOptions: [
            {
                name: __.getResource("String_Project"), key: "siteTitle",
            },
            {
                name: __.getResource("Lists_BenefitsAnalysis_Fields_Title_DisplayName"), key: "benefit.title",
            },
            {
                name: __.getResource("SiteFields_GtGainsResponsible_DisplayName"), key: "benefit.responsible",
            },
        ],
    }),
    new WebPartComponent<IProjectStatusProps>(ProjectStatus, "pp-projectstatus"),
    new WebPartComponent<IExperienceLogProps>(ExperienceLog, "pp-experiencelog"),
    new WebPartComponent<IWebPropertyBagEditorProps>(WebPropertyBagEditor, "pp-webPropertyBagEditor"),
    new WebPartComponent<INewProjectFormProps>(NewProjectForm, "pp-newProjectForm", { style: { width: 500 } }),
    new WebPartComponent<IRiskMatrixProps>(RiskMatrix, "pp-riskMatrix", { showEmptyMessage: true }),
    new WebPartComponent<IOpportunityMatrixProps>(OpportunityMatrix, "pp-opportunityMatrix", { showEmptyMessage: true }),
    new WebPartComponent<IDeliveriesOverviewProps>(DeliveriesOverview, "pp-deliveriesoverview"),
    new WebPartComponent<IDiceCalculatorProps>(DiceCalculator, "pp-diceCalculator", {}),
    new WebPartComponent<IProjectStatsProps>(ProjectStats, "pp-projectStats", {
        viewSelectorEnabled: true,
        statsFieldsListName: __.getResource("Lists_StatsFieldsConfig_Title"),
        chartsConfigListName: __.getResource("Lists_ChartsConfig_Title"),
    }),
    new WebPartComponent<IResourceAllocationProps>(ResourceAllocation, "pp-resourceAllocation"),
];

/**
 * Get webpart component by name
 *
 * @param {string} name Name of the component
 */
export const GetWebPartComponentByName = (name: string): WebPartComponent<any> => {
    let [component] = WebPartComponents.filter(wpc => wpc.name === name);
    return component;
};

/**
 * Render the webparts
 */
export const RenderWebPartsOnPage = () => {
    WebPartComponents.forEach(wpc => wpc.renderOnPage());
};

export {
    ProjectList,
    ProjectInfo,
    ProjectPhases,
    NewProjectLink,
    Announcements,
    LatestProjects,
    QuickLinks,
    DynamicPortfolio,
    BenefitsOverview,
    ProjectStatus,
    ExperienceLog,
    WebPropertyBagEditor,
    NewProjectForm,
    RiskMatrix,
    DiceCalculator,
    ProjectStats,
};
