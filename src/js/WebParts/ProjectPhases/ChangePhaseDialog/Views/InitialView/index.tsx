import * as React from 'react'
import __ from '../../../../../Resources'
import { PrimaryButton, IButtonProps } from 'office-ui-fabric-react/lib/Button'
import { TextField } from 'office-ui-fabric-react/lib/TextField'
import IInitialViewProps, { InitialViewDefaultProps } from './IInitialViewProps'
import IInitialViewState from './IInitialViewState'

/**
 * Initial view
 */
export default class InitialView extends React.Component<IInitialViewProps, IInitialViewState> {
    public static defaultProps = InitialViewDefaultProps;

    /**
     * Constructor
     *
     * @param {IInitialViewProps} props Props
     */
    constructor(props: IInitialViewProps) {
        super(props)
        this.state = {
            comment: props.currentChecklistItem ? (props.currentChecklistItem.GtComment || '') : '',
        }
        this._onNextCheckPoint = this._onNextCheckPoint.bind(this)
        this._onCommentUpdate = this._onCommentUpdate.bind(this)
    }

    public render(): JSX.Element {
        if (!this.props.currentChecklistItem) {
            return null
        }
        return (
            <div className={this.props.className}>
                <h3>{this.props.currentChecklistItem.Title}</h3>
                <div style={{ marginTop: 10 }}>
                    <TextField
                        onChanged={this._onCommentUpdate}
                        placeholder={this.props.commentLabel}
                        multiline
                        value={this.state.comment}
                        resizable={false}
                        style={{ height: 100 }} />
                </div>
                {this.renderStatusOptions()}
            </div>
        )
    }

    /**
     * Render status options
     */
    private renderStatusOptions() {
        const { isLoading, commentMinLength } = this.props
        const { comment } = this.state

        const isCommentValid = (comment.length >= commentMinLength) && /\S/.test(comment)
        const statusNotRelevantTooltipCommentEmpty = __.getResource('ProjectPhases_CheckpointNotRelevantTooltip_CommentEmpty')
        const statusNotRelevantTooltip = __.getResource('ProjectPhases_CheckpointNotRelevantTooltip')
        const statusStillOpenTooltipCommentEmpty = __.getResource('ProjectPhases_CheckpointStillOpenTooltip_CommentEmpty')
        const statusStillOpenTooltip = __.getResource('ProjectPhases_CheckpointStillOpenTooltip')
        const statusDoneTooltip = __.getResource('ProjectPhases_CheckpointDoneTooltip')

        const statusNotRelevant = __.getResource('Choice_GtChecklistStatus_NotRelevant')
        const statusStillOpen = __.getResource('Choice_GtChecklistStatus_StillOpen')
        const statusClosed = __.getResource('Choice_GtChecklistStatus_Closed')

        const statusOptions: IButtonProps[] = [
            {
                text: statusNotRelevant,
                disabled: (isLoading || !isCommentValid),
                title: !isCommentValid ? statusNotRelevantTooltipCommentEmpty : statusNotRelevantTooltip,
                onClick: () => this._onNextCheckPoint(statusNotRelevant, comment),
            },
            {
                text: statusStillOpen,
                disabled: (isLoading || !isCommentValid),
                title: !isCommentValid ? statusStillOpenTooltipCommentEmpty : statusStillOpenTooltip,
                onClick: () => this._onNextCheckPoint(statusStillOpen, comment, false),
            },
            {
                text: statusClosed,
                disabled: isLoading,
                title: statusDoneTooltip,
                onClick: () => this._onNextCheckPoint(statusClosed, comment),
            }]
        return (
            <div style={{ marginTop: 20, marginBottom: 25 }}>
                {statusOptions.map((statusOpt, key) => (
                    <span key={key} >
                        <PrimaryButton { ...statusOpt } />
                    </span>
                ))}
            </div>
        )
    }

    /**
    * Next checkpoint action
    *
    * @param {string} status Status value
    * @param {string} comment Comment value
    * @param {boolean} updateStatus Update status
    */
    private _onNextCheckPoint(status: string, comment: string, updateStatus = true) {
        this.props.nextCheckPointAction(status, comment, true)
        this.setState({ comment: '' })
    }

    /**
    * On comment update
    *
    * @param {string} newValue New value
    */
    private _onCommentUpdate(newValue: string) {
        this.setState({ comment: newValue })
    }
}
