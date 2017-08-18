import * as React from "react";
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
import DataSource from "./DataSource";
import WebPartComponent from "./WebPartComponent";

/**
 * Maps container ids to JSX.Elements (WebParts)
 */
const WebPartComponents: WebPartComponent[] = [
    new WebPartComponent("ProjectList", "pp-projectlist", <ProjectList />),
    new WebPartComponent("ProjectInfo", "pp-projectinfo", <ProjectInfo filterField="GtPcFrontpage" />),
    new WebPartComponent("ProjectPhases", "pp-projectphases", <ProjectPhases />),
    new WebPartComponent("NewProjectLink", "pp-newprojectlink", <NewProjectLink />),
    new WebPartComponent("Announcements", "pp-announcements", <Announcements />),
    new WebPartComponent("LatestProjects", "pp-latestprojects", <LatestProjects itemsCount={8} reloadInterval={360} />),
    new WebPartComponent("QuickLinks", "pp-quicklinks", <QuickLinks />),
    new WebPartComponent("DynamicPortfolio", "pp-dynamicportfolio", <DynamicPortfolio />),
    new WebPartComponent("BenefitsOverview", "pp-benefitsoverview", <BenefitsOverview />),
    new WebPartComponent("BenefitsOverview", "pp-benefitsoverview-search", <BenefitsOverview dataSource={DataSource.Search} groupByOptions={[{ name: __("String_Project"), key: "SiteTitle" }]} />),
    new WebPartComponent("ProjectStatus", "pp-projectstatus", <ProjectStatus />),
    new WebPartComponent("ExperienceLog", "pp-experiencelog", <ExperienceLog />),
];

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

