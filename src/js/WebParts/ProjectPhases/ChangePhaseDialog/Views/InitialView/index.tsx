import * as React from "react";
import { PrimaryButton } from "office-ui-fabric-react/lib/Button";
import IInitialViewProps from "./IInitialViewProps";
import IInitialViewState from "./IInitialViewState";

/**
 * Initial view
 */
export default class InitialView extends React.Component<IInitialViewProps, IInitialViewState> {
    private commentsField: HTMLTextAreaElement;
    private commentMinLength = 4;

    /**
     * Constructor
     *
     * @param {IInitialViewProps} props Props
     */
    constructor(props: IInitialViewProps) {
        super(props);
        this.state = {
            comment: props.currentChecklistItem.GtComment || "",
        };
    }
    /**
   * Calls _render with props and state
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
    public _render({ currentChecklistItem }: IInitialViewProps, { }: IInitialViewState): JSX.Element {
        if (!currentChecklistItem) {
            return null;
        }
        const {
            ID,
            Title,
            GtComment,
         } = currentChecklistItem;

        return (
            <div className="inner">
                <h3>#{ID} {Title}</h3>
                <textarea
                    placeholder={__("String_Comment")}
                    className="ms-TextField-field"
                    style={{
                        marginTop: 15,
                        width: "90%",
                        padding: 10,
                    }}
                    ref={ele => this.commentsField = ele}
                    onKeyUp={({ currentTarget }) => this.setState({ comment: currentTarget.value })}>
                    {GtComment}
                </textarea>
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
    private renderStatusOptions = ({ isLoading, nextCheckPointAction }: IInitialViewProps, { comment }: IInitialViewState) => {
        const options = [
            {
                value: __("Choice_GtChecklistStatus_Closed"),
                disabled: isLoading,
                tooltip: __("ProjectPhases_CheckpointDoneTooltip"),
                updateStatus: true,
            },
            {
                value: __("Choice_GtChecklistStatus_StillOpen"),
                disabled: (isLoading || comment.length < this.commentMinLength),
                tooltip: comment.length < this.commentMinLength ? __("ProjectPhases_CheckpointStillOpenTooltip_CommentEmpty") : __("ProjectPhases_CheckpointStillOpenTooltip"),
                updateStatus: false,
            },
            {
                value: __("Choice_GtChecklistStatus_NotRelevant"),
                disabled: (isLoading || comment.length < this.commentMinLength),
                tooltip: comment.length < this.commentMinLength ? __("ProjectPhases_CheckpointNotRelevantTooltip_CommentEmpty") : __("ProjectPhases_CheckpointNotRelevantTooltip"),
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
                            onClick={() => {
                                nextCheckPointAction(opt.value, comment, opt.updateStatus);
                                this.reset();
                            }}>{opt.value}</PrimaryButton>
                    </span>
                ))}
            </div>
        );
    }

    /**
     * Resets comments field
     */
    private reset = () => {
        this.setState({ comment: "" }, () => {
            this.commentsField.value = "";
        });
    }
}
