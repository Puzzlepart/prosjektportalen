import * as React from "react";
import RiskElementModel from "./RiskElementModel";
export interface IRiskElementProps extends React.HTMLProps<HTMLDivElement> {
    model: RiskElementModel;
}
export default class RiskMatrix extends React.Component<IRiskElementProps, {}> {
    static defaultProps: {
        className: string;
    };
    render(): React.ReactElement<IRiskElementProps>;
    protected _getTooltip(): string;
}
