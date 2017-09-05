import { Site } from "sp-pnp-js";
import * as React from "react";
import {
    Spinner,
    SpinnerType,
} from "office-ui-fabric-react/lib/Spinner";
import { MessageBar } from "office-ui-fabric-react/lib/MessageBar";
import ChromeTitle from "../@Components/ChromeTitle";
import IQuickLinksProps, { QuickLinksDefaultProps } from "./IQuickLinksProps";
import IQuickLinksState, { QuickLinksInitialState } from "./IQuickLinksState";
import BaseWebPart from "../@BaseWebPart";

export default class QuickLinks extends BaseWebPart<IQuickLinksProps, IQuickLinksState> {
    public static defaultProps = QuickLinksDefaultProps;

    /**
     * Constructor
     *
     * @param {IQuickLinksProps} props Props
     */
    constructor(props: IQuickLinksProps) {
        super(props);
        this.state = QuickLinksInitialState;
    }

    /**
     * Component did mount
     */
    public componentDidMount(): void {
        new Site(_spPageContextInfo.siteAbsoluteUrl)
            .rootWeb
            .lists
            .getByTitle(__("Lists_QuickLinks_Title"))
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
                {this.renderChrome(this.props, this.state)}
                {this.renderItems(this.props, this.state)}
            </div>
        );
    }

    /**
    * Render chrome
    */
    private renderChrome = ({ containerId }: IQuickLinksProps, { }: IQuickLinksState) => {
        return (
            <ChromeTitle
                title={__("WebPart_Links_Title")}
                toggleElement={{
                    selector: `#${containerId}`,
                    animationDelay: 100,
                    animation: "slideToggle",
                    storage: {
                        key: "QuickLinks",
                        type: "localStorage",
                    },
                }}
            />
        );
    }

    /**
     * Render items
     */
    private renderItems = ({ containerId, listClassName }: IQuickLinksProps, { isLoading, links }: IQuickLinksState) => {
        if (isLoading) {
            return (
                <Spinner type={SpinnerType.large} />
            );
        } else if (links.length > 0) {
            return (
                <div id={containerId}>
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
                <div id={containerId}>
                    <MessageBar>{__("WebPart_EmptyMessage")}</MessageBar>
                </div>
            );
        }
    }
}
