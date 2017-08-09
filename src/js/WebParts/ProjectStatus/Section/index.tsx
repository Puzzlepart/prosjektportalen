import * as React from "react";
import { Element } from "react-scroll";
import RiskMatrix from "../RiskMatrix";
import SectionList from "./SectionList";
import SectionHeader from "./SectionHeader";
import ISectionProps from "./ISectionProps";

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

        const props = {
            name,
            iconName,
            statusValue: project[fieldName],
            comment: project[`${fieldName}Comment`],
            source,
            fieldName
        }

        return (
            <SectionHeader { ...props } />
        )
    }

    /**
     * Render inner
     */
    private renderInner({ project, section }: ISectionProps) {
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
            </div>
        );
    }

    /**
     * Render type specific contents
     */
};

