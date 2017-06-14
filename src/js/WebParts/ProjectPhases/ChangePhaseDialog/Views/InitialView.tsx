import * as React from "react";
import { Button } from "office-ui-fabric-react/lib/Button";
import { IChecklistItem } from "../../Data";

export interface IInitialViewProps {
    isLoading: boolean;
    currentChecklistItem: IChecklistItem;
    nextCheckPointAction: (statusValue: string, commentsValue: string) => void;
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
            return (
                <div className="inner">
                </div>
            );
        }
        const { ID, Title } = this.props.currentChecklistItem;

        return (
            <div className="inner">
                <h3>#{ID} {Title}</h3>
                <textarea
                    placeholder={__("String_Comment")}
                    className="ms-TextField-field"
                    style={{ marginTop: 10, width: "90%", padding: 10 }}
                    ref={ele => this.commentsField = ele}
                    onKeyUp={e => this.setState({ comment: e.currentTarget.value })} />
                <div style={{ margin: "20px 0 25px 0" }}>
                    {this._statusOptions().map((opt, idx) => (
                        <span key={idx} title={opt.tooltip}>
                        <Button
                            disabled={opt.disabled}
                            onClick={e => {
                                this.props.nextCheckPointAction(opt.value, this.state.comment);
                                this.reset();
                            }}>{opt.value}</Button>
                    </span>
                    ))}
                </div>
            </div>
        );
    }

    /**
     * Status options
     */
    private _statusOptions = () => {
        let [{ isLoading }, { comment }] = [this.props, this.state];
        return [
            {
                value: __("Choice_GtChecklistStatus_Closed"),
                disabled: isLoading,
                tooltip: __("ProjectPhases_CheckpointDoneTooltip"),
            },
            {
                value: __("Choice_GtChecklistStatus_NotRelevant"),
                disabled: (isLoading || comment.length < this.commentMinLength),
                tooltip: comment.length < this.commentMinLength ? __("ProjectPhases_CheckpointNotRelevantTooltip_CommentEmpty") : __("ProjectPhases_CheckpointNotRelevantTooltip"),
            }];
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
