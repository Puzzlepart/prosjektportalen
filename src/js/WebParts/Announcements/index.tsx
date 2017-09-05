import { Site } from "sp-pnp-js";
import * as React from "react";
import {
    Spinner,
    SpinnerType,
} from "office-ui-fabric-react/lib/Spinner";
import { Modal } from "office-ui-fabric-react/lib/Modal";
import { MessageBar } from "office-ui-fabric-react/lib/MessageBar";
import * as Util from "../../Util";
import ChromeTitle from "../@Components/ChromeTitle";
import IAnnouncementsProps, { AnnouncementsDefaultProps } from "./IAnnouncementsProps";
import IAnnouncementsState, { AnnouncementsInitialState } from "./IAnnouncementsState";
import BaseWebPart from "../@BaseWebPart";

/**
 * Announcements
 */
export default class Announcements extends BaseWebPart<IAnnouncementsProps, IAnnouncementsState> {
    public static defaultProps = AnnouncementsDefaultProps;

    /**
     * Constructor
     *
     * @param {IAnnouncementsProps} props Props
     */
    constructor(props: IAnnouncementsProps) {
        super(props);
        this.state = AnnouncementsInitialState;
    }

    /**
     * Component did mount
     */
    public componentDidMount() {
        const {
            itemsCount,
            itemsFilter,
            itemsOrderBy,
        } = this.props;

        new Site(_spPageContextInfo.siteAbsoluteUrl)
            .rootWeb
            .lists
            .getByTitle(__("Lists_Announcements_Title"))
            .items
            .filter(itemsFilter)
            .top(itemsCount)
            .orderBy(itemsOrderBy.orderBy, itemsOrderBy.ascending)
            .get().then(entries => {
                this.setState({ entries: entries, isLoading: false });
            });
    }

    /**
     * Renders the component
     */
    public render(): JSX.Element {
        return (
            <div>
                {this.renderChrome()}
                {this.renderItems(this.state)}
                {this.renderModal(this.props, this.state)}
            </div>
        );
    }

    /**
    * Render chrome
    */
    private renderChrome = () => {
        return (
            <ChromeTitle
                title={__("WebPart_Announcements_Title")}
                toggleElement={{
                    selector: `#${this.props.containerId}`,
                    animationDelay: 100,
                    animation: "slideToggle",
                    storage: {
                        key: "Announcements",
                        type: "localStorage",
                    },
                }}
            />
        );
    }

    /**
     * Render items
     */
    private renderItems = ({ isLoading, entries }: IAnnouncementsState) => {
        if (isLoading) {
            return (
                <Spinner type={SpinnerType.large} />
            );
        } else if (entries.length > 0) {
            return (
                <div id={this.props.containerId}>
                    <ul className={this.props.listClassName}>
                        {entries.map((entry, idx) => <li key={idx}>
                            <h5>
                                <a
                                    style={{ cursor: "pointer" }}
                                    onClick={e => this.setState({ showAnnouncement: entry })}>{entry.Title}</a>
                            </h5>
                            <span className="ms-metadata">{__("String_Published")} {Util.dateFormat(entry.Created)}</span>
                        </li>)}
                    </ul>
                </div>
            );
        } else {
            return (
                <div id={this.props.containerId}>
                    <MessageBar>{__("WebPart_EmptyMessage")}</MessageBar>
                </div>
            );
        }
    }

    /**
     * Render modal
     */
    private renderModal = ({ modalContainerClassName, modalHeaderClassName, modalBodyClassName }: IAnnouncementsProps, { showAnnouncement }: IAnnouncementsState) => {
        if (showAnnouncement) {
            return (
                <Modal
                    isOpen={showAnnouncement}
                    isDarkOverlay={true}
                    onDismiss={e => this.setState({ showAnnouncement: null })}
                    containerClassName={modalContainerClassName}
                    isBlocking={false}
                >
                    <div style={{ padding: 50 }}>
                        <div className={modalHeaderClassName}>
                            <span>{showAnnouncement.Title}</span>
                        </div>
                        <div className="ms-font-xs" style={{ marginTop: 20 }}>
                            Publisert {Util.dateFormat(showAnnouncement.Created)}
                        </div>
                        <div className={modalBodyClassName} dangerouslySetInnerHTML={{ __html: showAnnouncement.Body }}></div>
                    </div>
                </Modal>
            );
        }
        return null;
    }
}
