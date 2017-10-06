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
import NewProjectForm from "./NewProjectForm";
import DataSource from "./DataSource";
import WebPartComponent from "./WebPartComponent";

/**
 * An array containing WebPartComponents
 */
const WebPartComponents: WebPartComponent<any>[] = [
    new WebPartComponent<any>(ProjectList, "pp-projectlist"),
    new WebPartComponent<any>(ProjectInfo, "pp-projectinfo", { filterField: "GtPcFrontpage" }),
    new WebPartComponent<any>(ProjectPhases, "pp-projectphases"),
    new WebPartComponent<any>(NewProjectLink, "pp-newprojectlink"),
    new WebPartComponent<any>(Announcements, "pp-announcements"),
    new WebPartComponent<any>(LatestProjects, "pp-latestprojects", { itemsCount: 8, reloadInterval: 360 }),
    new WebPartComponent<any>(QuickLinks, "pp-quicklinks"),
    new WebPartComponent<any>(DynamicPortfolio, "pp-dynamicportfolio"),
    new WebPartComponent<any>(BenefitsOverview, "pp-benefitsoverview", { showSearchBox: true }),
    new WebPartComponent<any>(BenefitsOverview, "pp-benefitsoverview-search", { dataSource: DataSource.Search, groupByOptions: [{ name: RESOURCE_MANAGER.getResource("String_Project"), key: "SiteTitle" }] }),
    new WebPartComponent<any>(ProjectStatus, "pp-projectstatus"),
    new WebPartComponent<any>(ExperienceLog, "pp-experiencelog"),
    new WebPartComponent<any>(LatestLogEntries, "pp-latestlogentries"),
    new WebPartComponent<any>(WebPropertyBagEditor, "pp-webPropertyBagEditor"),
    new WebPartComponent<any>(NewProjectForm, "pp-newProjectForm", { style: { width: 500 } }),
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
    LatestLogEntries,
    WebPropertyBagEditor,
};
