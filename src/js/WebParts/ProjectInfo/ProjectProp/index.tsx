import * as React from "react";

export interface IProjectProp {
    internalName: string;
    displayName: string;
    description?: string;
    value?: string;
    type?: string;
    empty?: boolean;
    required?: any;
}

/**
 * Project property
 *
 * @param data Property data
 * @param labelSize Size of label
 * @param valueSize Size of value
 */
export const ProjectProp = ({ data: { internalName, displayName, description, value, type, required }, labelSize, valueSize }: { data: IProjectProp, labelSize?: string, valueSize?: string }) => {
    let labelClassName = ["_label", "ms-fontWeight-semibold"];
    let valueClassName = ["_value"];
    if (labelSize) {
        labelClassName.push(`ms-font-${labelSize}`);
    }
    if (valueSize) {
        valueClassName.push(`ms-font-${valueSize}`);
    }
    return (<div key={internalName} className={internalName + " prop"} data-type={type} data-required={required} title={description} style={{ margin: "0 0 10px 0" }}>
        <div className={labelClassName.join(" ")}>{displayName}</div>
        <div className={valueClassName.join(" ")} dangerouslySetInnerHTML={{ __html: value }}></div>
    </div>);
};
