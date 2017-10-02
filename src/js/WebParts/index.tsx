import * as React from "react";
// import RESOURCE_MANAGER from "localization";
// import ProjectList from "./ProjectList";
// import ProjectInfo from "./ProjectInfo";
// import ProjectPhases from "./ProjectPhases";
// import NewProjectLink from "./NewProjectLink";
// import Announcements from "./Announcements";
// import LatestProjects from "./LatestProjects";
// import QuickLinks from "./QuickLinks";
// import DynamicPortfolio from "./DynamicPortfolio";
// import BenefitsOverview from "./BenefitsOverview";
// import ProjectStatus from "./ProjectStatus";
// import ExperienceLog from "./ExperienceLog";
// import LatestLogEntries from "./LatestLogEntries";
import WebPropertyBagEditor from "./WebPropertyBagEditor";
// import DataSource from "./DataSource";
import WebPartComponent from "./WebPartComponent";

/**
 * An array containing WebPartComponents
 */
const WebPartComponents: WebPartComponent[] = [
    // new WebPartComponent(ProjectList.displayName, "pp-projectlist", <ProjectList />),
    // new WebPartComponent(ProjectInfo.displayName, "pp-projectinfo", <ProjectInfo filterField="GtPcFrontpage" />),
    // new WebPartComponent(ProjectPhases.displayName, "pp-projectphases", <ProjectPhases />),
    // new WebPartComponent(NewProjectLink.displayName, "pp-newprojectlink", <NewProjectLink />),
    // new WebPartComponent(Announcements.displayName, "pp-announcements", <Announcements />),
    // new WebPartComponent(LatestProjects.displayName, "pp-latestprojects", <LatestProjects itemsCount={8} reloadInterval={360} />),
    // new WebPartComponent(QuickLinks.displayName, "pp-quicklinks", <QuickLinks />),
    // new WebPartComponent(DynamicPortfolio.displayName, "pp-dynamicportfolio", <DynamicPortfolio />),
    // new WebPartComponent(BenefitsOverview.displayName, "pp-benefitsoverview", <BenefitsOverview />),
    // new WebPartComponent(BenefitsOverview.displayName, "pp-benefitsoverview-search", <BenefitsOverview dataSource={DataSource.Search} groupByOptions={[{ name: RESOURCE_MANAGER.getResource("String_Project"), key: "SiteTitle" }]} />),
    // new WebPartComponent(ProjectStatus.displayName, "pp-projectstatus", <ProjectStatus />),
    // new WebPartComponent(ExperienceLog.displayName, "pp-experiencelog", <ExperienceLog />),
    // new WebPartComponent(LatestLogEntries.displayName, "pp-latestlogentries", <LatestLogEntries />),
    new WebPartComponent(WebPropertyBagEditor.displayName, "pp-webPropertyBagEditor", <WebPropertyBagEditor />)
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
export const Render = () => {
    WebPartComponents.forEach(wpc => wpc.renderOnPage());
};

// export {
//     ProjectList,
//     ProjectInfo,
//     ProjectPhases,
//     NewProjectLink,
//     Announcements,
//     LatestProjects,
//     QuickLinks,
//     DynamicPortfolio,
//     BenefitsOverview,
//     ProjectStatus,
//     ExperienceLog,
//     LatestLogEntries,
// };
