import * as React from "react";
import ProjectProperty, { ProjectPropertyModel } from "../../../ProjectInfo/ProjectProperty";
import IEconomySectionProps from "./IEconomySectionProps";

/**
 * Fields to show in the Economy Section
 */
const FIELDS_TO_SHOW: ProjectPropertyModel[] = [
    { internalName: "GtProjectFinanceName", displayName: __("SiteFields_GtProjectFinanceName_DisplayName") },
    { internalName: "GtBudgetTotal", displayName: __("SiteFields_GtBudgetTotal_DisplayName") },
    { internalName: "GtCostsTotal", displayName: __("SiteFields_GtCostsTotal_DisplayName") },
    { internalName: "GtProjectForecast", displayName: __("SiteFields_GtProjectForecast_DisplayName") },
    { internalName: "GtBudgetLastReportDate", displayName: __("SiteFields_GtBudgetLastReportDate_DisplayName") },
];

/**
 * Economy Section
 */
const EconomySection = ({ project }: IEconomySectionProps) => {
    let reportDate = project.GtBudgetLastReportDate;
    if (reportDate) {
        return (
            <div className="economy-status">
                <div className="ms-Grid-col ms-sm12 economy-elements-container">
                    <div className="status-elements">
                        {FIELDS_TO_SHOW.map(({ internalName, displayName }, idx) => (
                            <ProjectProperty
                                key={idx}
                                model={{ internalName: internalName, displayName: displayName, value: project[internalName] }}
                                labelSize="m"
                                valueSize="l" />
                        ))}
                    </div>
                </div>
            </div>
        );
    } else {
        return null;
    }
};

export default EconomySection;
