import * as React from "react";
import Masonry from "react-masonry-component";
import {
    Spinner,
    SpinnerType,
} from "office-ui-fabric-react/lib/Spinner";
import { SearchBox } from "office-ui-fabric-react/lib/SearchBox";
import { MessageBar } from "office-ui-fabric-react/lib/MessageBar";
import ProjectInfo, { ProjectInfoRenderMode } from "../ProjectInfo";
import * as Search from "./Search";
import Style from "./Style";
import ProjectCard from "./ProjectCard";
import Project from "./Project";
import IProjectListProps from "./IProjectListProps";
import IProjectListState from "./IProjectListState";
import BaseWebPart from "../@BaseWebPart";

/**
 * Project information
 */
export default class ProjectList extends BaseWebPart<IProjectListProps, IProjectListState> {
    public static defaultProps: Partial<IProjectListProps> = {
        tileWidth: 206,
        tileImageHeight: 140,
        tileClassName: "pp-projectCard",
        modalHeaderClassName: "ms-font-xxl",
        projectInfoFilterField: "GtPcPortfolioPage",
        masonryOptions: {
            transitionDuration: "slow",
            gutter: 10,
        },
    };

    /**
     * Constructor
     *
     * @param {IProjectListProps} props Props
     */
    constructor(props: IProjectListProps) {
        super(props, {
            isLoading: true,
            searchTerm: "",
        });
    }

    /**
    * Component did mount
    */
    public componentDidMount(): void {
        this.fetchData()
            .then(updatedState => this.setState({
                ...updatedState,
                isLoading: false,
            }))
            .catch(_ => this.setState({ isLoading: false }));
    }

    /**
     * Renders the component
     */
    public render(): JSX.Element {
        if (this.state.isLoading) {
            return <Spinner type={SpinnerType.large} />;
        }

        return (
            <div style={{ paddingRight: 40 }}>
                <SearchBox
                    labelText={__("DynamicPortfolio_SearchBox_Placeholder")}
                    onChanged={st => this.setState({ searchTerm: st.toLowerCase() })} />
                {this.renderCards()}
                {this.renderProjectInfoModal(this.state)}
                <Style props={this.props} />
            </div>
        );
    }

    /**
     * Render cards
     */
    private renderCards = (): JSX.Element => {
        const data = this.getFilteredData(this.state);

        if (data.projects.length === 0) {
            return (
                <MessageBar>{__("ProjectList_NoResults")}</MessageBar>
            );
        }

        return (
            <Masonry
                elementType={"div"}
                options={this.props.masonryOptions}
                disableImagesLoaded={false}
                updateOnEachImageLoad={false}>
                {data.projects
                    .map((project, idx) => (
                        <ProjectCard
                            key={idx}
                            project={project}
                            className={this.props.tileClassName}
                            tileWidth={this.props.tileWidth}
                            tileImageHeight={this.props.tileImageHeight}
                            onClickHref={project.Url}
                            showProjectInfo={e => {
                                this.setState({ showProjectInfo: project });
                            }} />
                    ))}
            </Masonry>
        );
    }

    /**
   * Renders the Project Info modal
   */
    private renderProjectInfoModal = ({ showProjectInfo }: IProjectListState): JSX.Element => {
        if (showProjectInfo) {
            return (
                <ProjectInfo
                    webUrl={showProjectInfo.Url}
                    hideChrome={true}
                    showActionLinks={false}
                    showMissingPropsWarning={false}
                    filterField={this.props.projectInfoFilterField}
                    labelSize="l"
                    valueSize="m"
                    renderMode={ProjectInfoRenderMode.Modal}
                    modalOptions={{
                        isOpen: this.state.showProjectInfo !== null,
                        isDarkOverlay: true,
                        isBlocking: false,
                        onDismiss: e => this.setState({ showProjectInfo: null }),
                        headerClassName: this.props.modalHeaderClassName,
                        headerStyle: { marginBottom: 20 },
                        title: showProjectInfo.Title,
                    }}
                />
            );
        }
        return null;
    }

    /**
   * Get filtered data based on groupBy and searchTerm. Search is case-insensitive.
   */
    private getFilteredData = ({ searchTerm, projects }: IProjectListState) => {
        return {
            projects: projects
                .filter(project => Object.keys(project).filter(key => project[key].indexOf(searchTerm) !== -1).length > 0)
                .sort((a, b) => a.Title > b.Title ? 1 : -1),
        };
    }

    /**
     * Fetch data using sp-pnp-js search
     */
    private fetchData = () => new Promise<Partial<IProjectListState>>((resolve, reject) => {
        Search.query()
            .then(({ primarySearchResults }) => resolve({ projects: primarySearchResults.map(result => new Project(result)) }))
            .catch(reject);
    })
}
