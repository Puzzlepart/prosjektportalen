import * as React from "react";
import { PrimaryButton } from "office-ui-fabric-react/lib/Button";
import { IChecklistItem } from "../../Data";

export interface IInitialViewProps {
    isLoading: boolean;
    currentChecklistItem: IChecklistItem;
    nextCheckPointAction: (statusValue: string, commentsValue: string, updateStatus: boolean) => void;
}

export interface IInitialViewState {
    comment: string;
}

/**
 * Initial view
 */
export default class InitialView extends React.Component<IInitialViewProps, IInitialViewState> {
    private commentsField: HTMLTextAreaElement;
    private commentMinLength = 4;

    /**
     * Constructor
     */
    constructor() {
        super();
        this.state = {
            comment: "",
        };
    }

    /**
     * Renders the component
     */
    public render(): JSX.Element {
        if (!this.props.currentChecklistItem) {
            return null;
        }
        const {
            ID,
            Title,
         } = this.props.currentChecklistItem;

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
                    onKeyUp={({ currentTarget }) => this.setState({ comment: currentTarget.value })} />
                {this.renderStatusOptions(this.props, this.state)}
            </div>
        );
    }

    /**
     * Status options
     */
    private renderStatusOptions = ({ isLoading }: IInitialViewProps, { comment }: IInitialViewState) => {
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
                                this.props.nextCheckPointAction(opt.value, comment, opt.updateStatus);
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
