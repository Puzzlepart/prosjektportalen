"use strict";
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
const Button_1 = require("office-ui-fabric-react/lib/Button");
const Modal_1 = require("office-ui-fabric-react/lib/Modal");
const MessageBar_1 = require("office-ui-fabric-react/lib/MessageBar");
const ModalLink_1 = require("../@Components/ModalLink");
const ProjectProperty_1 = require("./ProjectProperty");
const ProjectInfoActionLinks_1 = require("./ProjectInfoActionLinks");
const IProjectInfoProps_1 = require("./IProjectInfoProps");
const ProjectInfoRenderMode_1 = require("./ProjectInfoRenderMode");
exports.ProjectInfoRenderMode = ProjectInfoRenderMode_1.default;
const _BaseWebPart_1 = require("../@BaseWebPart");
/**
 * Project information
 */
class ProjectInfo extends _BaseWebPart_1.default {
    /**
     * Constructor
     *
     * @param {IProjectInfoProps} props Props
     */
    constructor(props) {
        super(props, { isLoading: true, hasPropertiesItem: false, properties: [] });
    }
    componentDidMount() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield this.fetchData();
                this.setState(Object.assign({}, data, { hasPropertiesItem: true, isLoading: false }));
            }
            catch (error) {
                this.setState({ isLoading: false, hasPropertiesItem: false, error });
            }
        });
    }
    render() {
        switch (this.props.renderMode) {
            case ProjectInfoRenderMode_1.default.Normal: {
                return (React.createElement("div", { className: this.props.containerClassName },
                    this._renderChrome(this.props.chromeTitle, this.state.elementToToggle, ProjectInfo.displayName, this.props.hideChrome),
                    this.state.isLoading && React.createElement(Spinner_1.Spinner, { type: Spinner_1.SpinnerType.large, label: this.props.loadingText }),
                    this.renderInner()));
            }
            case ProjectInfoRenderMode_1.default.Modal: {
                return (React.createElement(Modal_1.Modal, { isOpen: this.props.modalOptions.isOpen, isDarkOverlay: this.props.modalOptions.isDarkOverlay, onDismiss: this.props.modalOptions.onDismiss, containerClassName: `${this.props.containerClassName} pp-modal`, isBlocking: false },
                    React.createElement("div", { style: { padding: 50 } },
                        React.createElement("div", { className: this.props.modalOptions.headerClassName, style: this.props.modalOptions.headerStyle, hidden: !this.props.modalOptions.title },
                            React.createElement("span", null, this.props.modalOptions.title)),
                        React.createElement("div", { hidden: this.state.isLoading, style: { marginBottom: 20 } },
                            React.createElement(Button_1.DefaultButton, { href: this.props.webUrl, iconProps: { iconName: "Home" }, target: "_blank", text: Resources_1.default.getResource("ProjectInfo_ProjectLinkText"), style: { marginRight: 10 } }),
                            React.createElement(Button_1.DefaultButton, { href: `${this.props.webUrl}/SitePages/ProjectStatus.aspx`, iconProps: { iconName: "BarChart4" }, target: "_blank", text: Resources_1.default.getResource("ProjectInfo_ProjectStatusLinkText") })),
                        this.state.isLoading
                            ? React.createElement(Spinner_1.Spinner, { type: Spinner_1.SpinnerType.large, label: this.props.loadingText })
                            : this.renderInner())));
            }
        }
    }
    /**
     * Render inner
     */
    renderInner() {
        if (this.state.isLoading) {
            return null;
        }
        const propertiesToRender = this.state.properties.filter(p => !p.empty);
        const hasMissingProps = this.state.properties.filter(p => p.required && p.empty).length > 0;
        return (React.createElement("div", { className: this.props.innerClassName, ref: elementToToggle => this.setState({ elementToToggle }) },
            this.renderProperties(propertiesToRender, hasMissingProps),
            this.renderActionLinks()));
    }
    /**
     * Render properties
     */
    renderProperties(propertiesToRender, hasMissingProps) {
        if (hasMissingProps && this.props.showMissingPropsWarning) {
            return React.createElement(MessageBar_1.MessageBar, { messageBarType: MessageBar_1.MessageBarType.error }, Resources_1.default.getResource("ProjectInfo_MissingProperties"));
        }
        if (propertiesToRender.length === 0) {
            return React.createElement(MessageBar_1.MessageBar, { messageBarType: MessageBar_1.MessageBarType.error }, Resources_1.default.getResource("ProjectInfo_MissingProperties"));
        }
        return (React.createElement("div", null, propertiesToRender.map((model, key) => {
            const props = { key, model, labelSize: this.props.labelSize, valueSize: this.props.valueSize };
            return React.createElement(ProjectProperty_1.default, Object.assign({}, props));
        })));
    }
    /**
     * Render action links
     */
    renderActionLinks() {
        return (React.createElement("div", { hidden: !this.props.showActionLinks, className: this.props.actionsClassName }, ProjectInfoActionLinks_1.ProjectInfoActionLinks(this.state).map((props, idx) => (React.createElement(ModalLink_1.ModalLink, Object.assign({ key: idx }, props))))));
    }
    /**
     * Fetch data. Config, fields and project frontpage data.
     *
     * @param {string} configList Configuration list
     */
    fetchData(configList = Resources_1.default.getResource("Lists_ProjectConfig_Title")) {
        return __awaiter(this, void 0, void 0, function* () {
            const rootWeb = new sp_1.Site(this.props.rootSiteUrl).rootWeb;
            const configPromise = rootWeb
                .lists
                .getByTitle(configList)
                .items
                .select("Title", this.props.filterField)
                .usingCaching()
                .get();
            const fieldsPromise = new sp_1.Web(this.props.webUrl)
                .lists
                .getByTitle(Resources_1.default.getResource("Lists_ProjectProperties_Title"))
                .fields
                .select("Title", "Description", "InternalName", "Required", "TypeAsString")
                .usingCaching()
                .get();
            const itemPromise = new sp_1.Web(this.props.webUrl)
                .lists
                .getByTitle(Resources_1.default.getResource("Lists_ProjectProperties_Title"))
                .items
                .getById(1)
                .fieldValuesAsHTML
                .usingCaching()
                .get();
            const listPromise = new sp_1.Web(this.props.webUrl)
                .lists
                .getByTitle(Resources_1.default.getResource("Lists_ProjectProperties_Title"))
                .select("Id")
                .usingCaching()
                .get();
            try {
                const [config, fields, item, propertiesList] = yield Promise.all([configPromise, fieldsPromise, itemPromise, listPromise]);
                let itemFieldNames = Object.keys(item);
                const properties = itemFieldNames
                    .filter(fieldName => {
                    const [field] = fields.filter(({ InternalName }) => InternalName === fieldName);
                    if (!field) {
                        return false;
                    }
                    const [configItem] = config.filter(c => c.Title === field.Title);
                    if (!configItem) {
                        return false;
                    }
                    const shouldBeShown = configItem[this.props.filterField] === true;
                    const valueIsString = typeof item[fieldName] === "string";
                    return (valueIsString && shouldBeShown);
                })
                    .map(fieldName => ({
                    field: fields.filter(({ InternalName }) => InternalName === fieldName)[0],
                    value: item[fieldName],
                }))
                    .map(({ field, value }) => new ProjectProperty_1.ProjectPropertyModel(field, value));
                return { properties, propertiesList };
            }
            catch (error) {
                throw error;
            }
        });
    }
}
ProjectInfo.displayName = "ProjectInfo";
ProjectInfo.defaultProps = IProjectInfoProps_1.ProjectInfoDefaultProps;
exports.default = ProjectInfo;
