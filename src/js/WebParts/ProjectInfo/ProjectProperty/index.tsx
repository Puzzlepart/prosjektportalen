import * as React from "react";
import IProjectPropertyProps from "./IProjectPropertyProps";
import ProjectPropertyModel from "./ProjectPropertyModel";
import ProjectPropertyDefaultStyle from "./ProjectPropertyDefaultStyle";

/**
 * Project property
 *
 * @param model Property model
 * @param labelSize Size of label
 * @param valueSize Size of value
 */
const ProjectProperty = ({ model, labelSize, valueSize, style = ProjectPropertyDefaultStyle }: IProjectPropertyProps): JSX.Element => {
    let labelClassName = ["_label", "ms-fontWeight-semibold"];
    let valueClassName = ["_value"];
    if (labelSize) {
        labelClassName.push(`ms-font-${labelSize}`);
    }
    if (valueSize) {
        valueClassName.push(`ms-font-${valueSize}`);
    }
    return (
        <div
            key={model.internalName}
            className={`${model.internalName} prop`}
            data-type={model.type}
            data-required={model.required}
            title={model.description}
            style={style}>
            <div className={labelClassName.join(" ")}>{model.displayName}</div>
            <div
                className={valueClassName.join(" ")}
                dangerouslySetInnerHTML={{ __html: model.value }}></div>
        </div>
    );
};

export default ProjectProperty;
export { ProjectPropertyModel, IProjectPropertyProps };
