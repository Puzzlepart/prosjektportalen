import * as React from "react";
import StatusElement from "./StatusElement";
import { default as ProjectInfo } from "../../ProjectInfo";

const StatusSection = ({ project }) => {
    return (
        <div id="status-section">
            <div className="ms-Grid-col ms-u-lg12 ms-u-xl4 status-project-data status-elements-container">
                <div className="status-elements">
                    <StatusElement
                        name="Overordnet status"
                        iconName="BarChart4"
                        scrollTo="status-section"
                        statusValue=""
                        comment={project.GtOverallStatus}
                        fieldName="GtOverallStatus" />
                </div>
                <div className="status-element ms-Grid-row">
                    <div className="status-icons ms-Grid-col ms-u-sm12 ms-u-md2 ms-u-lg2">
                        <i className="ms-Icon ms-Icon--CustomList no-status"></i>
                    </div>
                    <div className="status-details ms-Grid-col ms-u-sm12 ms-u-md10 ms-u-lg8">
                        <h2>Prosjektegenskaper</h2><h1></h1>
                        <ProjectInfo
                            hideChrome={true}
                            showEditLink={false}
                            showMissingPropsWarning={false}
                            filterField="GtPcProjectStatus"
                            labelSize="m"
                            valueSize="s" />
                    </div>
                </div>
            </div>
            <div className="ms-Grid-col ms-u-lg12 ms-u-xl4 status-elements-container">
                <div className="status-elements">
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
                </div>
            </div>
            <div className="ms-Grid-col ms-u-lg12 ms-u-xl4 status-elements-container">
                <div className="status-elements">
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
