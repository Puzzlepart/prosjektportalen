import * as React from "react";
import TruncateMarkup from "react-truncate-markup";
import IProjectPropertyProps from "./IProjectPropertyProps";
import IProjectPropertyState from "./IProjectPropertyState";
import ProjectPropertyModel from "./ProjectPropertyModel";

/**
 * Project Property
 */
export default class ProjectProperty extends React.Component<IProjectPropertyProps, IProjectPropertyState> {
    public static displayName = "ProjectProperty";
    private shouldTruncate = false;

    /**
     * Constructor
     *
     * @param {IProjectPropertyProps} props Props
     */
    constructor(props: IProjectPropertyProps) {
        super(props);
        this.state = { truncate: true };
    }

    /**
     * Calls _render with props and state to allow for ES6 destruction
     */
    public render(): JSX.Element {
        return this._render(this.props, this.state);
    }

    /**
     * Renders the component
     *
     * @param {IProjectPropertyProps} param0 Props
     * @param {IProjectPropertyState} param1 State
     */
    private _render({ model, labelSize, valueSize, truncateLines: truncateLines }: IProjectPropertyProps, { truncate }: IProjectPropertyState): JSX.Element {
        let labelClassName = ["_label", "ms-fontWeight-semibold"];
        let valueClassName = ["_value"];
        if (labelSize) {
            labelClassName.push(`ms-font-${labelSize}`);
        }
        if (valueSize) {
            valueClassName.push(`ms-font-${valueSize}`);
        }

        this.shouldTruncate = truncateLines && truncate && Array.contains(["Note", "Text"], model.type);
        return (
            <div
                className={`${model.internalName} ${model.type} prop`}
                data-type={model.type}
                data-required={model.required}
                title={model.description}>
                <div className={labelClassName.join(" ")}>{model.displayName}</div>
                <div className={valueClassName.join(" ")} style={{ wordBreak: "break-word" }}>
                    {
                        this.shouldTruncate ?
                        <TruncateMarkup lines={truncateLines}> {model.value} </TruncateMarkup> :
                        <div dangerouslySetInnerHTML={{ __html: model.value }}></div>
                    }
                </div>
                <div hidden={!this.shouldTruncate}>
                    <a href="javascript:void(0);return false;" onClick={e => this.setState({ truncate: false })}>Vis mer</a>
                </div>
            </div>
        );
    }
}

export { ProjectPropertyModel, IProjectPropertyProps };
