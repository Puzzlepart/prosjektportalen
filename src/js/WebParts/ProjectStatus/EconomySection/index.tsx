import * as React from "react";
import { ProjectProp } from "../../ProjectInfo/ProjectProp";

const fieldsToShow = [
    { internalName: "GtProjectFinanceName", displayName: __("SiteFields_GtProjectFinanceName_DisplayName") },
    { internalName: "GtBudgetTotal", displayName: __("SiteFields_GtBudgetTotal_DisplayName") },
    { internalName: "GtCostsTotal", displayName: __("SiteFields_GtCostsTotal_DisplayName") },
    { internalName: "GtBudgetLastReportDate", displayName: __("SiteFields_GtBudgetLastReportDate_DisplayName") },
];

export interface IEconomySectionProps {
    project: any;
}

/**
 * Economy Section
 */
const EconomySection = ({ project }: IEconomySectionProps) => {
    return (
        <div className="economy-status">
            <div className="ms-Grid-col ms-u-sm12 economy-elements-container">
                <div className="status-elements">
                    {fieldsToShow.map(({ internalName, displayName }, idx) => (
                        <ProjectProp key={idx} data={{ internalName: internalName, displayName: displayName, value: project[internalName] }} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default EconomySection;
