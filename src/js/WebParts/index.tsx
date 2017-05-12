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
import GainsOverview from "./GainsOverview";
import ProjectStatus from "./ProjectStatus";
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
    "pp-latestprojects": <LatestProjects itemsCount={8} reloadInterval={40} />,
    "pp-quicklinks": <QuickLinks />,
    "pp-dynamicportfolio": <DynamicPortfolio />,
    "pp-gainsoverview": <GainsOverview />,
    "pp-gainsoverview-search": <GainsOverview dataSource={DataSource.Search} />,
    "pp-projectstatus": <ProjectStatus />,
};

/**
 * Render the webparts
 */
export const Render = () => {
    Object.keys(wp_map).forEach(id => {
        let container = document.getElementById(id);
        if (container) {
            ReactDOM.render(wp_map[id], container);
        }
    });
};

