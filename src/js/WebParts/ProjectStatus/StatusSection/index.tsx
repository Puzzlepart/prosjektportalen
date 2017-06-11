import * as React from "react";
import StatusElement from "./StatusElement";
import { default as ProjectInfo } from "../../ProjectInfo";

const StatusSection = ({ project }) => {
    return (
        <div id="status-section">
            <div className="ms-Grid-col ms-lg12 ms-xl4 status-project-data status-elements-container">
                <div className="status-elements">
                    <StatusElement
                        name={__("StatusPage_Heading_OverallStatus")}
                        iconName="BarChart4"
                        scrollTo="status-section"
                        statusValue=""
                        comment={project.GtOverallStatus}
                        fieldName="GtOverallStatus" />
                    <div className="status-element ms-Grid-row">
                        <div className="status-icons ms-Grid-col ms-sm12 ms-md2 ms-lg2">
                            <i className="ms-Icon ms-Icon--CustomList no-status"></i>
                        </div>
                        <div className="status-details ms-Grid-col ms-sm12 ms-md10 ms-lg8">
                            <h2>{__("StatusPage_Heading_ProjectMetadata")}</h2><h1></h1>
                            <ProjectInfo
                                hideChrome={true}
                                showActionLinks={false}
                                showMissingPropsWarning={false}
                                filterField="GtPcProjectStatus"
                                labelSize="m"
                                valueSize="s" />
                        </div>
                    </div>
                </div>
            </div>
            <div className="ms-Grid-col ms-lg12 ms-xl4 status-elements-container">
                <div className="status-elements">
                    <StatusElement
                        name={__("StatusPage_Heading_ProjectTime")}
                        iconName="DateTime"
                        scrollTo="fremdrift-section"
                        statusValue={project.GtStatusTime}
                        comment={project.GtStatusTimeComment}
                        fieldName="GtStatusTime" />
                    <StatusElement
                        name={__("StatusPage_Heading_ProjectBudget")}
                        iconName="Money"
                        scrollTo="budget-section"
                        statusValue={project.GtStatusBudget}
                        comment={project.GtStatusBudgetComment}
                        fieldName="GtStatusBudget" />
                    <StatusElement
                        name={__("StatusPage_Heading_ProjectQuality")}
                        iconName="Product"
                        scrollTo="kvalitet-section"
                        statusValue={project.GtStatusQuality}
                        comment={project.GtStatusQualityComment}
                        fieldName="GtStatusQuality" />
                </div>
            </div>
            <div className="ms-Grid-col ms-lg12 ms-xl4 status-elements-container">
                <div className="status-elements">
                    <StatusElement
                        name={__("StatusPage_Heading_ProjectRisk")}
                        iconName="Warning"
                        scrollTo="risiko-section"
                        statusValue={project.GtStatusRisk}
                        comment={project.GtStatusRiskComment}
                        fieldName="GtStatusRisk" />
                    <StatusElement
                        name={__("StatusPage_Heading_ProjectGainAchievement")}
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
