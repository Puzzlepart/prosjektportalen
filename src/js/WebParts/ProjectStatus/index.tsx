import * as React from "react";
import { sp } from "sp-pnp-js";
import { Element } from "react-scroll";
import { Spinner, SpinnerType } from "office-ui-fabric-react/lib/Spinner";
import { StickyContainer, Sticky } from "react-sticky";
import ProductsList from "./ProductsList";
import RiskOverview from "./RiskOverview";
import StatusSection from "./StatusSection";
import StatusNavigation from "./StatusNavigation";
import EconomySection from "./EconomySection";
import SectionHeader from "./SectionHeader";
import DataSource from "../DataSource";
import BenefitsOverview from "../BenefitsOverview";
import IProjectStatusState from "./IProjectStatusState";
import IProjectStatusProps from "./IProjectStatusProps";
import { Section } from "./Section";

export default class ProjectStatus extends React.Component<IProjectStatusProps, IProjectStatusState> {
    constructor() {
        super();
        this.state = {
            project: null,
            sections: [],
            isLoading: true,
        };
    }

    public componentDidMount(): void {
        this.fetchData();
    }

    public render(): JSX.Element {
        let { isLoading, project } = this.state;
        if (isLoading) {
            return <Spinner type={SpinnerType.large} />;
        } else {
            return (
                <div className="ms-Grid">
                    <style id="project-style-placeholder"></style>
                    <StickyContainer className="status-report-container">
                        <Sticky>
                            {
                                ({ isSticky, wasSticky, style, distanceFromTop, distanceFromBottom, calculatedHeight }) => {
                                    return (
                                        <div
                                            id="status-navigation"
                                            className="navigation ms-Grid-row"
                                            style={{ ...style, height: 100 }}>
                                            <StatusNavigation project={project} />
                                        </div>
                                    );
                                }
                            }
                        </Sticky>
                        <Element name="status-section" className="status-section section ms-Grid-row">
                            <StatusSection project={project} />
                        </Element>
                        <Element name="fremdrift-section" className="fremdrift-section section ms-Grid-row">
                            <SectionHeader
                                name={__("ProjectStatus_Heading_ProjectTime")}
                                iconName="DateTime"
                                statusValue={project.GtStatusTime}
                                comment={project.GtStatusTimeComment}
                                source={`${_spPageContextInfo.webAbsoluteUrl}/${__("Lists_ProjectProducts_Url")}`}
                                fieldName="GtStatusTime" />
                            <ProductsList viewName={__("View_ProjectStatus_DisplayName")} />
                        </Element>
                        <Element name="budget-section" className="budget-section section ms-Grid-row">
                            <SectionHeader
                                name={__("ProjectStatus_Heading_ProjectBudget")}
                                iconName="Money"
                                statusValue={project.GtStatusBudget}
                                comment={project.GtStatusBudgetComment}
                                fieldName="GtStatusBudget" />
                            <EconomySection project={project} />
                        </Element>
                        <Element name="kvalitet-section" className="kvalitet-section section ms-Grid-row">
                            <SectionHeader
                                name={__("ProjectStatus_Heading_ProjectQuality")}
                                iconName="Product"
                                statusValue={project.GtStatusQuality}
                                comment={project.GtStatusQualityComment}
                                fieldName="GtStatusQuality" />
                        </Element>
                        <Element name="risiko-section" className="risiko-section section ms-Grid-row">
                            <SectionHeader
                                name={__("ProjectStatus_Heading_ProjectRisk")}
                                iconName="Warning"
                                statusValue={project.GtStatusRisk}
                                comment={project.GtStatusRiskComment}
                                source={`${_spPageContextInfo.webAbsoluteUrl}/${__("Lists_Uncertainties_Url")}`}
                                fieldName="GtStatusRisk" />
                            <RiskOverview viewName={__("View_ProjectStatus_DisplayName")} />
                        </Element>
                        <Element name="gevinst-section" className="gevinst-section section ms-Grid-row">
                            <SectionHeader
                                name={__("ProjectStatus_Heading_ProjectBenefitAchievement")}
                                iconName="Trophy"
                                statusValue={project.GtStatusGainAchievement}
                                comment={project.GtStatusGainAchievementComment}
                                source={`${_spPageContextInfo.webAbsoluteUrl}/${__("Lists_BenefitsAnalysis_Url")}`}
                                fieldName="GtStatusGainAchievement" />
                            <BenefitsOverview
                                dataSource={DataSource.List}
                                showSearchBox={false}
                                showCommandBar={false}
                            />
                        </Element>
                        <Element style={{ minHeight: 600 }} />
                    </StickyContainer >
                </div >
            );
        }
    }
 
    /**
     * Fetches required and sets the state
     */
    private fetchData(): void {
        Promise.all([
            sp.web.lists.getById(_spPageContextInfo.pageListId).items.getById(3).fieldValuesAsHTML.get(),
            sp.site.rootWeb.lists.getByTitle("StatusSections").items.get(),
        ]).then(([project, sections]) => {
            this.setState({
                project,
                sections: sections.map(s => new Section(s.Title, s.StatusSectionsIcon)),
                isLoading: false,
            });
        });
    }
}
