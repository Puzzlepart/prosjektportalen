import * as React from "react";
export interface IMatrixHeaderCellProps extends React.HTMLProps<HTMLElement> {
    label: string;
}
export default class MatrixHeaderCell extends React.Component<IMatrixHeaderCellProps, {}> {
    render(): React.ReactElement<IMatrixHeaderCellProps>;
}
