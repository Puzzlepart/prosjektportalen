import * as React from "react";
import * as truncateHtml from "truncate-html";
import IProjectPropertyProps, { ProjectPropertyDefaultProps } from "./IProjectPropertyProps";
import IProjectPropertyState from "./IProjectPropertyState";
import ProjectPropertyModel from "./ProjectPropertyModel";

export default class ProjectProperty extends React.Component<IProjectPropertyProps, IProjectPropertyState> {
    public static defaultProps = ProjectPropertyDefaultProps;
    private shouldTruncate = false;

    constructor(props: IProjectPropertyProps) {
        super(props);
        this.state = {
            truncate: true,
        };
    }

    public render(): JSX.Element {
        return this._render(this.props, this.state);
    }

    private _render({ model, style, labelSize, valueSize, truncateLength }: IProjectPropertyProps, { truncate }: IProjectPropertyState): JSX.Element {
        let value = model.value;
        let labelClassName = ["_label", "ms-fontWeight-semibold"];
        let valueClassName = ["_value"];
        if (labelSize) {
            labelClassName.push(`ms-font-${labelSize}`);
        }
        if (valueSize) {
            valueClassName.push(`ms-font-${valueSize}`);
        }

        /**
         * Truncates Note and Text if truncateLength is specifed in properties
         */
        this.shouldTruncate = truncateLength && truncate && Array.contains(["Note", "Text"], model.type);
        if (this.shouldTruncate) {
            value = truncateHtml(model.value, truncateLength, {
                ellipsis: "...",
            });
        }

        return (
            <div
                className={`${model.internalName} prop`}
                data-type={model.type}
                data-required={model.required}
                title={model.description}
                style={style}>
                <div className={labelClassName.join(" ")}>{model.displayName}</div>
                <div
                    className={valueClassName.join(" ")}
                    dangerouslySetInnerHTML={{ __html: value }}></div>
                <div hidden={!this.shouldTruncate}>
                    <a
                        href="#"
                        onClick={e => this.setState({
                            truncate: false,
                        })}>Vis mer</a>
                </div>
            </div>
        );
    }
}

export { ProjectPropertyModel, IProjectPropertyProps };
