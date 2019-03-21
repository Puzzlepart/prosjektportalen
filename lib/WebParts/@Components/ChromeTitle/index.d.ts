import * as React from "react";
import IToggleElement from "./IToggleElement";
import IChromeTitleProps from "./IChromeTitleProps";
import IChromeTitleState from "./IChromeTitleState";
export default class ChromeTitle extends React.PureComponent<IChromeTitleProps, IChromeTitleState> {
    static defaultProps: Partial<IChromeTitleProps>;
    /**
     * Toggle storage key
     */
    private toggleStorageKey;
    /**
     * Constructor
     *
     * @param {IChromeTitleProps} props Props
     */
    constructor(props: IChromeTitleProps);
    /**
     * Component did mount
     */
    componentDidMount(): void;
    /**
     * Renders the component
     */
    render(): React.ReactElement<IChromeTitleProps>;
    /**
     * On chrome click
     */
    private onClick;
    /**
     * Get collapsed state from storage (localStorage or sessionStorage)
     */
    private getCollapsedStateFromStorage;
}
export { IToggleElement, IChromeTitleProps, IChromeTitleState, };
