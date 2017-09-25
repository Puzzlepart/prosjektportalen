import * as React from "react";
import RESOURCE_MANAGER from "localization";
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

    /**
     * Calls _render with props and state to allow for ES6 destruction to allow for ES6 destruction
     */
    public render(): JSX.Element {
        return this._render(this.props, this.state);
    }

    /**
     * Renders the component
     *
     * @param {IInitialViewProps} param0 Props
     * @param {IInitialViewState} param1 State
     */
    public _render({ currentChecklistItem, className, commentLabel }: IInitialViewProps, { comment }: IInitialViewState): JSX.Element {
        if (!currentChecklistItem) {
            return null;
        }
        const {
            ID,
            Title,
         } = currentChecklistItem;

        return (
            <div className={className}>
                <h3>#{ID} {Title}</h3>
                <TextField
                    onChanged={newValue => this.setState({ comment: newValue })}
                    label={commentLabel}
                    multiline
                    value={comment}
                    resizable={false} />
                {this.renderStatusOptions(this.props, this.state)}
            </div>
        );
    }

    /**
     * Status options
     *
     * @param {IInitialViewProps} param0 Props
     * @param {IInitialViewState} param1 State
     */
    private renderStatusOptions = ({ isLoading, nextCheckPointAction, commentMinLength }: IInitialViewProps, { comment }: IInitialViewState) => {
        const isCommentValid = (comment.length >= commentMinLength) && /\S/.test(comment);
        const options = [
            {
                value: RESOURCE_MANAGER.getResource("Choice_GtChecklistStatus_NotRelevant"),
                disabled: (isLoading || !isCommentValid),
                tooltip: !isCommentValid ? RESOURCE_MANAGER.getResource("ProjectPhases_CheckpointNotRelevantTooltip_CommentEmpty") : RESOURCE_MANAGER.getResource("ProjectPhases_CheckpointNotRelevantTooltip"),
                updateStatus: true,
            },
            {
                value: RESOURCE_MANAGER.getResource("Choice_GtChecklistStatus_StillOpen"),
                disabled: (isLoading || !isCommentValid),
                tooltip: !isCommentValid ? RESOURCE_MANAGER.getResource("ProjectPhases_CheckpointStillOpenTooltip_CommentEmpty") : RESOURCE_MANAGER.getResource("ProjectPhases_CheckpointStillOpenTooltip"),
                updateStatus: false,
            },
            {
                value: RESOURCE_MANAGER.getResource("Choice_GtChecklistStatus_Closed"),
                disabled: isLoading,
                tooltip: RESOURCE_MANAGER.getResource("ProjectPhases_CheckpointDoneTooltip"),
                updateStatus: true,
            }];
        return (
            <div style={{
                marginTop: 20,
                marginBottom: 25,
            }}>
                {options.map((opt, key) => (
                    <span
                        key={key}
                        title={opt.tooltip}>
                        <PrimaryButton
                            disabled={opt.disabled}
                            onClick={e => {
                                nextCheckPointAction(opt.value, comment, opt.updateStatus);
                                this.setState({ comment: "" });
                            }}>{opt.value}</PrimaryButton>
                    </span>
                ))}
            </div>
        );
    }
}
