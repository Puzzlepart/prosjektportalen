import RESOURCE_MANAGER from "localization";
import ProjectList from "./ProjectList";
import ProjectInfo from "./ProjectInfo";
import ProjectPhases from "./ProjectPhases";
import NewProjectLink from "./NewProjectLink";
import Announcements from "./Announcements";
import LatestProjects from "./LatestProjects";
import QuickLinks from "./QuickLinks";
import DynamicPortfolio from "./DynamicPortfolio";
import BenefitsOverview from "./BenefitsOverview";
import ProjectStatus from "./ProjectStatus";
import ExperienceLog from "./ExperienceLog";
import LatestLogEntries from "./LatestLogEntries";
import WebPropertyBagEditor from "./WebPropertyBagEditor";
import DataSource from "./DataSource";
import WebPartComponent from "./WebPartComponent";

/**
 * An array containing WebPartComponents
 */
const WebPartComponents: WebPartComponent[] = [
    new WebPartComponent(ProjectList, "pp-projectlist"),
    new WebPartComponent(ProjectInfo, "pp-projectinfo", { filterField: "GtPcFrontpage" }),
    new WebPartComponent(ProjectPhases, "pp-projectphases"),
    new WebPartComponent(NewProjectLink, "pp-newprojectlink"),
    new WebPartComponent(Announcements, "pp-announcements"),
    new WebPartComponent(LatestProjects, "pp-latestprojects", { itemsCount: 8, reloadInterval: 360 }),
    new WebPartComponent(QuickLinks, "pp-quicklinks"),
    new WebPartComponent(DynamicPortfolio, "pp-dynamicportfolio"),
    new WebPartComponent(BenefitsOverview, "pp-benefitsoverview", { showSearchBox: true }),
    new WebPartComponent(BenefitsOverview, "pp-benefitsoverview-search", { dataSource: DataSource.Search, groupByOptions: [{ name: RESOURCE_MANAGER.getResource("String_Project"), key: "SiteTitle" }] }),
    new WebPartComponent(ProjectStatus, "pp-projectstatus"),
    new WebPartComponent(ExperienceLog, "pp-experiencelog"),
    new WebPartComponent(LatestLogEntries, "pp-latestlogentries"),
    new WebPartComponent(WebPropertyBagEditor, "pp-webPropertyBagEditor"),
];

/**
 * Get webpart component by name
 *
 * @param {string} name Name of the component
 */
export const GetWebPartComponentByName = (name: string): WebPartComponent => {
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
    LatestLogEntries,
    WebPropertyBagEditor,
};
