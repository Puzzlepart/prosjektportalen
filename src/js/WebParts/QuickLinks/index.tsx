import { Site } from "sp-pnp-js";
import * as React from "react";
import * as uuid_v1 from "uuid/v1";
import {
    Spinner,
    SpinnerType,
} from "office-ui-fabric-react";
import ChromeTitle from "../@Components/ChromeTitle";
import IQuickLinksProps from "./IQuickLinksProps";
import IQuickLinksState from "./IQuickLinksState";


export default class QuickLinks extends React.PureComponent<IQuickLinksProps, IQuickLinksState> {
    public static defaultProps = {
        itemsCount: 5,
        listClassName: "pp-simpleList spacing-m",
        listId: uuid_v1(),
    };

    /**
     * Constructor
     */
    constructor() {
        super();
        this.state = {
            links: null,
            isLoading: true,
        };
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
                {this.renderChrome()}
                {this.renderItems()}
            </div>
        );
    }

    /**
    * Render chrome
    */
    private renderChrome = () => {
        return (
            <ChromeTitle
                title={__("WebPart_Links_Title")}
                toggleElement={{
                    selector: `#${this.props.listId}`,
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
    private renderItems = () => {
        const {
            isLoading,
            links,
         } = this.state;

        if (isLoading) {
            return (<Spinner type={SpinnerType.large} />);
        } else if (links.length > 0) {
            return (
                <ul id={this.props.listId}
                    className={this.props.listClassName}>
                    {links.map(({ URL: { Url, Description }, Comments }, idx) => <li key={idx}>
                        <h5><a href={Url}>{Description}</a></h5>
                        <span className="ms-metadata">{Comments}</span>
                    </li>)}
                </ul>
            );
        } else {
            return (<div className="ms-metadata">{__("WebPart_EmptyMessage")}</div>);
        }
    }
};
