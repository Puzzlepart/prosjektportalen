/// <reference types="react" />
import IQuickLinksProps from "./IQuickLinksProps";
import IQuickLinksState from "./IQuickLinksState";
import BaseWebPart from "../@BaseWebPart";
/**
 * Component: QuickLinks
 */
export default class QuickLinks extends BaseWebPart<IQuickLinksProps, IQuickLinksState> {
    static displayName: string;
    static defaultProps: Partial<IQuickLinksProps>;
    /**
     * Constructor
     *
     * @param {IQuickLinksProps} props Props
     */
    constructor(props: IQuickLinksProps);
    componentDidMount(): Promise<void>;
    /**
     * Renders the <QuickLinks /> component
     */
    render(): JSX.Element;
    /**
    * Render items
    *
    * @param {IQuickLinksProps} param0 Props
    * @param {IQuickLinksState} param1 State
    */
    private renderItems;
    private _containerRef;
}
export { IQuickLinksProps, IQuickLinksState, };
