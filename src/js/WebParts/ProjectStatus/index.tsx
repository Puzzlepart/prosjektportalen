import * as React from "react";
import { sp } from "sp-pnp-js";
import { Spinner, SpinnerType } from "office-ui-fabric-react/lib/Spinner";
import { StickyContainer, Sticky } from "react-sticky";
import Navigation from "./Navigation";
import Section from "./Section";
import TopSection from "./Section/TopSection";
import IProjectStatusState from "./IProjectStatusState";
import IProjectStatusProps from "./IProjectStatusProps";
import SectionModel from "./Section/SectionModel";

/**
 * Project Status
 */
export default class ProjectStatus extends React.Component<IProjectStatusProps, IProjectStatusState> {
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
        this.fetchData().then(({ project, fields, sections }) => {
            this.setState({
                project,
                fields,
                sections: sections.map((s, key) => new SectionModel(s)),
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
            project,
            sections,
        } = this.state;

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
                                            style={{
                                                ...style,
                                                height: 100,
                                            }}>
                                            <Navigation
                                                project={project}
                                                sections={sections} />
                                        </div>
                                    );
                                }
                            }
                        </Sticky>
                        <TopSection
                            project={project}
                            sections={sections} />
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
    private renderSections({ }: IProjectStatusProps, { sections, fields, project }: IProjectStatusState) {
        return (
            sections.map((s, key) => (
                <Section
                    key={key}
                    index={key}
                    section={s}
                    project={project}
                    fields={fields} />
            ))
        );
    }

    /**
     * Fetches required data
     */
    private fetchData = () => new Promise<any>((resolve, reject) => {
        Promise.all([
            sp.web.lists.getById(_spPageContextInfo.pageListId).items.getById(3).fieldValuesAsHTML.get(),
            sp.web.lists.getById(_spPageContextInfo.pageListId).fields.get(),
            sp.site.rootWeb.lists.getByTitle("StatusSections").items.orderBy("GtStSecOrder").get(),
        ])
            .then(([project, fields, sections]) => resolve({ project, fields, sections }))
            .catch(reject);
    })
}
