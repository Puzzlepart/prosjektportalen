import * as React from "react";
import ModalLinkIconPosition from "./ModalLinkIconPosition";
import IModalLinkIconProps from "./IModalLinkIconProps";
import IModalLinkOptions from "./IModalLinkOptions";
import IModalLinkProps from "./IModalLinkProps";
import IModalLinkState from "./IModalLinkState";
/**
 * Modal Link
 */
export default class ModalLink extends React.PureComponent<IModalLinkProps, IModalLinkState> {
    static displayName: string;
    static defaultProps: Partial<IModalLinkProps>;
    /**
     * Constructor
     *
     * @param {IModalLinkProps} props Props
     */
    constructor(props: IModalLinkProps);
    /**
     * Component did mount
     */
    componentDidMount(): Promise<void>;
    /**
     * Renders the <ModalLink /> component
     */
    render(): JSX.Element;
    /**
     * Show Modal Dialog
     *
     * @param {React.MouseEvent<HTMLAnchorElement>} event Event
     */
    private showModalDialog;
}
export { ModalLink, IModalLinkProps, ModalLinkIconPosition, IModalLinkIconProps, IModalLinkOptions, };
