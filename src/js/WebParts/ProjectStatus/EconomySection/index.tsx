import * as React from "react";
import { ProjectProp } from "../../ProjectInfo/ProjectProp";

const fieldsToShow = [
    { internalName: "GtProjectFinanceName", displayName: __("SiteFields_GtProjectFinanceName_DisplayName"), description: "", fieldName: "GtProjectFinanceName", type: "Text", required: false },
    { internalName: "GtBudgetTotal", displayName: __("SiteFields_GtBudgetTotal_DisplayName"), description: "", fieldName: "GtBudgetTotal", type: "Currency", required: false },
    { internalName: "GtCostsTotal", displayName: __("SiteFields_GtCostsTotal_DisplayName"), description: "", fieldName: "GtCostsTotal", type: "Currency", required: false },
    { internalName: "GtBudgetLastReportDate", displayName: __("SiteFields_GtBudgetLastReportDate_DisplayName"), description: "", fieldName: "GtBudgetLastReportDate", type: "DateTime", required: false },
];

export interface IEconomySectionProps {
    project: any;
}

const EconomySection = ({ project }: IEconomySectionProps) => {
    return (
        <div className="economy-status">
            <div className="ms-Grid-col ms-u-sm12 economy-elements-container">
                <div className="status-elements">
                    {fieldsToShow.map(({ internalName, displayName, description, fieldName, type, required }, idx) => (
                        <ProjectProp key={idx} data={{ internalName: internalName, displayName: displayName, description: description, value: project[fieldName], type: type, required: required }} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default EconomySection;
