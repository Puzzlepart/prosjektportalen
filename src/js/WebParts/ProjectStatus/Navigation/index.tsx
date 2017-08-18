import * as React from "react";
import { Icon } from "office-ui-fabric-react/lib/Icon";
import { Link } from "react-scroll";
import ExportReport from "../ExportReport";
import INavigationProps from "./INavigationProps";

const Navigation = ({ project, sections }: INavigationProps) => {
    return (
        <div className="ms-Grid nav-status-container">
            <div className="nav-details ms-Grid-row">
                <div className="ms-Grid-col ms-md6">
                    <h2 className="status-page-header">{`${__("String_StatusReport")}: ${_spPageContextInfo.webTitle}`}</h2>
                </div>
                <div className=" ms-Grid-col ms-md6">
                    <ExportReport project={project} />
                </div>
            </div>
            <div
                className="nav-links"
                hidden={sections.length === 0}>
                {sections.map((section, key) => (
                    <Link
                        key={key}
                        className="nav-link"
                        activeClass="active"
                        to={`section-${key}`}
                        offset={-100}
                        spy={true}
                        smooth={true}
                        duration={300}>
                        <Icon iconName={section.iconName} />
                        <span>{section.name}</span>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default Navigation;
