import * as React from "react";
import { Element } from "react-scroll";
import SectionList from "./SectionList";
import SectionHeader from "./SectionHeader";
import ISectionProps from "./ISectionProps";

const Section = ({ index, section, project }: ISectionProps) => {
    let statusValue = project[section.FieldName];
    let comment = project[`${section.FieldName}Comment`];

    return (
        <Element
            name={`section-${index}`}
            className="section ms-Grid-row">
            <SectionHeader
                name={section.Title}
                iconName={section.Icon}
                statusValue={statusValue}
                comment={comment}
                source=""
                fieldName={section.FieldName} />
            {section.List && (
                <SectionList 
                    listTitle={section.List}
                    viewQuery={section.ViewQuery}
                    viewFields={section.ViewFields} />
            )}
        </Element>
    );
};

export default Section;
