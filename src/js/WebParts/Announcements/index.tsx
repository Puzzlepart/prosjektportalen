import { Site } from "sp-pnp-js";
import * as React from "react";
import {
    Spinner,
    SpinnerType,
} from "office-ui-fabric-react";
import { Modal } from "office-ui-fabric-react/lib/Modal";
import * as Util from "../../Util";
import IAnnouncementsProps from "./IAnnouncementsProps";
import IAnnouncementsState from "./IAnnouncementsState";

/**
 * Announcements
 */
export default class Announcements extends React.PureComponent<IAnnouncementsProps, IAnnouncementsState> {
    public static defaultProps: IAnnouncementsProps = {
        itemsCount: 5,
        itemsFilter: `Expires ge datetime'${new Date().toISOString()}'`,
        itemsOrderBy: {
            orderBy: "Created",
            ascending: false,
        },
        listClassName: "pp-simpleList spacing-s",
        modalContainerClassName: "pp-announcementsModalContainer",
        modalHeaderClassName: "ms-font-xxl",
        modalBodyClassName: "ms-font-l",
    };

    /**
     * Constructor
     */
    constructor() {
        super();
        this.state = {
            entries: null,
            isLoading: true,
            showAnnouncement: null,
        };
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
        const {
            entries,
            isLoading,
            showAnnouncement,
        } = this.state;

        const {
            listClassName,
            modalContainerClassName,
            modalHeaderClassName,
            modalBodyClassName,
        } = this.props;

        if (isLoading) {
            return (<Spinner type={SpinnerType.large} />);
        }
        if (entries.length > 0) {
            return (<div>
                <ul className={listClassName}>
                    {entries.map((entry, idx) => <li key={idx}>
                        <h5>
                            <a style={{ cursor: "pointer" }} onClick={e => this.setState({ showAnnouncement: entry })}>{entry.Title}</a>
                        </h5>
                        <span className="ms-metadata">{__("String_Published")} {Util.dateFormat(entry.Created)}</span>
                    </li>)}
                </ul>
                {showAnnouncement && (
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
                )}
            </div>);
        } else {
            return (<div className="ms-metadata">{__("WebPart_EmptyMessage")}</div>);
        }
    }

};
