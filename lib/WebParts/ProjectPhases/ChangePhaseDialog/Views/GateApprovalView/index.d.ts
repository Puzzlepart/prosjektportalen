import * as React from "react";
import IGateApprovalViewProps from "./IGateApprovalViewProps";
import IGateApprovalViewState from "./IGateApprovalViewState";
/**
 * Initial view
 */
export default class GateApprovalView extends React.Component<IGateApprovalViewProps, IGateApprovalViewState> {
    static defaultProps: Partial<IGateApprovalViewProps>;
    /**
     * Constructor
     *
     * @param {IGateApprovalViewProps} props Props
     */
    constructor(props: IGateApprovalViewProps);
    render(): JSX.Element;
    /**
     * Get actions
     */
    private getActions;
    /**
     * Get loading text based on this.state.review
     */
    private getLoadingText;
    /**
     * On submit review
     *
     * @param {ChangePhaseDialogResult} review Review
     */
    private _onSubmitReview;
}
