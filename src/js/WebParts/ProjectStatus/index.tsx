import * as React from "react";
import { sp } from "@pnp/sp";
import { Spinner, SpinnerType } from "office-ui-fabric-react/lib/Spinner";
import { StickyContainer, Sticky } from "react-sticky";
import Navigation from "./Navigation";
import Section from "./Section";
import SummarySection from "./Section/SummarySection";
import ProjectStatusData from "./ProjectStatusData";
import IProjectStatusState from "./IProjectStatusState";
import IProjectStatusProps, { ProjectStatusDefaultProps } from "./IProjectStatusProps";
import SectionModel from "./Section/SectionModel";
import BaseWebPart from "../@BaseWebPart";
import { GetSetting } from "../../Settings";
import { loadJsonConfiguration } from "../../Util";
import IStatusFieldsConfig from "../../Model/Config/IStatusFieldsConfig";

/**
 * Project Status
 */
export default class ProjectStatus extends BaseWebPart<IProjectStatusProps, IProjectStatusState> {
    public static displayName = "ProjectStatus";
    public static defaultProps = ProjectStatusDefaultProps;

    /**
     * Constructor
     *
     * @param {IProjectStatusProps} props Props
     */
    constructor(props: IProjectStatusProps) {
        super(props, { isLoading: true });
    }

    public async componentDidMount(): Promise<void> {
        const data = await this.fetchData();
        this.setState({ data, isLoading: false });
    }

    public render(): React.ReactElement<IProjectStatusProps> {
        const { isLoading, data } = this.state;
        if (isLoading) {
            return <Spinner type={SpinnerType.large} />;
        } else {
            return (
                <div className="ms-Grid">
                    <StickyContainer className="status-report-container">
                        <Sticky>
                            {({ style }) => (
                                <div
                                    id="status-navigation"
                                    className="navigation ms-Grid-row"
                                    style={{ ...style, height: 100 }}>
                                    <Navigation
                                        project={data.project}
                                        sections={data.sections.filter(s => s.showInNavbar)}
                                        exportType={data.exportType} />
                                </div>
                            )}
                        </Sticky>
                        <SummarySection
                            project={data.project}
                            sections={data.sections.filter(s => s.showInStatusSection)} />
                        {this.renderSections()}
                    </StickyContainer>
                </div>
            );
        }
    }

    /**
     * Render sections
     */
    private renderSections() {
        return (
            this.state.data.sections
                .filter(s => s.showAsSection)
                .map((s, key) => (
                    <Section
                        key={key}
                        index={key}
                        section={s}
                        project={this.state.data.project}
                        fields={this.state.data.fields}
                        riskMatrix={this.props.riskMatrix} />
                )));
    }

    /**
     * Fetches required data
     */
    private async fetchData(): Promise<ProjectStatusData> {
        const sitePagesLib = sp.web.lists.getById(_spPageContextInfo.pageListId);
        const configList = sp.site.rootWeb.lists.getByTitle(this.props.sectionConfig.listTitle);
        const [project, spFields, spSections, exportType, statusFieldsConfig] = await Promise.all([
            sitePagesLib.items.getById(this.props.welcomePageId).fieldValuesAsHTML.usingCaching().get(),
            sitePagesLib.fields.usingCaching().get(),
            configList.items.orderBy(this.props.sectionConfig.orderBy).usingCaching().get(),
            GetSetting("PROJECTSTATUS_EXPORT_TYPE", true),
            loadJsonConfiguration<IStatusFieldsConfig>("status-fields"),
        ]);
        const sections = spSections.map(s => new SectionModel(s, project, statusFieldsConfig)).filter(s => s.isValid());
        return { project, fields: spFields, sections, exportType };
    }
}

export { IProjectStatusProps, IProjectStatusState };
