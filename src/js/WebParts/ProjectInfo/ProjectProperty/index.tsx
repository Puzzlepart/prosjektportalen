import * as React from "react";

export class ProjectPropertyModel {
    public internalName: string;
    public displayName: string;
    public value?: string;
    public description?: string;
    public type?: string;
    public empty?: boolean;
    public required?: any;

    constructor(field, value: string) {
        this.internalName = field.InternalName;
        this.displayName = field.Title;
        this.description = field.Description;
        this.value = value;
        this.type = field.TypeAsString;
        this.required = field.Required;
        this.empty = value === "";
    }
}

/**
 * Project property
 *
 * @param data Property data
 * @param labelSize Size of label
 * @param valueSize Size of value
 */
const ProjectProperty = ({ data: { internalName, displayName, description, value, type, required }, labelSize, valueSize }: { data: ProjectPropertyModel, labelSize?: string, valueSize?: string }): JSX.Element => {
    let labelClassName = ["_label", "ms-fontWeight-semibold"];
    let valueClassName = ["_value"];
    if (labelSize) {
        labelClassName.push(`ms-font-${labelSize}`);
    }
    if (valueSize) {
        valueClassName.push(`ms-font-${valueSize}`);
    }
    return (<div
        key={internalName}
        className={`${internalName} prop`}
        data-type={type}
        data-required={required}
        title={description}
        style={{ margin: "0 0 10px 0" }}>
        <div className={labelClassName.join(" ")}>{displayName}</div>
        <div
            className={valueClassName.join(" ")}
            dangerouslySetInnerHTML={{ __html: value }}></div>
    </div>);
};

export default ProjectProperty;

