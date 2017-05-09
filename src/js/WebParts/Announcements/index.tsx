import { Site } from "sp-pnp-js";
import * as React from "react";
import {
    Spinner,
    SpinnerType,
} from "office-ui-fabric-react";
import * as Util from "../../Util";

export interface IAnnouncementsProps {
    itemsCount?: number;
}
export interface IAnnouncementsState {
    entries: any[];
    isLoading: boolean;
}

/**
 * Announcements
 */
export default class Announcements extends React.PureComponent<IAnnouncementsProps, IAnnouncementsState> {
    public static defaultProps = {
        itemsCount: 5,
    };

    /**
     * Constructor
     */
    constructor() {
        super();
        this.state = {
            entries: null,
            isLoading: true,
        };
    }

    /**
     * Component did mount
     */
    public componentDidMount() {
        new Site(_spPageContextInfo.siteAbsoluteUrl)
            .rootWeb
            .lists
            .getByTitle(__("Lists_Announcements_Title"))
            .items
            .top(this.props.itemsCount)
            .get().then(entries => {
                this.setState({ entries: entries, isLoading: false });
            });
    }

    /**
     * Renders the component
     */
    public render() {
        let { entries, isLoading } = this.state;
        if (isLoading) {
            return (<Spinner type={SpinnerType.large} />);
        }
        if (entries.length > 0) {
            return (<ul className="pp-simpleList spacing-s">
                {entries.map(({ Title, Created }, idx) => <li key={idx}>
                    <h5><a href="#">{Title}</a></h5>
                    <span className="ms-metadata">{__("String_Published")} {Util.dateFormat(Created)}</span>
                </li>)}
            </ul>);
        } else {
            return (<div className="ms-metadata">{__("WebPart_EmptyMessage")}</div>);
        }
    }

};
