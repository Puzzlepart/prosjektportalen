import { Site } from "sp-pnp-js";
import * as React from "react";
import {
    Spinner,
    SpinnerType,
} from "office-ui-fabric-react";

export interface IQuickLinksProps {
    itemsCount?: number;
}

export interface IQuickLinksState {
    links: any[];
    isLoading: boolean;
}

export default class QuickLinks extends React.PureComponent<IQuickLinksProps, IQuickLinksState> {
    public static defaultProps = {
        itemsCount: 5,
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
        let { links, isLoading } = this.state;
        if (isLoading) {
            return (<Spinner type={SpinnerType.large} />);
        }
        if (links.length > 0) {
            return (<ul className="pp-simpleList spacing-m">
                {links.map(({ URL: { Url, Description }, Comments }, idx) => <li key={idx}>
                    <h5><a href={Url}>{Description}</a></h5>
                    <span className="ms-metadata">{Comments}</span>
                </li>)}
            </ul>);
        } else {
            return (<div className="ms-metadata">{__("WebPart_EmptyMessage")}</div>);
        }
    }
};
