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

export default class ProjectStatus extends React.Component<IProjectStatusProps, IProjectStatusState> {
    /**
     * Constructor
     */
    constructor(props: IProjectStatusProps) {
        super(props);
        this.state = {
            project: null,
            sections: [],
            isLoading: true,
        };
    }

    /**
     * Component did mount
     */
    public componentDidMount(): void {
        this.fetchData().then(({ project, sections }) => {
            this.setState({
                project,
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
    private renderSections({ }: IProjectStatusProps, { sections, project }: IProjectStatusState) {
        return (
            sections.map((s, key) => (
                <Section
                    key={key}
                    index={key}
                    section={s}
                    project={project} />
            ))
        );
    }

    /**
     * Fetches required and sets the state
     */
    private fetchData = () => new Promise<any>((resolve, reject) => {
        Promise.all([
            sp.web.lists.getById(_spPageContextInfo.pageListId).items.getById(3).fieldValuesAsHTML.get(),
            sp.site.rootWeb.lists.getByTitle("StatusSections").items.get(),
        ])
            .then(([project, sections]) => resolve({ project, sections }))
            .catch(reject);
    })
}
