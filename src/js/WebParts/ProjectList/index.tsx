import * as React from "react";
import Masonry from "react-masonry-component";
import {
    Spinner,
    SpinnerType,
    SearchBox,
} from "office-ui-fabric-react";
import ProjectInfo, { ProjectInfoRenderMode } from "../ProjectInfo";
import * as Search from "./Search";
import Style from "./Style";
import ProjectCard from "./ProjectCard";
import Project from "./Project";
import IProjectListProps from "./IProjectListProps";
import IProjectListState from "./IProjectListState";

/**
 * Project information
 */
export default class ProjectList extends React.PureComponent<IProjectListProps, IProjectListState> {
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
     */
    constructor() {
        super();
        this.state = {
            isLoading: true,
            searchTerm: "",
        };
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
        const {
            isLoading,
            projects,
            searchTerm,
        } = this.state;

        if (isLoading) {
            return <Spinner type={SpinnerType.large} />;
        }

        return (
            <div style={{ paddingRight: 40 }}>
                <SearchBox
                    labelText={__("DynamicPortfolio_SearchBox_Placeholder")}
                    onChanged={st => this.setState({ searchTerm: st })} />
                <Masonry
                    elementType={"div"}
                    options={this.props.masonryOptions}
                    disableImagesLoaded={false}
                    updateOnEachImageLoad={false}>
                    {projects
                        .filter(project => Object.keys(project).filter(key => project[key].indexOf(searchTerm) !== -1).length > 0)
                        .sort((a, b) => a.Title > b.Title ? 1 : -1)
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
                {this.renderProjectInfoModal()}
                <Style props={this.props} />
            </div>
        );
    }

    /**
   * Renders the Project Info modal
   */
    private renderProjectInfoModal = () => {
        const {
            modalHeaderClassName,
            projectInfoFilterField,
        } = this.props;


        const { showProjectInfo } = this.state;

        if (showProjectInfo) {
            return (
                <ProjectInfo
                    webUrl={showProjectInfo.Path}
                    hideChrome={true}
                    showEditLink={false}
                    showMissingPropsWarning={false}
                    filterField={projectInfoFilterField}
                    labelSize="l"
                    valueSize="m"
                    renderMode={ProjectInfoRenderMode.Modal}
                    modalOptions={{
                        isOpen: this.state.showProjectInfo,
                        isDarkOverlay: true,
                        isBlocking: false,
                        onDismiss: e => this.setState({ showProjectInfo: null }),
                        headerClassName: modalHeaderClassName,
                        headerStyle: { marginBottom: 20 },
                        title: showProjectInfo.Title,
                    }}
                />
            );
        }
        return null;
    }

    /**
     * Fetch data using sp-pnp-js search
     */
    private fetchData = () => new Promise<Partial<IProjectListState>>((resolve, reject) => {
        Search.query()
            .then(({ primarySearchResults }) => resolve({ projects: primarySearchResults.map(result => new Project(result)) }))
            .catch(reject);
    })
};
