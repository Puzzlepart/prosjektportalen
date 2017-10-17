import { Site } from "sp-pnp-js";
import * as React from "react";
import RESOURCE_MANAGER from "localization";
import {
    Spinner,
    SpinnerType,
} from "office-ui-fabric-react/lib/Spinner";
import { MessageBar } from "office-ui-fabric-react/lib/MessageBar";
import IQuickLinksProps, { QuickLinksDefaultProps } from "./IQuickLinksProps";
import IQuickLinksState from "./IQuickLinksState";
import BaseWebPart from "../@BaseWebPart";

export default class QuickLinks extends BaseWebPart<IQuickLinksProps, IQuickLinksState> {
    public static displayName = "QuickLinks";
    public static defaultProps = QuickLinksDefaultProps;

    /**
     * Constructor
     *
     * @param {IQuickLinksProps} props Props
     */
    constructor(props: IQuickLinksProps) {
        super(props, { isLoading: true });
    }

    /**
     * Component did mount
     */
    public componentDidMount(): void {
        new Site(_spPageContextInfo.siteAbsoluteUrl)
            .rootWeb
            .lists
            .getByTitle(RESOURCE_MANAGER.getResource("Lists_QuickLinks_Title"))
            .items
            .top(this.props.itemsCount)
            .select("URL", "Comments")
            .get().then(links => this.setState({ links: links, isLoading: false }));
    }

    /**
     * Renders the component
     */
    public render(): JSX.Element {
        return (
            <div>
                {this.__renderChrome(RESOURCE_MANAGER.getResource("WebPart_Links_Title"), this.state.elementToToggle, QuickLinks.displayName)}
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
            return (
                <Spinner type={SpinnerType.large} />
            );
        } else if (links.length > 0) {
            return (
                <div ref={elementToToggle => this.setState({ elementToToggle })}>
                    <ul className={listClassName}>
                        {links.map(({ URL: { Url, Description }, Comments }, idx) => (
                            <li key={idx}>
                                <h5><a href={Url}>{Description}</a></h5>
                                <span className="ms-metadata">{Comments}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            );
        } else {
            return (
                <div ref={elementToToggle => this.setState({ elementToToggle })}>
                    <MessageBar>{RESOURCE_MANAGER.getResource("WebPart_EmptyMessage")}</MessageBar>
                </div>
            );
        }
    }
}

export {
    IQuickLinksProps,
    IQuickLinksState,
};
