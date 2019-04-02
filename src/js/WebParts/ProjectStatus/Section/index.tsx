import * as React from "react";
import { IColumn } from "office-ui-fabric-react/lib/DetailsList";
import { Spinner } from "office-ui-fabric-react/lib/Spinner";
import { Element } from "react-scroll";
import ProjectProperty from "../../ProjectInfo/ProjectProperty";
import RiskMatrix from "../../RiskMatrix";
import OpportunityMatrix from "../../OpportunityMatrix";
import SectionList from "./SectionList";
import SectionHeader from "./SectionHeader";
import ISectionListData from "./ISectionListData";
import ISectionProps from "./ISectionProps";
import ISectionState from "./ISectionState";
import { SectionType } from "./SectionModel";
import { GetWebPartComponentByName } from "../../";

export default class Section extends React.PureComponent<ISectionProps, ISectionState> {
    /**
     * Constructor
     */
    constructor(props: ISectionProps) {
        super(props);
        this.state = { isLoading: this.shouldFetchListData(props), listData: null };
    }

    public componentDidMount(): void {
        if (this.shouldFetchListData(this.props)) {
            this.fetchListData(this.props).then(listData => {
                this.setState({ listData, isLoading: false });
            });
        }
    }

    /**
     * Renders the component
     */
    public render(): React.ReactElement<ISectionProps> {
        if (this.state.isLoading) {
            return <Spinner />;
        }
        return (
            <Element
                id={this.props.section.getHtmlElementId()}
                name={`section-${this.props.index}`}
                className="section ms-Grid-row">
                {this.renderHeader(this.props, this.state)}
                {this.renderInner(this.props, this.state)}
            </Element>
        );
    }

    /**
     * Render header
     *
     * @param {ISectionProps} param0 Props
     * @param {ISectionState} param1 State
     */
    private renderHeader({ section }: ISectionProps, { listData }: ISectionState) {
        let fallbackNavigateUrl = listData ? listData.defaultViewUrl : null;
        if (section.sectionType === SectionType.ProjectPropertiesSection && fallbackNavigateUrl === null) {
            fallbackNavigateUrl = `${_spPageContextInfo.webServerRelativeUrl}/Lists/Properties/DispForm.aspx?ID=1&HideRibbon=1`;
        }
        return (
            <SectionHeader
                id={section.getHtmlElementId("header")}
                section={section}
                fallbackNavigateUrl={fallbackNavigateUrl} />
        );
    }

    /**
     * Render inner
     *
     * @param {ISectionProps} param0 Props
     * @param {ISectionState} param1 State
     */
    private renderInner({ project, fields, section }: ISectionProps, { listData }: ISectionState) {
        return (
            <div id={section.getHtmlElementId("inner")}>
                {section.showRiskMatrix && (
                    <div>
                        <RiskMatrix
                            data={{ items: listData.items }}
                            showViewSelector={false}
                            {...this.props.riskMatrix} />
                        <OpportunityMatrix
                            data={{ items: listData.items }}
                            showViewSelector={false} />
                    </div>
                )}
                {section.listTitle && (
                    <SectionList
                        id={section.getHtmlElementId("listview")}
                        listData={listData} />
                )}
                {section.sectionType === SectionType.ProjectPropertiesSection && (
                    <div
                        className="field-section"
                        style={{ marginTop: 20 }}>
                        <div className="field-section-row">
                            {section.viewFields.map((vf, key) => {
                                let [field] = fields.filter(f => f.InternalName === vf);
                                if (!field) {
                                    return null;
                                }
                                return (
                                    <div
                                        key={key}
                                        className="field-keyvalue">
                                        <ProjectProperty
                                            model={{
                                                internalName: vf,
                                                displayName: field.Title,
                                                value: project[vf],
                                                type: field.TypeAsString,
                                            }}
                                            labelSize="m"
                                            valueSize="m" />
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}
                {section.customComponent && this.renderCustomComponent(section.customComponent)}
            </div>
        );
    }

    /**
     * Renders custom component
     *
     * @param {string} customComponentName Custom component name
     */
    private renderCustomComponent(customComponentName: string): JSX.Element {
        let customComponent = GetWebPartComponentByName(customComponentName);
        if (customComponent) {
            return customComponent.getComponent(false, { excelExportEnabled: false, showCommandBar: false, showSearchBox: false });
        }
        return null;
    }

    /**
     * Should the component fetch data (if listTitle is specified)
     *
     * @param {ISectionProps} param0 Props
     */
    private shouldFetchListData = ({ section }: ISectionProps): boolean => {
        return (section.listTitle != null);
    }

    /**
    * Fetches required data
     *
     * @param {ISectionProps} param0 Props
    */
    private fetchListData({ section }: ISectionProps) {
        return new Promise<ISectionListData>((resolve, reject) => {
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
    private createColumnFromSpField(field: SP.Field): IColumn {
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

        let col: IColumn = {
            ...baseProps,
            minWidth: 80,
            isResizable: true,
        };

        if (colTypeMaxWidth[col.data.type]) {
            col.maxWidth = colTypeMaxWidth[col.data.type];
        }

        return col;
    }
}

