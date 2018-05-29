import * as React from "react";

export interface IMatrixCellProps extends React.HTMLProps<HTMLElement> {
    containerClassName?: string;
}

export default class MatrixCell extends React.Component<IMatrixCellProps, {}> {
    public static defaultProps = { containerClassName: "cell-container" };

    public render(): React.ReactElement<IMatrixCellProps> {
        return (
            <td className={this.props.className} style={this.props.style}>
                <div className={this.props.containerClassName}>
                    {this.props.children}
                </div>
            </td>
        );
    }
}
