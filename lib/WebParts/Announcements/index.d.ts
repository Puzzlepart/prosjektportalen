/// <reference types="react" />
import IAnnouncementsProps from "./IAnnouncementsProps";
import IAnnouncementsState from "./IAnnouncementsState";
import BaseWebPart from "../@BaseWebPart";
/**
 * Announcements
 */
export default class Announcements extends BaseWebPart<IAnnouncementsProps, IAnnouncementsState> {
    static displayName: string;
    static defaultProps: IAnnouncementsProps;
    /**
     * Constructor
     *
     * @param {IAnnouncementsProps} props Props
     */
    constructor(props: IAnnouncementsProps);
    /**
     * Component did mount
     */
    componentDidMount(): void;
    /**
     * Renders the component
     */
    render(): JSX.Element;
    /**
     * Render items
     *
     * @param {IAnnouncementsProps} param0 Props
     * @param {IAnnouncementsState} param1 State
     */
    private renderItems;
    /**
     * Render modal
     *
     * @param {IAnnouncementsProps} param0 Props
     * @param {IAnnouncementsState} param1 State
    */
    private renderModal;
}
export { IAnnouncementsProps, IAnnouncementsState, };
