import * as React from "react";
import { Link } from "react-scroll";
import { Icon } from "../../../../@Components";
import { GetStatusCssClass } from "../../../Utils";
import IStatusElementProps from "./IStatusElementProps";

/**
 * Status element
 */
const StatusElement = ({ section, scrollTo }: IStatusElementProps) => {
    let statusCssClass = section.fieldName ? GetStatusCssClass(section.fieldName, section.statusValue) : "";
    return (
        <Link
            className="status-element ms-Grid-row"
            to={scrollTo}
            offset={-100}
            smooth={true}
            duration={300}>
            <div className="status-icons ms-Grid-col ms-sm12 ms-md2 ms-lg2">
                <Icon name={section.iconName} className={statusCssClass} />
            </div>
            <div className="status-details ms-Grid-col ms-sm12 ms-md10 ms-lg8">
                <h3>{section.name}</h3>
                <h2>{section.fieldName !== "GtOverallStatus" ? section.statusValue : ""}</h2>
                <p>{section.fieldName !== "GtOverallStatus" ? section.statusComment : section.statusValue}</p>
            </div>
        </Link>
    );
};

export default StatusElement;
