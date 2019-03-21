import * as React from "react";
export interface IMatrixRowProps extends React.HTMLProps<HTMLDivElement> {
}
export default class MatrixRow extends React.Component<IMatrixRowProps, {}> {
    static defaultProps: {
        className: string;
    };
    render(): React.ReactElement<IMatrixRowProps>;
}
