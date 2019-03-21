import * as React from "react";
import IToggleSectionProps from "./IToggleSectionProps";
import IToggleSectionState from "./IToggleSectionState";
export default class ToggleSection extends React.Component<IToggleSectionProps, IToggleSectionState> {
    static defaultProps: {
        headerClassName: string;
    };
    /**
    * Constructor
    *
    * @param {IToggleSectionProps} props Props
    */
    constructor(props: IToggleSectionProps);
    render(): JSX.Element;
    /**
     * On toggle
     */
    private onToggle;
}
