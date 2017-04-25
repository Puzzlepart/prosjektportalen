import * as React from "react";
import StatusElement from "./StatusElement";
import { default as ProjectInfo } from "../../ProjectInfo";

const StatusSection = ({ project }) => {
    return (
        <div id="status-section">
            <div className="ms-Grid-col ms-u-lg12 ms-u-xl5" style={{ padding: 25 }}>
                <ProjectInfo showEditLink={false} filterField="GtPcProjectStatus" />
            </div>
            <div className="ms-Grid-col ms-u-lg12 ms-u-xl7 status-elements-container">
                <div className="status-elements">
                    <StatusElement
                        name="Overordnet status"
                        iconName="BarChart4"
                        scrollTo="status-section"
                        statusValue=""
                        comment={project.GtOverallStatus} />
                    <StatusElement
                        name="Fremdrift"
                        iconName="DateTime"
                        scrollTo="fremdrift-section"
                        statusValue={project.GtStatusTime}
                        comment={project.GtStatusTimeComment}
                        fieldName="GtStatusTime" />
                    <StatusElement
                        name="Økonomi"
                        iconName="Money"
                        scrollTo="budget-section"
                        statusValue={project.GtStatusBudget}
                        comment={project.GtStatusBudgetComment}
                        fieldName="GtStatusBudget" />
                    <StatusElement
                        name="Kvalitet"
                        iconName="Product"
                        scrollTo="kvalitet-section"
                        statusValue={project.GtStatusQuality}
                        comment={project.GtStatusQualityComment}
                        fieldName="GtStatusQuality" />
                    <StatusElement
                        name="Risiko"
                        iconName="Warning"
                        scrollTo="risiko-section"
                        statusValue={project.GtStatusRisk}
                        comment={project.GtStatusRiskComment}
                        fieldName="GtStatusRisk" />
                    <StatusElement
                        name="Gevinstoppnåelse"
                        iconName="Trophy"
                        scrollTo="gevinst-section"
                        statusValue={project.GtStatusGainAchievement}
                        comment={project.GtStatusGainAchievementComment}
                        fieldName="GtStatusGainAchievement" />
                </div>
            </div>
        </div>
    );
};

export default StatusSection;
