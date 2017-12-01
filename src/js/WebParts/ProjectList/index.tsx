import * as React from "react";
import RESOURCE_MANAGER from "../../@localization";
import { Site } from "sp-pnp-js";
import Masonry from "react-masonry-component";
import {
    Spinner,
    SpinnerType,
} from "office-ui-fabric-react/lib/Spinner";
import { SearchBox } from "office-ui-fabric-react/lib/SearchBox";
import { MessageBar } from "office-ui-fabric-react/lib/MessageBar";
import ProjectInfo, { ProjectInfoRenderMode } from "../ProjectInfo";
import * as ProjectListSearch from "./ProjectListSearch";
import Style from "./Style";
import ProjectCard from "./ProjectCard";
import ProjectListModel from "./ProjectListModel";
import IProjectListProps, { ProjectListDefaultProps } from "./IProjectListProps";
import IProjectListState, { IProjectListData } from "./IProjectListState";
import BaseWebPart from "../@BaseWebPart";
import { cleanString } from "../../Util";

/**
 * Project information
 */
export default class ProjectList extends BaseWebPart<IProjectListProps, IProjectListState> {
    public static displayName = "ProjectList";
    public static defaultProps = ProjectListDefaultProps;

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
    public async componentDidMount() {
        try {
            const data = await this.fetchData();
            this.setState({
                data,
                isLoading: false,
            });
        } catch (err) {
            this.setState({ isLoading: false });
        }
    }

    public render(): JSX.Element {
        if (this.state.isLoading) {
            return <Spinner label={this.props.loadingText} type={SpinnerType.large} />;
        }

        return (
            <div style={{ paddingRight: 40 }}>
                <div style={{ marginBottom: 10 }}>
                    <SearchBox labelText={this.props.searchBoxLabelText} onChanged={st => this.setState({ searchTerm: st.toLowerCase() })} />
                </div>
                {this.renderCards()}
                {this.renderProjectInfoModal()}
                <Style props={this.props} />
            </div>
        );
    }

    /**
     * Render project cards
     */
    private renderCards(): JSX.Element {
        const { projects, fields } = this.getFilteredData();

        if (projects.length === 0) {
            return <MessageBar>{this.props.emptyMessage}</MessageBar>;
        }

        return (
            <Masonry
                elementType={"div"}
                options={this.props.masonryOptions}
                disableImagesLoaded={false}
                updateOnEachImageLoad={false}>
                {projects.map((project, idx) => (
                    <ProjectCard
                        key={idx}
                        project={project}
                        fields={fields}
                        className={this.getClassName(project)}
                        tileWidth={this.props.tileWidth}
                        tileImageHeight={this.props.tileImageHeight}
                        onClickHref={project.Url}
                        showProjectInfo={e => this.setState({ showProjectInfo: project })} />
                ))}
            </Masonry>
        );
    }

    /**
     * Renders the project info modal
     */
    private renderProjectInfoModal(): JSX.Element {
        if (this.state.showProjectInfo) {
            return (
                <ProjectInfo
                    webUrl={this.state.showProjectInfo.Url}
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
                        title: this.state.showProjectInfo.Title,
                    }}
                />
            );
        }
        return null;
    }

    /**
     * Get class name for a ProjectListModel. Combines props.tileClassName and props.propertyClassNames.
     *
     * @param {ProjectListModel} project Project list model
     */
    private getClassName(project: ProjectListModel) {
        const classList = [this.props.tileClassName];
        this.props.propertyClassNames.forEach(key => {
            const value = project.RawObject[key];
            if (value) {
                const className = `${cleanString(key)}-${cleanString(value)}`;
                classList.push(className);
            }
        });
        return classList.join(" ");
    }

    /**
     * Get filtered data based on groupBy and searchTerm. Search is case-insensitive
     */
    private getFilteredData(): IProjectListData {
        const { data, searchTerm } = this.state;
        const projects = data.projects
            .filter(project => {
                const matches = Object.keys(project).filter(key => {
                    const value = project[key];
                    return value && typeof value === "string" && value.toLowerCase().indexOf(searchTerm) !== -1;
                }).length;
                return matches > 0;
            })
            .sort((a, b) => a.Title > b.Title ? 1 : -1);
        return {
            ...data,
            projects,
        };
    }

    /**
     * Fetch data using sp-pnp-js search
     */
    private async fetchData(): Promise<IProjectListData> {
        const rootWeb = new Site(_spPageContextInfo.siteAbsoluteUrl).rootWeb;
        try {
            const projectCt = rootWeb
                .contentTypes
                .getById(RESOURCE_MANAGER.getResource("ContentTypes_Prosjektforside_ContentTypeId"));
            const projectCtFieldsPromise = projectCt
                .fields
                .select("Title", "Description", "InternalName", "Required", "TypeAsString")
                .usingCaching()
                .get();
            const [projectsQueryResult, projectCtFieldsArray] = await Promise.all([
                ProjectListSearch.queryProjects(this.props.rowLimit, this.props.propertyClassNames),
                projectCtFieldsPromise,
            ]);
            const projects = projectsQueryResult.map(result => new ProjectListModel().initFromSearchResponse(result));
            let fields = projectCtFieldsArray.reduce((accumulator, { InternalName, Title }) => {
                accumulator[InternalName] = Title;
                return accumulator;
            }, {});
            return { projects, fields };
        } catch (err) {
            throw err;
        }
    }
}

export {
    IProjectListProps,
    IProjectListState,
};
