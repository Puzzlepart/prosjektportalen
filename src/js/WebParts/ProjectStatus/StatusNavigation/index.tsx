import * as React from "react";
import { Link } from "react-scroll";
import { Icon } from "../../@Components";
import { default as ExportReport } from "../ExportReport";

const StatusNavigation = project => {
    const nodes = [{
        title: __("StatusPage_Heading_Status"),
        to: "status-section",
        iconName: "BarChart4",
        offset: 0,
    },
    {
        title: __("StatusPage_Heading_ProjectTime"),
        to: "fremdrift-section",
        iconName: "DateTime",
        offset: 0,
    },
    {
        title: __("StatusPage_Heading_ProjectBudget"),
        to: "budget-section",
        iconName: "Money",
        offset: 0,
    },
    {
        title: __("StatusPage_Heading_ProjectQuality"),
        to: "kvalitet-section",
        iconName: "Product",
        offset: 0,
    },
    {
        title: __("StatusPage_Heading_ProjectRisk"),
        to: "risiko-section",
        iconName: "Warning",
        offset: 0,
    },
    {
        title: __("StatusPage_Heading_ProjectBenefitAchievement"),
        to: "gevinst-section",
        iconName: "Trophy",
        offset: 0,
    }];

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
                {nodes.map(({ title, to, offset, iconName }, idx) => (
                    <Link
                        key={idx}
                        className="nav-link ms-Grid-col ms-md2"
                        activeClass="active"
                        to={to}
                        offset={offset}
                        spy={true}
                        smooth={true}
                        duration={300}>
                        <div className="ms-Grid-row">
                            <div className="ms-Grid-col ms-md4 ms-lg4">
                                <Icon name={iconName} />
                            </div>
                            <p className="ms-hiddenLgDown ms-Grid-col ms-md8 ms-lg8">{title}</p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default StatusNavigation;
