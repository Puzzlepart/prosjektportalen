import * as React from "react";
import RESOURCE_MANAGER from "localization";
import { Site } from "sp-pnp-js";
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
import IProjectListProps, { ProjectListDefaultProps } from "./IProjectListProps";
import IProjectListState, { IProjectListData } from "./IProjectListState";
import BaseWebPart from "../@BaseWebPart";

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
    public componentDidMount(): void {
        this.fetchData()
            .then(data => this.setState({
                data,
                isLoading: false,
            }))
            .catch(_ => this.setState({ isLoading: false }));
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
     * @param {IProjectListProps} param0 Props
     * @param {IProjectListState} param1 State
     */
    public _render({ }: IProjectListProps, { isLoading }: IProjectListState): JSX.Element {
        if (isLoading) {
            return <Spinner type={SpinnerType.large} />;
        }

        return (
            <div style={{ paddingRight: 40 }}>
                <SearchBox
                    labelText={RESOURCE_MANAGER.getResource("DynamicPortfolio_SearchBox_Placeholder")}
                    onChanged={st => this.setState({ searchTerm: st.toLowerCase() })} />
                {this.renderCards(this.props, this.state)}
                {this.renderProjectInfoModal(this.props, this.state)}
                <Style props={this.props} />
            </div>
        );
    }

    /**
     * Render cards
     *
     * @param {IProjectListProps} param0 Props
     * @param {IProjectListState} param1 State
     */
    private renderCards = ({ masonryOptions, tileClassName, tileWidth, tileImageHeight }: IProjectListProps, { }: IProjectListState): JSX.Element => {
        const {
            projects,
            fields,
        } = this.getFilteredData(this.props, this.state);

        if (projects.length === 0) {
            return (
                <MessageBar>{RESOURCE_MANAGER.getResource("ProjectList_NoResults")}</MessageBar>
            );
        }

        return (
            <Masonry
                elementType={"div"}
                options={masonryOptions}
                disableImagesLoaded={false}
                updateOnEachImageLoad={false}>
                {projects
                    .map((project, idx) => (
                        <ProjectCard
                            key={idx}
                            project={project}
                            fields={fields}
                            className={tileClassName}
                            tileWidth={tileWidth}
                            tileImageHeight={tileImageHeight}
                            onClickHref={project.Url}
                            showProjectInfo={e => this.setState({ showProjectInfo: project })} />
                    ))}
            </Masonry>
        );
    }

    /**
     * Renders the Project Info modal
     *
     * @param {IProjectListProps} param0 Props
     * @param {IProjectListState} param1 State
     */
    private renderProjectInfoModal = ({ projectInfoFilterField, modalHeaderClassName }: IProjectListProps, { showProjectInfo }: IProjectListState): JSX.Element => {
        if (showProjectInfo) {
            return (
                <ProjectInfo
                    webUrl={showProjectInfo.Url}
                    hideChrome={true}
                    showActionLinks={false}
                    showMissingPropsWarning={false}
                    filterField={projectInfoFilterField}
                    labelSize="l"
                    valueSize="m"
                    renderMode={ProjectInfoRenderMode.Modal}
                    modalOptions={{
                        isOpen: showProjectInfo !== null,
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
     * Get filtered data based on groupBy and searchTerm. Search is case-insensitive.
     *
     * @param {IProjectListProps} param0 Props
     * @param {IProjectListState} param1 State
     */
    private getFilteredData = ({ }: IProjectListProps, { searchTerm, data }: IProjectListState): IProjectListData => {
        return {
            ...data,
            projects: data.projects
                .filter(project => Object.keys(project).filter(key => project[key].indexOf(searchTerm) !== -1).length > 0)
                .sort((a, b) => a.Title > b.Title ? 1 : -1),
        };
    }

    /**
     * Fetch data using sp-pnp-js search
     */
    private fetchData = () => new Promise<IProjectListData>((resolve, reject) => {
        const rootWeb = new Site(_spPageContextInfo.siteAbsoluteUrl).rootWeb;

        const ctFieldsPromise = rootWeb
            .contentTypes
            .getById(RESOURCE_MANAGER.getResource("ContentTypes_Prosjektforside_ContentTypeId"))
            .fields
            .select("Title", "Description", "InternalName", "Required", "TypeAsString")
            .get();

        const projectsPromise = Search.query();

        Promise.all([projectsPromise, ctFieldsPromise])
            .then(([projectsSearchResult, fieldsArray]) => {
                const projects = projectsSearchResult.primarySearchResults.map(result => new Project(result));
                let fields: { [key: string]: string } = {};
                fieldsArray.forEach(({ InternalName, Title }) => {
                    fields[InternalName] = Title;
                });
                resolve({ projects, fields });
            });
    })
}
