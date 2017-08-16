import * as React from "react";
import { sp } from "sp-pnp-js";
import { Spinner, SpinnerType } from "office-ui-fabric-react/lib/Spinner";
import { StickyContainer, Sticky } from "react-sticky";
import Navigation from "./Navigation";
import Section from "./Section";
import TopSection from "./Section/TopSection";
import ProjectStatusData from "./ProjectStatusData";
import IProjectStatusState from "./IProjectStatusState";
import IProjectStatusProps, { ProjectStatusDefaultProps } from "./IProjectStatusProps";
import SectionModel from "./Section/SectionModel";

/**
 * Project Status
 */
export default class ProjectStatus extends React.Component<IProjectStatusProps, IProjectStatusState> {
    public static defaultProps = ProjectStatusDefaultProps;

    /**
     * Constructor
     */
    constructor(props: IProjectStatusProps) {
        super(props);
        this.state = {
            isLoading: true,
        };
    }

    /**
     * Component did mount
     */
    public componentDidMount(): void {
        this.fetchData().then(data => {
            this.setState({
                data,
                isLoading: false,
            });
        });
    }

    /**
     * Renders the component
     */
    public render(): JSX.Element {
        const {
            isLoading,
            data,
        } = this.state;

        if (isLoading) {
            return <Spinner type={SpinnerType.large} />;
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
                                                sections={data.sections.filter(s => s.showInNavbar)} />
                                        </div>
                                    );
                                }
                            }
                        </Sticky>
                        <TopSection
                            project={data.project}
                            sections={data.sections} />
                        {this.renderSections(this.props, this.state)}
                    </StickyContainer >
                </div >
            );
        }
    }

    /**
     * Render sections
     *
     * @param param0 Props
     * @param param1 State
     */
    private renderSections({ }: IProjectStatusProps, { data }: IProjectStatusState) {
        return (
            data.sections.map((s, key) => (
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
    private fetchData = () => new Promise<ProjectStatusData>((resolve, reject) => {
        const sitePagesLib = sp.web.lists.getById(_spPageContextInfo.pageListId);
        const configList = sp.site.rootWeb.lists.getByTitle(this.props.sectionConfig.listTitle);
        Promise.all([
            sitePagesLib.items.getById(3).fieldValuesAsHTML.get(),
            sitePagesLib.fields.get(),
            configList.items.orderBy(this.props.sectionConfig.orderBy).get(),
        ])
            .then(([project, fields, sections]) => resolve({
                project,
                fields,
                sections: sections.map(s => new SectionModel(s, project)).filter(s => s.isValid()),
            }))
            .catch(reject);
    })
}
