"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const Spinner_1 = require("office-ui-fabric-react/lib/Spinner");
const react_scroll_1 = require("react-scroll");
const ProjectProperty_1 = require("../../ProjectInfo/ProjectProperty");
const RiskMatrix_1 = require("../../RiskMatrix");
const OpportunityMatrix_1 = require("../../OpportunityMatrix");
const SectionList_1 = require("./SectionList");
const SectionHeader_1 = require("./SectionHeader");
const SectionModel_1 = require("./SectionModel");
const __1 = require("../../");
class Section extends React.PureComponent {
    /**
     * Constructor
     */
    constructor(props) {
        super(props);
        /**
         * Should the component fetch data (if listTitle is specified)
         *
         * @param {ISectionProps} param0 Props
         */
        this.shouldFetchListData = ({ section }) => {
            return (section.listTitle != null);
        };
        this.state = { isLoading: this.shouldFetchListData(props), listData: null };
    }
    componentDidMount() {
        if (this.shouldFetchListData(this.props)) {
            this.fetchListData(this.props).then(listData => {
                this.setState({ listData, isLoading: false });
            });
        }
    }
    /**
     * Renders the component
     */
    render() {
        if (this.state.isLoading) {
            return React.createElement(Spinner_1.Spinner, null);
        }
        return (React.createElement(react_scroll_1.Element, { id: this.props.section.getHtmlElementId(), name: `section-${this.props.index}`, className: "section ms-Grid-row" },
            this.renderHeader(this.props, this.state),
            this.renderInner(this.props, this.state)));
    }
    /**
     * Render header
     *
     * @param {ISectionProps} param0 Props
     * @param {ISectionState} param1 State
     */
    renderHeader({ section }, { listData }) {
        let fallbackNavigateUrl = listData ? listData.defaultViewUrl : null;
        if (section.sectionType === SectionModel_1.SectionType.ProjectPropertiesSection && fallbackNavigateUrl === null) {
            fallbackNavigateUrl = `${_spPageContextInfo.webServerRelativeUrl}/Lists/Properties/DispForm.aspx?ID=1&HideRibbon=1`;
        }
        return (React.createElement(SectionHeader_1.default, { id: section.getHtmlElementId("header"), section: section, fallbackNavigateUrl: fallbackNavigateUrl }));
    }
    /**
     * Render inner
     *
     * @param {ISectionProps} param0 Props
     * @param {ISectionState} param1 State
     */
    renderInner({ project, fields, section }, { listData }) {
        return (React.createElement("div", { id: section.getHtmlElementId("inner") },
            section.showRiskMatrix && (React.createElement("div", null,
                React.createElement(RiskMatrix_1.default, Object.assign({ data: { items: listData.items }, showViewSelector: false }, this.props.riskMatrix)),
                React.createElement(OpportunityMatrix_1.default, { data: { items: listData.items }, showViewSelector: false }))),
            section.listTitle && (React.createElement(SectionList_1.default, { id: section.getHtmlElementId("listview"), listData: listData })),
            section.sectionType === SectionModel_1.SectionType.ProjectPropertiesSection && (React.createElement("div", { className: "field-section", style: { marginTop: 20 } },
                React.createElement("div", { className: "field-section-row" }, section.viewFields.map((vf, key) => {
                    let [field] = fields.filter(f => f.InternalName === vf);
                    if (!field) {
                        return null;
                    }
                    return (React.createElement("div", { key: key, className: "field-keyvalue" },
                        React.createElement(ProjectProperty_1.default, { model: {
                                internalName: vf,
                                displayName: field.Title,
                                value: project[vf],
                                type: field.TypeAsString,
                            }, labelSize: "m", valueSize: "m" })));
                })))),
            section.customComponent && this.renderCustomComponent(section.customComponent)));
    }
    /**
     * Renders custom component
     *
     * @param {string} customComponentName Custom component name
     */
    renderCustomComponent(customComponentName) {
        let customComponent = __1.GetWebPartComponentByName(customComponentName);
        if (customComponent) {
            return customComponent.getComponent(false, { excelExportEnabled: false });
        }
        return null;
    }
    /**
    * Fetches required data
     *
     * @param {ISectionProps} param0 Props
    */
    fetchListData({ section }) {
        return new Promise((resolve, reject) => {
            const ctx = SP.ClientContext.get_current();
            const list = ctx.get_web().get_lists().getByTitle(section.listTitle);
            const camlQuery = new SP.CamlQuery();
            let viewXml = ["<View>"];
            if (section.viewQuery) {
                viewXml.push(`<Query>${section.viewQuery}</Query>`);
            }
            if (section.rowLimit) {
                viewXml.push(`<RowLimit>${section.rowLimit}</RowLimit>`);
            }
            viewXml.push("</View>");
            camlQuery.set_viewXml(viewXml.join(""));
            const _items = list.getItems(camlQuery);
            const _fields = list.get_fields();
            ctx.load(list, "DefaultViewUrl");
            ctx.load(list, "DefaultDisplayFormUrl");
            ctx.load(list, "DefaultEditFormUrl");
            ctx.load(list, "DefaultNewFormUrl");
            ctx.load(_items, "Include(FieldValuesAsHtml)");
            ctx.load(_fields);
            ctx.executeQueryAsync(() => {
                let items = _items.get_data().map(i => i.get_fieldValuesAsHtml().get_fieldValues());
                let validViewFields = section.viewFields.filter(vf => _fields.get_data().filter(lf => lf.get_internalName() === vf).length > 0);
                let columns = validViewFields.map(vf => {
                    const [field] = _fields.get_data().filter(lf => lf.get_internalName() === vf);
                    return this.createColumnFromSpField(field);
                });
                resolve({
                    items,
                    columns,
                    defaultViewUrl: list.get_defaultViewUrl(),
                    defaultDisplayFormUrl: list.get_defaultDisplayFormUrl(),
                    defaultEditFormUrl: list.get_defaultEditFormUrl(),
                    defaultNewFormUrl: list.get_defaultNewFormUrl(),
                });
            }, reject);
        });
    }
    /**
     * Create column from sp field
     *
     * @param {SP.Field} field The field
     */
    createColumnFromSpField(field) {
        const colTypeMaxWidth = {
            calculcated: 100,
            choice: 300,
            url: 300,
            counter: 100,
            datetime: 100,
            note: 300,
            number: 100,
            text: 300,
            user: 100,
        };
        const baseProps = {
            key: field.get_internalName(),
            fieldName: field.get_internalName(),
            data: {
                type: field.get_typeAsString().toLowerCase(),
            },
            name: field.get_title(),
        };
        let col = Object.assign({}, baseProps, { minWidth: 80, isResizable: true });
        if (colTypeMaxWidth[col.data.type]) {
            col.maxWidth = colTypeMaxWidth[col.data.type];
        }
        return col;
    }
}
exports.default = Section;
