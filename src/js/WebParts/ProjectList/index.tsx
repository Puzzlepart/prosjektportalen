import * as React from "react";
import RESOURCE_MANAGER from "../../Resources";
import { Site, Logger, LogLevel } from "sp-pnp-js";
import { Spinner, SpinnerType } from "office-ui-fabric-react/lib/Spinner";
import { SearchBox } from "office-ui-fabric-react/lib/SearchBox";
import { MessageBar } from "office-ui-fabric-react/lib/MessageBar";
import ProjectInfo, { ProjectInfoRenderMode } from "../ProjectInfo";
import * as ProjectListSearch from "./ProjectListSearch";
import InjectedStyles from "./InjectedStyles";
import ProjectCard from "./ProjectCard";
import ProjectListModel from "./ProjectListModel";
import IProjectListProps, { ProjectListDefaultProps } from "./IProjectListProps";
import IProjectListState, { IProjectListData } from "./IProjectListState";
import BaseWebPart from "../@BaseWebPart";
import { cleanString } from "../../Util";

const LOG_TEMPLATE = "(ProjectList) {0}: {1}";

/**
 * Project information
 */
export default class ProjectList extends BaseWebPart<IProjectListProps, IProjectListState> {
    public static displayName = "ProjectList";
    public static defaultProps = ProjectListDefaultProps;
    private _searchTimeout;

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
        this._onSearch = this._onSearch.bind(this);
        Logger.log({
            message: String.format(LOG_TEMPLATE, "constructor", "Initializing the <ProjectList /> component"),
            level: LogLevel.Info,
        });
    }

    public async componentDidMount() {
        Logger.log({
            message: String.format(LOG_TEMPLATE, "componentDidMount", "<ProjectList /> mounted"),
            level: LogLevel.Info,
        });
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
        Logger.log({
            message: String.format(LOG_TEMPLATE, "render", "Rendering the <ProjectList /> component"),
            level: LogLevel.Info,
        });

        if (this.state.isLoading) {
            return <Spinner label={this.props.loadingText} type={SpinnerType.large} />;
        }

        return (
            <div className="ms-Grid" style={{ paddingRight: 40 }}>
                <div className="ms-Grid-row" style={{ marginBottom: 10 }}>
                    <div className="ms-Grid-col ms-sm12">
                        <SearchBox
                            placeholder={this.props.searchBoxLabelText}
                            onChanged={this._onSearch} />
                    </div>
                </div>
                <div className="ms-Grid-row" style={{ marginBottom: 10 }}>
                    <div className="ms-Grid-col ms-sm12">
                        {this.renderCards()}
                    </div>
                </div>
                <InjectedStyles props={this.props} />
                {this.renderProjectInfoModal()}
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

        Logger.log({
            message: String.format(LOG_TEMPLATE, "renderCards", `Rendering ${projects.length} <ProjectCard />`),
            level: LogLevel.Info,
        });

        return (
            <div className={`pp-cardContainer`}>
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
            </div>
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

    private _onSearch(searchTerm: string) {
        if (this._searchTimeout) {
            Logger.log({
                message: String.format(LOG_TEMPLATE, "_onSearch", "Clearing timeout"),
                data: { searchTerm },
                level: LogLevel.Info,
            });
            clearTimeout(this._searchTimeout);
        }
        this._searchTimeout = setTimeout(() => {
            Logger.log({
                message: String.format(LOG_TEMPLATE, "_onSearch", "Updating state"),
                data: { searchTerm },
                level: LogLevel.Info,
            });
            this.setState({ searchTerm: searchTerm.toLowerCase() });
        }, this.props.searchTimeoutMs);
    }

    /**
     * Fetch data using sp-pnp-js search
     */
    private async fetchData(): Promise<IProjectListData> {
        Logger.log({
            message: String.format(LOG_TEMPLATE, "fetchData", "Fetching data"),
            level: LogLevel.Info,
        });
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
            let fieldsMap = projectCtFieldsArray.reduce((obj, fld) => {
                obj[fld.InternalName] = fld.Title;
                return obj;
            }, {});
            Logger.log({
                message: String.format(LOG_TEMPLATE, "fetchData", `Retrieved ${projects.length} projects and ${Object.keys(fieldsMap).length} fields`),
                level: LogLevel.Info,
            });
            return {
                projects,
                fields: fieldsMap,
            };
        } catch (err) {
            throw err;
        }
    }
}

export {
    IProjectListProps,
    IProjectListState,
};
