import * as React from "react";
import { Icon } from "office-ui-fabric-react/lib/Icon";
import IStatusElementProps from "./IStatusElementProps";

/**
 * Status element
 */
const StatusElement = ({ section, scrollTo }: IStatusElementProps) => {
    function statusContents() {
        return {__html: (section.fieldName !== "GtOverallStatus" ? section.statusComment : section.statusValue)};
    }
    return (
        <div className="status-element ms-Grid-row">
            <div className="status-icons ms-Grid-col ms-sm12 ms-md2 ms-lg2">
                <Icon iconName={section.iconName} className={section.statusProperties.statusClassName} />
            </div>
            <div className="status-details ms-Grid-col ms-sm12 ms-md10 ms-lg8">
                <h3>{section.name}</h3>
                <h2>{section.fieldName !== "GtOverallStatus" ? section.statusValue : ""}</h2>
                <p dangerouslySetInnerHTML={statusContents()} />
            </div>
        </div>
    );
};

export default StatusElement;
