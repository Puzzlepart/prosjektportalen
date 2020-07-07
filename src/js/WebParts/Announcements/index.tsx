import { Site } from '@pnp/sp'
import { MessageBar } from 'office-ui-fabric-react/lib/MessageBar'
import { Modal } from 'office-ui-fabric-react/lib/Modal'
import { Spinner, SpinnerType } from 'office-ui-fabric-react/lib/Spinner'
import * as React from 'react'
import __ from '../../Resources'
import * as Util from '../../Util'
import BaseWebPart from '../@BaseWebPart'
import IAnnouncementsProps, { AnnouncementsDefaultProps } from './IAnnouncementsProps'
import IAnnouncementsState from './IAnnouncementsState'

/**
 * Announcements
 */
export default class Announcements extends BaseWebPart<IAnnouncementsProps, IAnnouncementsState> {
    public static displayName = 'Announcements';
    public static defaultProps = AnnouncementsDefaultProps;

    /**
     * Constructor
     *
     * @param {IAnnouncementsProps} props Props
     */
    constructor(props: IAnnouncementsProps) {
        super(props, {
            isLoading: true,
        })
    }

    /**
     * Component did mount
     */
    public componentDidMount() {
        const {
            itemsCount,
            itemsFilter,
            itemsOrderBy,
        } = this.props

        new Site(_spPageContextInfo.siteAbsoluteUrl)
            .rootWeb
            .lists
            .getByTitle(__.getResource('Lists_Announcements_Title'))
            .items
            .filter(itemsFilter)
            .top(itemsCount)
            .orderBy(itemsOrderBy.orderBy, itemsOrderBy.ascending)
            .get().then(entries => {
                this.setState({ entries: entries, isLoading: false })
            })
    }

    /**
     * Renders the component
     */
    public render(): JSX.Element {
        return (
            <div>
                {this._renderChrome(__.getResource('WebPart_Announcements_Title'), this.state.elementToToggle, Announcements.displayName)}
                {this.renderItems(this.props, this.state)}
                {this.renderModal(this.props, this.state)}
            </div>
        )
    }

    /**
     * Render items
     *
     * @param {IAnnouncementsProps} param0 Props
     * @param {IAnnouncementsState} param1 State
     */
    private renderItems = ({ }: IAnnouncementsProps, { isLoading, entries }: IAnnouncementsState) => {
        if (isLoading) {
            return (
                <Spinner type={SpinnerType.large} />
            )
        } else if (entries.length > 0) {
            return (
                <div ref={elementToToggle => this.setState({ elementToToggle })}>
                    <ul className={this.props.listClassName}>
                        {entries.map((entry, idx) => <li key={idx}>
                            <h5>
                                <a
                                    style={{ cursor: 'pointer' }}
                                    onClick={() => this.setState({ showAnnouncement: entry })}>{entry.Title}</a>
                            </h5>
                            <span className='ms-metadata'>{__.getResource('String_Published')} {Util.formatDate(entry.Created, undefined, false)}</span>
                        </li>)}
                    </ul>
                </div>
            )
        } else {
            return (
                <div ref={elementToToggle => this.setState({ elementToToggle })}>
                    <MessageBar>{__.getResource('WebPart_EmptyMessage')}</MessageBar>
                </div>
            )
        }
    }

    /**
     * Render modal
     *
     * @param {IAnnouncementsProps} param0 Props
     * @param {IAnnouncementsState} param1 State
    */
    private renderModal = ({ modalContainerClassName, modalHeaderClassName, modalBodyClassName }: IAnnouncementsProps, { showAnnouncement }: IAnnouncementsState) => {
        if (showAnnouncement) {
            return (
                <Modal
                    isOpen={showAnnouncement}
                    isDarkOverlay={true}
                    onDismiss={() => this.setState({ showAnnouncement: null })}
                    containerClassName={modalContainerClassName}
                    isBlocking={false}
                >
                    <div style={{ padding: 50 }}>
                        <div className={modalHeaderClassName}>
                            <span>{showAnnouncement.Title}</span>
                        </div>
                        <div className='ms-font-xs' style={{ marginTop: 20 }}>
                            Publisert {Util.formatDate(showAnnouncement.Created, undefined, false)}
                        </div>
                        <div className={modalBodyClassName} dangerouslySetInnerHTML={{ __html: showAnnouncement.Body }}></div>
                    </div>
                </Modal>
            )
        }
        return null
    }
}

export {
    IAnnouncementsProps,
    IAnnouncementsState,
}
