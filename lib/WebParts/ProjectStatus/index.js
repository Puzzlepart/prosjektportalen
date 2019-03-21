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
const react_sticky_1 = require("react-sticky");
const Navigation_1 = require("./Navigation");
const Section_1 = require("./Section");
const SummarySection_1 = require("./Section/SummarySection");
const IProjectStatusProps_1 = require("./IProjectStatusProps");
const SectionModel_1 = require("./Section/SectionModel");
const _BaseWebPart_1 = require("../@BaseWebPart");
const Settings_1 = require("../../Settings");
const Util_1 = require("../../Util");
/**
 * Project Status
 */
class ProjectStatus extends _BaseWebPart_1.default {
    /**
     * Constructor
     *
     * @param {IProjectStatusProps} props Props
     */
    constructor(props) {
        super(props, { isLoading: true });
    }
    componentDidMount() {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield this.fetchData();
            this.setState({ data, isLoading: false });
        });
    }
    render() {
        const { isLoading, data } = this.state;
        if (isLoading) {
            return React.createElement(Spinner_1.Spinner, { type: Spinner_1.SpinnerType.large });
        }
        else {
            return (React.createElement("div", { className: "ms-Grid" },
                React.createElement(react_sticky_1.StickyContainer, { className: "status-report-container" },
                    React.createElement(react_sticky_1.Sticky, null, ({ style }) => (React.createElement("div", { id: "status-navigation", className: "navigation ms-Grid-row", style: Object.assign({}, style, { height: 100 }) },
                        React.createElement(Navigation_1.default, { project: data.project, sections: data.sections.filter(s => s.showInNavbar), exportType: data.exportType })))),
                    React.createElement(SummarySection_1.default, { propertiesLabel: (this.props.propertiesLabel) ? this.props.propertiesLabel : Resources_1.default.getResource("ProjectStatus_Heading_ProjectMetadata"), sections: data.sections.filter(s => s.showInStatusSection) }),
                    this.renderSections())));
        }
    }
    /**
     * Render sections
     */
    renderSections() {
        return (this.state.data.sections
            .filter(s => s.showAsSection)
            .map((s, key) => (React.createElement(Section_1.default, { key: key, index: key, section: s, project: this.state.data.project, fields: this.state.data.fields, riskMatrix: this.props.riskMatrix }))));
    }
    /**
     * Fetches required data
     */
    fetchData() {
        return __awaiter(this, void 0, void 0, function* () {
            const projectPropertiesList = sp_1.sp.web.lists.getByTitle(Resources_1.default.getResource("Lists_ProjectProperties_Title"));
            const configList = sp_1.sp.site.rootWeb.lists.getByTitle(this.props.sectionConfig.listTitle);
            const [project, spFields, spSections, exportType, statusFieldsConfig] = yield Promise.all([
                projectPropertiesList.items.getById(1).fieldValuesAsHTML.usingCaching().get(),
                projectPropertiesList.fields.usingCaching().get(),
                configList.items.orderBy(this.props.sectionConfig.orderBy).usingCaching().get(),
                Settings_1.GetSetting("PROJECTSTATUS_EXPORT_TYPE", true),
                Util_1.loadJsonConfiguration("status-fields"),
            ]);
            const sections = spSections.map(s => new SectionModel_1.default(s, project, statusFieldsConfig)).filter(s => s.isValid());
            return { project, fields: spFields, sections, exportType };
        });
    }
}
ProjectStatus.displayName = "ProjectStatus";
ProjectStatus.defaultProps = IProjectStatusProps_1.ProjectStatusDefaultProps;
exports.default = ProjectStatus;
