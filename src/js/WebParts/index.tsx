import * as React from "react";
import * as ReactDOM from "react-dom";
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
import IWebPartMapping from "./IWebPartMapping";

/**
 * Maps container ids to JSX.Elements (WebParts)
 */
const wp_map: IWebPartMapping = {
    "pp-projectlist": <ProjectList />,
    "pp-projectinfo": <ProjectInfo filterField="GtPcFrontpage" />,
    "pp-projectphases": <ProjectPhases />,
    "pp-newprojectlink": <NewProjectLink />,
    "pp-announcements": <Announcements />,
    "pp-latestprojects": (
        <LatestProjects
            itemsCount={8}
            reloadInterval={40} />
    ),
    "pp-quicklinks": <QuickLinks />,
    "pp-dynamicportfolio": <DynamicPortfolio />,
    "pp-benefitsoverview": <BenefitsOverview />,
    "pp-benefitsoverview-search": (
        <BenefitsOverview
            dataSource={DataSource.Search}
            groupByOptions={[{
                name: __("String_Project"),
                key: "SiteTitle",
            }]} />
    ),
    "pp-projectstatus": <ProjectStatus />,
    "pp-experiencelog": <ExperienceLog />,
};

/**
 * Render the webparts
 */
export const Render = () => {
    Object.keys(wp_map)
        .filter(id => document.getElementById(id) !== null)
        .forEach(id => {
            ReactDOM.render(wp_map[id], document.getElementById(id));
        });
};

