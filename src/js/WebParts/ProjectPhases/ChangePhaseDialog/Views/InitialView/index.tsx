import * as React from "react";
import RESOURCE_MANAGER from "../../../../../@localization";
import { PrimaryButton } from "office-ui-fabric-react/lib/Button";
import { TextField } from "office-ui-fabric-react/lib/TextField";
import IInitialViewProps, { InitialViewDefaultProps } from "./IInitialViewProps";
import IInitialViewState from "./IInitialViewState";

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
        super(props);
        this.state = {
            comment: props.currentChecklistItem ? (props.currentChecklistItem.GtComment || "") : "",
        };
    }

    public render(): JSX.Element {
        if (!this.props.currentChecklistItem) {
            return null;
        }
        return (
            <div className={this.props.className}>
                <h3>{this.props.currentChecklistItem.Title}</h3>
                <div style={{ marginTop: 10 }}>
                    <TextField
                        onChanged={newValue => this.setState({ comment: newValue })}
                        placeholder={this.props.commentLabel}
                        multiline
                        value={this.state.comment}
                        resizable={false}
                        style={{ height: 100 }} />
                </div>
                {this.renderStatusOptions()}
            </div>
        );
    }

    /**
     * Render status options
     */
    private renderStatusOptions = () => {
        const isCommentValid = (this.state.comment.length >= this.props.commentMinLength) && /\S/.test(this.state.comment);
        const checklistStatusNotRelevant = RESOURCE_MANAGER.getResource("Choice_GtChecklistStatus_NotRelevant");
        const checkpointNotRelevantTooltipCommentEmpty = RESOURCE_MANAGER.getResource("ProjectPhases_CheckpointNotRelevantTooltip_CommentEmpty");
        const checkpointNotRelevantTooltip = RESOURCE_MANAGER.getResource("ProjectPhases_CheckpointNotRelevantTooltip");
        const checkpointStillOpenTooltipCommentEmpty = RESOURCE_MANAGER.getResource("ProjectPhases_CheckpointStillOpenTooltip_CommentEmpty");
        const checkpointStillOpenTooltip = RESOURCE_MANAGER.getResource("ProjectPhases_CheckpointStillOpenTooltip");
        const checklistStatusStillOpen = RESOURCE_MANAGER.getResource("Choice_GtChecklistStatus_StillOpen");
        const checklistStatusClosed = RESOURCE_MANAGER.getResource("Choice_GtChecklistStatus_Closed");
        const checkpointDoneTooltip = RESOURCE_MANAGER.getResource("ProjectPhases_CheckpointDoneTooltip");
        const options = [
            {
                value: checklistStatusNotRelevant,
                disabled: (this.props.isLoading || !isCommentValid),
                tooltip: !isCommentValid ? checkpointNotRelevantTooltipCommentEmpty : checkpointNotRelevantTooltip,
                updateStatus: true,
            },
            {
                value: checklistStatusStillOpen,
                disabled: (this.props.isLoading || !isCommentValid),
                tooltip: !isCommentValid ? checkpointStillOpenTooltipCommentEmpty : checkpointStillOpenTooltip,
                updateStatus: false,
            },
            {
                value: checklistStatusClosed,
                disabled: this.props.isLoading,
                tooltip: checkpointDoneTooltip,
                updateStatus: true,
            }];
        return (
            <div style={{ marginTop: 20, marginBottom: 25 }}>
                {options.map((opt, key) => (
                    <span key={key} title={opt.tooltip}>
                        <PrimaryButton
                            disabled={opt.disabled}
                            onClick={e => {
                                this.props.nextCheckPointAction(opt.value, this.state.comment, opt.updateStatus);
                                this.setState({ comment: "" });
                            }}>{opt.value}</PrimaryButton>
                    </span>
                ))}
            </div>
        );
    }
}
