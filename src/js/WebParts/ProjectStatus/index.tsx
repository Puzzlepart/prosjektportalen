import * as React from "react";
import { sp } from "sp-pnp-js";
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

    /**
     * Component did mount
     */
    public async componentDidMount(): Promise<void> {
        const data = await this.fetchData();
        this.setState({
            data,
            isLoading: false,
        });
    }

    /**
     * Calls _render with props and state to allow for ES6 destruction
     */
    public render(): JSX.Element {
        return this._render(this.props, this.state);
    }

    /**
     * Renders the component
     *
     * @param {IProjectStatusProps} param0 Props
     * @param {IProjectStatusState} param1 State
     */
    public _render({ }: IProjectStatusProps, { isLoading, data }: IProjectStatusState): JSX.Element {
        if (isLoading) {
            return (
                <Spinner type={SpinnerType.large} />
            );
        } else {
            return (
                <div className="ms-Grid">
                    <StickyContainer className="status-report-container">
                        <Sticky>
                            {
                                ({ isSticky, wasSticky, style, distanceFromTop, distanceFromBottom, calculatedHeight }) => {
                                    return (
                                        <div
                                            id="status-navigation"
                                            className="navigation ms-Grid-row"
                                            style={{
                                                ...style,
                                                height: 100,
                                            }}>
                                            <Navigation
                                                project={data.project}
                                                sections={data.sections.filter(s => s.showInNavbar)}
                                                exportType={data.exportType} />
                                        </div>
                                    );
                                }
                            }
                        </Sticky>
                        <SummarySection
                            project={data.project}
                            sections={data.sections.filter(s => s.showInStatusSection)} />
                        {this.renderSections(this.props, this.state)}
                    </StickyContainer>
                </div>
            );
        }
    }

    /**
     * Render sections
     *
     * @param {IProjectStatusProps} param0 Props
     * @param {IProjectStatusState} param1 State
     */
    private renderSections({ }: IProjectStatusProps, { data }: IProjectStatusState) {
        console.log(data);
        return (
            data.sections
                .filter(s => s.showAsSection)
                .map((s, key) => (
                    <Section
                        key={key}
                        index={key}
                        section={s}
                        project={data.project}
                        fields={data.fields} />
                ))
        );
    }

    /**
     * Fetches required data
     */
    private async fetchData(): Promise<ProjectStatusData> {
        const sitePagesLib = sp.web.lists.getById(_spPageContextInfo.pageListId);
        const configList = sp.site.rootWeb.lists.getByTitle(this.props.sectionConfig.listTitle);
        const [project, fields, sections, exportType, statusFieldsConfig] = await Promise.all([
            sitePagesLib.items.getById(this.props.welcomePageId).fieldValuesAsHTML.get(),
            sitePagesLib.fields.get(),
            configList.items.orderBy(this.props.sectionConfig.orderBy).get(),
            GetSetting("PROJECTSTATUS_EXPORT_TYPE", true),
            loadJsonConfiguration<IStatusFieldsConfig>("status-fields"),
        ]);
        return {
            project,
            fields,
            sections: sections.map(s => new SectionModel(s, project, statusFieldsConfig)).filter(s => s.isValid()),
            exportType,
        };
    }
}

export {
    IProjectStatusProps,
    IProjectStatusState,
};
