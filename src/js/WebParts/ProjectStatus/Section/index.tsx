import * as React from "react";
import { IColumn } from "office-ui-fabric-react/lib/DetailsList";
import { Spinner } from "office-ui-fabric-react/lib/Spinner";
import { Element } from "react-scroll";
import ProjectProperty from "../../ProjectInfo/ProjectProperty";
import RiskMatrix from "./RiskMatrix";
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
        this.state = {
            isLoading: this.shouldFechData(props),
        };
    }

    /**
    * Component did mount
    */
    public componentDidMount(): void {
        if (this.shouldFechData(this.props)) {
            this.fetchListData(this.props).then(listData => {
                this.setState({
                    listData,
                    isLoading: false,
                });
            });
        }
    }

    /**
     * Renders the component
     */
    public render() {
        if (this.state.isLoading) {
            return <Spinner />;
        }
        return (
            <Element
                name={`section-${this.props.index}`}
                className="section ms-Grid-row">
                {this.renderHeader(this.props, this.state)}
                {this.renderInner(this.props, this.state)}
            </Element>
        );
    }

    /**
     * Render header
     */
    private renderHeader({ project, section }: ISectionProps, { }: ISectionState) {
        return (
            <SectionHeader section={section} />
        );
    }

    /**
     * Render inner
     */
    private renderInner({ project, fields, section }: ISectionProps, { listData }: ISectionState) {
        return (
            <div>
                {section.showRiskMatrix && (
                    <RiskMatrix listData={listData} />
                )}
                {section.listTitle && (
                    <SectionList listData={listData} />
                )}
                {section.getType() === SectionType.ProjectPropertiesSection && (
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
                                            }}
                                            labelSize="m"
                                            valueSize="l" />
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}
                {section.customComponent && (
                    this.renderCustomComponent(this.props, this.state)
                )}
            </div>
        );
    }

    /**
     * Renders custom component
     *
     * @param param0 Props
     * @param param1 State
     */
    private renderCustomComponent({ section }: ISectionProps, { }: ISectionState): JSX.Element {
        let customWpComp = GetWebPartComponentByName(section.customComponent);
        if (customWpComp) {
            return customWpComp.component;
        }
        return null;
    }

    /**
     * Should the component fetch data (if listTitle is specified)
     */
    private shouldFechData = ({ section }: ISectionProps): boolean => {
        return (section.listTitle != null);
    }

    /**
    * Fetches required data
    */
    private fetchListData = ({ section }: ISectionProps) => new Promise<ISectionListData>((resolve, reject) => {
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
    })

    /**
     * Create column from sp field
     *
     * @param field The field
     */
    private createColumnFromSpField(field: SP.Field): IColumn {
        const baseProps = {
            key: field.get_internalName(),
            fieldName: field.get_internalName(),
            name: field.get_title(),
        };

        let col: IColumn = {
            ...baseProps,
            minWidth: 80,
            isResizable: true,
        };

        switch (field.get_typeAsString().toLowerCase()) {
            case "number": case "calculated": case "counter": {
                col.maxWidth = 80;
            }
                break;
            case "text": case "note": {
                col.maxWidth = 300;
            }
                break;
        }

        return col;
    }
}

