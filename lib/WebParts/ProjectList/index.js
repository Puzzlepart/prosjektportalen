"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const Resources_1 = require("../../Resources");
const sp_1 = require("@pnp/sp");
const Spinner_1 = require("office-ui-fabric-react/lib/Spinner");
const SearchBox_1 = require("office-ui-fabric-react/lib/SearchBox");
const MessageBar_1 = require("office-ui-fabric-react/lib/MessageBar");
const Utilities_1 = require("office-ui-fabric-react/lib/Utilities");
const ProjectInfo_1 = require("../ProjectInfo");
const ProjectListSearch_1 = require("./ProjectListSearch");
const InjectedStyles_1 = require("./InjectedStyles");
const ProjectCard_1 = require("./ProjectCard");
const ProjectListModel_1 = require("./ProjectListModel");
const IProjectListProps_1 = require("./IProjectListProps");
const _BaseWebPart_1 = require("../@BaseWebPart");
const Util_1 = require("../../Util");
/**
 * Project information
 */
class ProjectList extends _BaseWebPart_1.default {
    /**
     * Constructor
     *
     * @param {IProjectListProps} props Props
     */
    constructor(props) {
        super(props, { isLoading: true, searchTerm: "" });
    }
    componentDidMount() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield this.fetchData();
                this.setState({
                    data,
                    isLoading: false,
                });
            }
            catch (err) {
                this.setState({ isLoading: false });
            }
        });
    }
    render() {
        if (this.state.isLoading) {
            return React.createElement(Spinner_1.Spinner, { label: this.props.loadingText, type: Spinner_1.SpinnerType.large });
        }
        return (React.createElement("div", { className: "ms-Grid", style: { paddingRight: 40 } },
            React.createElement("div", { className: "ms-Grid-row", style: { marginBottom: 10 } },
                React.createElement("div", { className: "ms-Grid-col ms-sm12" },
                    React.createElement(SearchBox_1.SearchBox, { placeholder: this.props.searchBoxLabelText, onChanged: this._onSearch }))),
            React.createElement("div", { className: "ms-Grid-row", style: { marginBottom: 10 } },
                React.createElement("div", { className: "ms-Grid-col ms-sm12" }, this.renderCards())),
            React.createElement(InjectedStyles_1.default, { props: this.props }),
            this.renderProjectInfoModal()));
    }
    /**
     * Render project cards
     */
    renderCards() {
        const { projects, fields } = this.getFilteredData();
        if (projects.length === 0) {
            return React.createElement(MessageBar_1.MessageBar, null, this.props.emptyMessage);
        }
        return (React.createElement("div", { className: `pp-cardContainer` }, projects.map((project, idx) => (React.createElement(ProjectCard_1.default, { key: idx, project: project, fields: fields, className: this.getClassName(project), tileWidth: this.props.tileWidth, tileImageHeight: this.props.tileImageHeight, onClickHref: project.Url, showProjectInfo: e => this.setState({ showProjectInfo: project }) })))));
    }
    /**
     * Renders the project info modal
     */
    renderProjectInfoModal() {
        if (this.state.showProjectInfo) {
            return (React.createElement(ProjectInfo_1.default, { webUrl: this.state.showProjectInfo.Url, hideChrome: true, showActionLinks: false, showMissingPropsWarning: false, filterField: this.props.projectInfoFilterField, labelSize: "l", valueSize: "m", renderMode: ProjectInfo_1.ProjectInfoRenderMode.Modal, modalOptions: {
                    isOpen: this.state.showProjectInfo !== null,
                    isDarkOverlay: true,
                    isBlocking: false,
                    onDismiss: e => this.setState({ showProjectInfo: null }),
                    headerClassName: this.props.modalHeaderClassName,
                    headerStyle: { marginBottom: 20 },
                    title: this.state.showProjectInfo.Title,
                } }));
        }
        return null;
    }
    /**
     * Get class name for a ProjectListModel. Combines props.tileClassName and props.propertyClassNames.
     *
    * @param {ProjectListModel} project Project list model
    */
    getClassName(project) {
        const classList = [this.props.tileClassName];
        this.props.propertyClassNames.forEach(key => {
            const value = project.RawObject[key];
            if (value) {
                const className = `${Util_1.cleanString(key)}-${Util_1.cleanString(value)}`;
                classList.push(className);
            }
        });
        return classList.join(" ");
    }
    /**
     * Get filtered data based on groupBy and searchTerm. Search is case-insensitive
     */
    getFilteredData() {
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
        return Object.assign({}, data, { projects });
    }
    _onSearch(searchTerm) {
        if (this._searchTimeout) {
            clearTimeout(this._searchTimeout);
        }
        this._searchTimeout = setTimeout(() => {
            this.setState({ searchTerm: searchTerm.toLowerCase() });
        }, this.props.searchTimeoutMs);
    }
    /**
     * Fetch data using @pnp/sp search
     */
    fetchData() {
        return __awaiter(this, void 0, void 0, function* () {
            const rootWeb = new sp_1.Site(_spPageContextInfo.siteAbsoluteUrl).rootWeb;
            try {
                const projectCt = rootWeb
                    .contentTypes
                    .getById(Resources_1.default.getResource("ContentTypes_Prosjektegenskaper_ContentTypeId"));
                const projectCtFieldsPromise = projectCt
                    .fields
                    .select("Title", "Description", "InternalName", "Required", "TypeAsString")
                    .usingCaching()
                    .get();
                const [projectsQueryResult, projectWebsQueryResult, projectCtFieldsArray] = yield Promise.all([
                    ProjectListSearch_1.queryProjects(this.props.dataSourceName, this.props.rowLimit, this.props.propertyClassNames),
                    ProjectListSearch_1.queryProjectWebs(this.props.dataSourceName, this.props.rowLimit),
                    projectCtFieldsPromise,
                ]);
                const projects = projectsQueryResult.map(result => new ProjectListModel_1.default().initFromSearchResponse(result, projectWebsQueryResult.find(web => web.Path.toLowerCase() === result.Path.split("/Lists")[0].toLowerCase())));
                let fieldsMap = projectCtFieldsArray.reduce((obj, fld) => {
                    obj[fld.InternalName] = fld.Title;
                    return obj;
                }, {});
                return { projects, fields: fieldsMap };
            }
            catch (err) {
                throw err;
            }
        });
    }
}
ProjectList.displayName = "ProjectList";
ProjectList.defaultProps = IProjectListProps_1.ProjectListDefaultProps;
__decorate([
    Utilities_1.autobind
], ProjectList.prototype, "_onSearch", null);
exports.default = ProjectList;
