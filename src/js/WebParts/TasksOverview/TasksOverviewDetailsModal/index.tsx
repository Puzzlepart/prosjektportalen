import __ from '../../../Resources'
import * as React from 'react'
import { Modal } from 'office-ui-fabric-react/lib/Modal'
import ITasksOverviewDetailsModalProps from './ITasksOverviewDetailsModalProps'

export default class TasksOverviewDetailsModal extends React.PureComponent<ITasksOverviewDetailsModalProps, {}> {
    public static displayName = 'TasksOverviewDetailsModal';

    /**
     * Constructor
     *
     * @param {ITasksOverviewDetailsModalProps} props Props
     */
    constructor(props: ITasksOverviewDetailsModalProps) {
        super(props)
    }

    /**
     * Renders the <TasksOverviewDetailsModal /> component
     */
    public render(): JSX.Element {
        if (this.props.task) {
            return (
                <Modal
                    isOpen={true}
                    isBlocking={false}
                    onDismiss={this.props.onDismiss}>
                    <div className='pp-task-overview-details-modal'>
                        {this.renderHeader()}
                        {this.renderBody()}
                        <div className='pp-task-overview-details-modal-close-btn' onClick={() => this.props.onDismiss()}>x</div>
                    </div>
                </Modal >
            )
        }
        return null
    }

    /***
     * Renders the modal header
     */
    protected renderHeader() {
        const { task } = this.props
        return (
            <div className='pp-task-overview-details-modal-header'>
                <h3>{task.title}</h3>
            </div>
        )
    }

    /**
     * Renders the modal body
     */
    protected renderBody() {
        const { task } = this.props
        const { item } = task
        return (
            <div className='pp-task-overview-details-modal-body'>
                <div hidden={!item.GtProjectPhase}>
                    <b>{__.getResource('SiteFields_GtProjectPhase_DisplayName')}:</b>&nbsp;
                    <span>{item.GtProjectPhase}</span>
                </div>
                <div hidden={!item.AssignedTo}>
                    <b>{__.getResource('SiteFields_AssignedTo_DisplayName')}:</b>&nbsp;
                    <span>{item.AssignedTo}</span>
                </div>
                <div hidden={!item.StatusOWSCHCS}>
                    <b>{__.getResource('SiteFields_Status_DisplayName')}:</b>&nbsp;
                        <span>{item.StatusOWSCHCS}</span>
                </div>
                <div hidden={!item.PercentCompleteOWSNMBR}>
                    <b>{__.getResource('SiteFields_PercentComplete_DisplayName')}:</b>&nbsp;
                        <span>{Math.round(parseFloat(item.PercentCompleteOWSNMBR) * 100)}%</span>
                </div>
                <div>
                    <b>{__.getResource('SiteFields_StartDate_DisplayName')}:</b>&nbsp;
                    <span>{task.start_time.format('LL')}</span>
                </div>
                <div>
                    <b>{__.getResource('SiteFields_DueDate_DisplayName')}:</b>&nbsp;
                    <span>{task.end_time.format('LL')}</span>
                </div>
                <div>
                    <b>{__.getResource('String_Project')}:</b>&nbsp;
                    <a href={item.SPWebUrl} rel='noopener noreferrer' target='_blank'><span>{item.SiteTitle}</span></a>
                </div>
                <div style={{ marginTop: 20 }}>
                    <a href={item.Path} rel='noopener noreferrer' target='_blank'><span>{__.getResource('ItemLink_Label_NewTab')}</span></a>
                </div>
            </div>
        )
    }
}
