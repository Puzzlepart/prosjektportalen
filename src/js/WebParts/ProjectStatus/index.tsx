import * as React from "react";
import { sp } from "sp-pnp-js";
import { Element } from "react-scroll";
import { Spinner, SpinnerType } from "office-ui-fabric-react/lib/Spinner";
import { StickyContainer } from "react-sticky";
import { default as ProductsList } from "./ProductsList";
import { default as RiskOverview } from "./RiskOverview";
import { default as StatusSection } from "./StatusSection";
import { default as StatusNavigation } from "./StatusNavigation";
import { default as EconomySection } from "./EconomySection";
import SectionHeader from "./SectionHeader";
import DataSource from "../DataSource";
import { default as BenefitsOverview } from "../BenefitsOverview";

export interface IProjectStatusState {
    project: any;
    isLoading: boolean;
}

export default class ProjectStatus extends React.Component<any, IProjectStatusState> {
    constructor() {
        super();
        this.state = {
            project: null,
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
                        <div id="status-navigation" className="navigation ms-Grid-row">
                            <StatusNavigation project={project}/>
                        </div>
                        <Element name="status-section" className="status-section section ms-Grid-row">
                            <StatusSection project={project} />
                        </Element>
                        <Element name="fremdrift-section" className="fremdrift-section section ms-Grid-row">
                            <SectionHeader
                                name={__("StatusPage_Heading_ProjectTime")}
                                iconName="DateTime"
                                statusValue={project.GtStatusTime}
                                comment={project.GtStatusTimeComment}
                                source={`${_spPageContextInfo.webAbsoluteUrl}/Lists/Prosjektleveranser`}
                                fieldName="GtStatusTime" />
                            <ProductsList viewName="Prosjektstatus" />
                        </Element>
                        <Element name="budget-section" className="budget-section section ms-Grid-row">
                            <SectionHeader
                                name={__("StatusPage_Heading_ProjectBudget")}
                                iconName="Money"
                                statusValue={project.GtStatusBudget}
                                comment={project.GtStatusBudgetComment}
                                source={`${_spPageContextInfo.webAbsoluteUrl}/SitePages/Forms/EditForm.aspx?ID=3`}
                                fieldName="GtStatusBudget" />
                            <EconomySection project={project} />
                        </Element>
                        <Element name="kvalitet-section" className="kvalitet-section section ms-Grid-row">
                            <SectionHeader
                                name={__("StatusPage_Heading_ProjectQuality")}
                                iconName="Product"
                                statusValue={project.GtStatusQuality}
                                comment={project.GtStatusQualityComment}
                                fieldName="GtStatusQuality" />
                        </Element>
                        <Element name="risiko-section" className="risiko-section section ms-Grid-row">
                            <SectionHeader
                                name={__("StatusPage_Heading_ProjectRisk")}
                                iconName="Warning"
                                statusValue={project.GtStatusRisk}
                                comment={project.GtStatusRiskComment}
                                source={`${_spPageContextInfo.webAbsoluteUrl}/Lists/Usikkerhet`}
                                fieldName="GtStatusRisk" />
                            <RiskOverview viewName="Prosjektstatus" />
                        </Element>
                        <Element name="gevinst-section" className="gevinst-section section ms-Grid-row">
                            <SectionHeader
                                name={__("StatusPage_Heading_ProjectBenefitAchievement")}
                                iconName="Trophy"
                                statusValue={project.GtStatusGainAchievement}
                                comment={project.GtStatusGainAchievementComment}
                                source={`${_spPageContextInfo.webAbsoluteUrl}/Lists/Gevinstanalyse og gevinstrealiseringsplan`}
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
        ]).then(([project]) => {
            this.setState({
                project: project,
                isLoading: false,
            });
        });
    }
}
