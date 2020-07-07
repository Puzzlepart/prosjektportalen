import * as React from 'react'

export interface IMatrixHeaderCellProps extends React.HTMLProps<HTMLElement> {
    label: string;
}

export default class MatrixHeaderCell extends React.Component<IMatrixHeaderCellProps, {}> {
    public render(): React.ReactElement<IMatrixHeaderCellProps> {
        return (
            <td className={this.props.className}>
            <span>{this.props.label}</span>
        </td>
        )
    }
}
