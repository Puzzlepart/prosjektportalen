import RESOURCE_MANAGER from "../@localization";
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
import DiceCalculator, { IDiceCalculatorProps } from "./DiceCalculator";
import DataSource from "./DataSource";
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
    new WebPartComponent<ILatestProjectsProps>(LatestProjects, "pp-latestprojects", { itemsCount: 8, reloadInterval: 360 }),
    new WebPartComponent<IQuickLinksProps>(QuickLinks, "pp-quicklinks"),
    new WebPartComponent<IDynamicPortfolioProps>(DynamicPortfolio, "pp-dynamicportfolio"),
    new WebPartComponent<IBenefitsOverviewProps>(BenefitsOverview, "pp-benefitsoverview", { showSearchBox: true }),
    new WebPartComponent<IBenefitsOverviewProps>(BenefitsOverview, "pp-benefitsoverview-search", { dataSource: DataSource.Search, groupByOptions: [{ name: RESOURCE_MANAGER.getResource("String_Project"), key: "SiteTitle" }] }),
    new WebPartComponent<IProjectStatusProps>(ProjectStatus, "pp-projectstatus"),
    new WebPartComponent<IExperienceLogProps>(ExperienceLog, "pp-experiencelog"),
    new WebPartComponent<IWebPropertyBagEditorProps>(WebPropertyBagEditor, "pp-webPropertyBagEditor"),
    new WebPartComponent<INewProjectFormProps>(NewProjectForm, "pp-newProjectForm", { style: { width: 500 } }),
    new WebPartComponent<IRiskMatrixProps>(RiskMatrix, "pp-riskMatrix", { showEmptyMessage: true }),
    new WebPartComponent<IDiceCalculatorProps>(DiceCalculator, "pp-diceCalculator", {}),
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
};
