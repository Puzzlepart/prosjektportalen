import * as React from "react";
export interface IMatrixCellProps extends React.HTMLProps<HTMLElement> {
    containerClassName?: string;
}
export default class MatrixCell extends React.Component<IMatrixCellProps, {}> {
    static defaultProps: {
        containerClassName: string;
    };
    render(): React.ReactElement<IMatrixCellProps>;
}
