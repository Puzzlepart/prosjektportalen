import * as React from "react";

export interface IMatrixRowProps extends React.HTMLProps<HTMLDivElement> { }

export default class MatrixRow extends React.Component<IMatrixRowProps, {}> {
    public static defaultProps = { className: "risk-matrix-row" };

    public render(): React.ReactElement<IMatrixRowProps> {
        return (
            <tr className={this.props.className}>
                {this.props.children}
            </tr>
        );
    }
}
