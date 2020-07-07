
import __ from '../../../../../Resources'
import * as React from 'react'
import { ActionButton, IButtonProps } from 'office-ui-fabric-react/lib/Button'
import { Spinner, SpinnerSize } from 'office-ui-fabric-react/lib/Spinner'
import IGateApprovalViewProps, { GateApprovalViewDefaultProps } from './IGateApprovalViewProps'
import IGateApprovalViewState from './IGateApprovalViewState'
import ChangePhaseDialogResult from '../../ChangePhaseDialogResult'

/**
 * Initial view
 */
export default class GateApprovalView extends React.Component<IGateApprovalViewProps, IGateApprovalViewState> {
    public static defaultProps = GateApprovalViewDefaultProps;

    /**
     * Constructor
     *
     * @param {IGateApprovalViewProps} props Props
     */
    constructor(props: IGateApprovalViewProps) {
        super(props)
        this.state = {}
        this._onSubmitReview = this._onSubmitReview.bind(this)
    }

    public render(): JSX.Element {
        return (
            <div className='inner'>
                <h2>{__.getResource('String_Approval')}</h2>
                {this.state.review
                    ? <Spinner size={SpinnerSize.large} label={this.getLoadingText()} />
                    : (
                        <div>
                            {this.getActions().map((buttonProps, index) => (
                                <div key={`GateApprovalView_Action_${index}`} style={{ marginTop: 5 }}>
                                    <ActionButton { ...buttonProps } style={{ margin: 0 }} />
                                </div>
                            ))}
                        </div>
                    )
                }
            </div>
        )
    }

    /**
     * Get actions
     */
    private getActions(): IButtonProps[] {
        return [
            {
                text: __.getResource('String_Approved'),
                iconProps: { iconName: 'Accept' },
                onClick: () => this._onSubmitReview(ChangePhaseDialogResult.Approved),
            },
            {
                text: __.getResource('String_ProvisionallyApproved'),
                iconProps: { iconName: 'Warning' },
                onClick: () => this._onSubmitReview(ChangePhaseDialogResult.ProvisionallyApproved),
            },
            {
                text: __.getResource('String_Rejected'),
                iconProps: { iconName: 'Error' },
                onClick: () => this._onSubmitReview(ChangePhaseDialogResult.Rejected),
            },
        ]
    }

    /**
     * Get loading text based on this.state.review
     */
    private getLoadingText(): string {
        // eslint-disable-next-line default-case
        switch (this.state.review) {
            case ChangePhaseDialogResult.Approved: {
                return __.getResource('ProjectPhases_ApprovingPhaseChange')
            }
            case ChangePhaseDialogResult.ProvisionallyApproved: {
                return __.getResource('ProjectPhases_ProvisionallyApprovingPhaseChange')
            }
            case ChangePhaseDialogResult.Rejected: {
                return __.getResource('ProjectPhases_RejectingPhaseChange')
            }
        }
    }

    /**
     * On submit review
     *
     * @param {ChangePhaseDialogResult} review Review
     */
    private async _onSubmitReview(review: ChangePhaseDialogResult) {
        this.setState({ review })
        await this.props.onChangePhaseDialogReturnCallback(review)
        this.props.onCloseDialog(null, true)
        this.setState({ review: null })
    }
}
