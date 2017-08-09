import * as React from "react";
import { Element } from "react-scroll";
import ProjectProperty, { ProjectPropertyModel } from "../../ProjectInfo/ProjectProperty";
import RiskMatrix from "../RiskMatrix";
import SectionList from "./SectionList";
import SectionHeader from "./SectionHeader";
import ISectionProps from "./ISectionProps";
import { SectionType } from "./SectionModel";

const FIELDS_TO_SHOW: ProjectPropertyModel[] = [
    { internalName: "GtProjectFinanceName", displayName: __("SiteFields_GtProjectFinanceName_DisplayName") },
    { internalName: "GtBudgetTotal", displayName: __("SiteFields_GtBudgetTotal_DisplayName") },
    { internalName: "GtCostsTotal", displayName: __("SiteFields_GtCostsTotal_DisplayName") },
    { internalName: "GtProjectForecast", displayName: __("SiteFields_GtProjectForecast_DisplayName") },
    { internalName: "GtBudgetLastReportDate", displayName: __("SiteFields_GtBudgetLastReportDate_DisplayName") },
];

export default class Section extends React.PureComponent<ISectionProps, any> {
    /**
     * Constructor
     */
    constructor(props: ISectionProps) {
        super(props);
        this.state = {};
    }

    /**
     * Renders the component
     */
    public render() {
        return (
            <Element
                name={`section-${this.props.index}`}
                className="section ms-Grid-row">
                {this.renderHeader(this.props)}
                {this.renderInner(this.props)}
            </Element>
        );
    }

    /**
     * Render header
     */
    private renderHeader({ project, section }: ISectionProps) {
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
            fieldName
        }

        return (
            <SectionHeader { ...sectionHeaderProps } />
        )
    }

    /**
     * Render inner
     */
    private renderInner({ project, fields, section }: ISectionProps) {
        return (
            <div>
                {section.showRiskMatrix && (
                    <RiskMatrix
                        postAction={false}
                        viewQuery={section.viewQuery} />
                )}
                {section.listTitle && (
                    <div>
                        <SectionList
                            listTitle={section.listTitle}
                            viewQuery={section.viewQuery}
                            viewFields={section.viewFields} />
                    </div>
                )}
                {section.getType() === SectionType.EconomySection && (
                    <div className="ms-Grid">
                        <div className="ms-Grid-row">
                            {section.viewFields.map((vf, key) => {
                                let [field] = fields.filter(f => f.InternalName === vf);
                                console.log(field);
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
};

