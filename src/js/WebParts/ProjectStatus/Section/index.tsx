import * as React from "react";
import { Spinner } from "office-ui-fabric-react/lib/Spinner";
import { Element } from "react-scroll";
import ProjectProperty from "../../ProjectInfo/ProjectProperty";
import RiskMatrix from "./RiskMatrix";
import SectionList from "./SectionList";
import SectionHeader from "./SectionHeader";
import ISectionProps from "./ISectionProps";
import ISectionState from "./ISectionState";
import { SectionType } from "./SectionModel";

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
        const {
            name,
            iconName,
            source,
            fieldName,
        } = section;

        const sectionHeaderProps = {
            name,
            iconName,
            statusValue: project[fieldName],
            comment: project[`${fieldName}Comment`],
            source,
            fieldName,
        };

        return (
            <SectionHeader { ...sectionHeaderProps } />
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
                    <div>
                        <SectionList listData={listData} />
                    </div>
                )}
                {section.getType() === SectionType.EconomySection && (
                    <div
                        className="ms-Grid"
                        style={{ marginTop: 20 }}>
                        <div className="ms-Grid-row">
                            {section.viewFields.map((vf, key) => {
                                let [field] = fields.filter(f => f.InternalName === vf);
                                if (!field) {
                                    return null;
                                }
                                return (
                                    <div
                                        key={key}
                                        className="ms-Grid-col ms-sm2">
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
            </div>
        );
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
    private fetchListData = ({ section }: ISectionProps) => new Promise<any>((resolve, reject) => {
        const ctx = SP.ClientContext.get_current();
        const list = ctx.get_web().get_lists().getByTitle(section.listTitle);
        const camlQuery = new SP.CamlQuery();
        if (section.viewQuery) {
            camlQuery.set_viewXml(`<View><Query>${section.viewQuery}</Query></View>`);
        } else {
            camlQuery.set_viewXml(`<View></View>`);
        }
        const _items = list.getItems(camlQuery);
        const _fields = list.get_fields();
        ctx.load(_items, "Include(FieldValuesAsHtml)");
        ctx.load(_fields);
        ctx.executeQueryAsync(() => {
            let items = _items.get_data().map(i => i.get_fieldValuesAsHtml().get_fieldValues());
            let validViewFields = section.viewFields.filter(vf => _fields.get_data().filter(lf => lf.get_internalName() === vf).length > 0);
            let columns = validViewFields.map(vf => {
                const [field] = _fields.get_data().filter(lf => lf.get_internalName() === vf);
                return {
                    key: field.get_internalName(),
                    fieldName: field.get_internalName(),
                    name: field.get_title(),
                    minWidth: 100,
                    isResizable: true,
                };
            });
            resolve({ items, columns });
        }, reject);
    })
}

