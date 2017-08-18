import * as React from "react";
import { Icon } from "../../../../@Components";
import { GetStatusCssClass } from "../../../Utils";
import IStatusElementProps from "./IStatusElementProps";

/**
 * Status element
 */
const StatusElement = ({ section, scrollTo }: IStatusElementProps) => {
    let statusCssClass = section.fieldName ? GetStatusCssClass(section.fieldName, section.statusValue) : "";
    return (
        <div className="status-element ms-Grid-row">
            <div className="status-icons ms-Grid-col ms-sm12 ms-md2 ms-lg2">
                <Icon name={section.iconName} className={statusCssClass} />
            </div>
            <div className="status-details ms-Grid-col ms-sm12 ms-md10 ms-lg8">
                <h3>{section.name}</h3>
                <h2>{section.fieldName !== "GtOverallStatus" ? section.statusValue : ""}</h2>
                <p>{section.fieldName !== "GtOverallStatus" ? section.statusComment : section.statusValue}</p>
            </div>
        </div>
    );
};

export default StatusElement;
