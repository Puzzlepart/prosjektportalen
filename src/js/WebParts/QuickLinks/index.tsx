
import __ from "../../Resources";
import { Site } from "sp-pnp-js";
import * as React from "react";
import { Spinner, SpinnerType } from "office-ui-fabric-react/lib/Spinner";
import { MessageBar } from "office-ui-fabric-react/lib/MessageBar";
import { autobind } from "office-ui-fabric-react/lib/Utilities";
import IQuickLinksProps from "./IQuickLinksProps";
import IQuickLinksState from "./IQuickLinksState";
import BaseWebPart from "../@BaseWebPart";

/**
 * Component: QuickLinks
 */
export default class QuickLinks extends BaseWebPart<IQuickLinksProps, IQuickLinksState> {
    public static displayName = "QuickLinks";
    public static defaultProps: Partial<IQuickLinksProps> = {
        itemsCount: 10,
        orderBy: "GtSortOrder",
        orderAsc: true,
        listClassName: "pp-simpleList spacing-m",
    };

    /**
     * Constructor
     *
     * @param {IQuickLinksProps} props Props
     */
    constructor(props: IQuickLinksProps) {
        super(props, { isLoading: true });
    }

    public async componentDidMount() {
        const rootWeb = new Site(_spPageContextInfo.siteAbsoluteUrl).rootWeb;
        const links = await rootWeb
            .lists
            .getByTitle(__.getResource("Lists_QuickLinks_Title"))
            .items
            .orderBy(this.props.orderBy, this.props.orderAsc)
            .top(this.props.itemsCount)
            .select("URL", "Comments")
            .get();
        this.setState({ links: links, isLoading: false });
    }

    /**
     * Renders the <QuickLinks /> component
     */
    public render(): JSX.Element {
        return (
            <div>
                {this._renderChrome(__.getResource("WebPart_Links_Title"), this.state.elementToToggle, QuickLinks.displayName)}
                {this.renderItems(this.props, this.state)}
            </div>
        );
    }

    /**
    * Render items
    *
    * @param {IQuickLinksProps} param0 Props
    * @param {IQuickLinksState} param1 State
    */
    private renderItems = ({ listClassName }: IQuickLinksProps, { isLoading, links }: IQuickLinksState) => {
        if (isLoading) {
            return <Spinner type={SpinnerType.large} />;
        } else if (links.length > 0) {
            return (
                <div ref={this._containerRef}>
                    <ul className={listClassName}>
                        {links.map((lnk, idx) => (
                            <li key={idx}>
                                <h5><a href={lnk.URL.Url}>{lnk.URL.Description}</a></h5>
                                <span className="ms-metadata">{lnk.Comments}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            );
        } else {
            return (
                <div ref={this._containerRef}>
                    <MessageBar>{__.getResource("WebPart_EmptyMessage")}</MessageBar>
                </div>
            );
        }
    }

    @autobind
    private _containerRef(div: HTMLDivElement) {
        this.setState({ elementToToggle: div });
    }
}

export {
    IQuickLinksProps,
    IQuickLinksState,
};
