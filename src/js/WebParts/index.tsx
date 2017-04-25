import * as React from "react";
import * as ReactDOM from "react-dom";
import { default as ProjectInfo } from "./ProjectInfo";
import { default as ProjectPhases } from "./ProjectPhases";
import { default as NewProjectLink } from "./NewProjectLink";
import { default as Announcements } from "./Announcements";
import { default as LatestProjects } from "./LatestProjects";
import { default as QuickLinks } from "./QuickLinks";
import { default as DynamicPortfolio } from "./DynamicPortfolio";
import { default as GainsOverview } from "./GainsOverview";
import { default as ProjectStatus } from "./ProjectStatus";
import { DataSource } from "./DataSource";

/**
 * Maps container ids to JSX.Elements (WebParts)
 */
const wp_map: { [id: string]: JSX.Element } = {
    "pp-projectinfo": <ProjectInfo filterField="GtPcFrontpage" />,
    "pp-projectphases": <ProjectPhases />,
    "pp-newprojectlink": <NewProjectLink />,
    "pp-announcements": <Announcements />,
    "pp-latestprojects": <LatestProjects />,
    "pp-quicklinks": <QuickLinks />,
    "pp-dynamicportfolio": <DynamicPortfolio />,
    "pp-gainsoverview": <GainsOverview dataSource={DataSource.List} />,
    "pp-gainsoverview-search": <GainsOverview dataSource={DataSource.Search} groupByOptions={[{ label: "Grupper på prosjekt", property: "SiteTitle" }]} />,
    "pp-projectstatus": <ProjectStatus />,
};

const Render = () => {
    Object.keys(wp_map).forEach(id => {
        let container = document.getElementById(id);
        if (container) {
            ReactDOM.render(wp_map[id], container);
        }
    });
};

export { Render };
