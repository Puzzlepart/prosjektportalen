import * as React from "react";
import IProjectPropertyProps, { ProjectPropertyDefaultProps } from "./IProjectPropertyProps";
import ProjectPropertyModel from "./ProjectPropertyModel";

export default class ProjectProperty extends React.Component<IProjectPropertyProps, any> {
    public static defaultProps = ProjectPropertyDefaultProps;

    public render(): JSX.Element {
        return this._render(this.props, this.state);
    }

    private _render({ model, style, labelSize, valueSize }: IProjectPropertyProps, { }: any): JSX.Element {
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
    }
}

export { ProjectPropertyModel, IProjectPropertyProps };
