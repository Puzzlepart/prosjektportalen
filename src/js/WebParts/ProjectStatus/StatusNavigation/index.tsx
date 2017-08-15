import * as React from "react";
import { Link } from "react-scroll";
import { Icon } from "../../@Components";
import { default as ExportReport } from "../ExportReport";
import Nodes from "./Nodes";

const StatusNavigation = project => {
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
            <div className="nav-links ms-Grid-row">
                {Nodes.map(({ title, to, offset, iconName }, idx) => (
                    <Link
                        key={idx}
                        className="nav-link ms-Grid-col ms-xl2 ms-lg12 ms-md12 ms-sm12"
                        activeClass="active"
                        to={to}
                        offset={offset}
                        spy={true}
                        smooth={true}
                        duration={300}>
                        <Icon name={iconName} />
                        <span>{title}</span>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default StatusNavigation;
