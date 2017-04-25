import * as React from "react";
import { Button } from "office-ui-fabric-react";

export interface IInitialViewProps {
    isLoading: boolean;
    currentChecklistItem: any;
    nextCheckPointAction: (statusValue: string, commentsValue: string) => void;
}

export interface IInitialViewState {
    comment: string;
}

/**
 * Initial view
 */
export class InitialView extends React.Component<IInitialViewProps, IInitialViewState> {
    private commentsField: HTMLTextAreaElement;
    private commentMinLength = 4;
    constructor() {
        super();
        this.state = {
            comment: "",
        };
    }

    public render() {
        let [{ currentChecklistItem, nextCheckPointAction }, { comment }] = [this.props, this.state];
        if (!currentChecklistItem) {
            return <div className="inner"></div>;
        }
        const { ID, Title } = currentChecklistItem;

        return (<div className="inner">
            <h3>#{ID} {Title}</h3>
            <textarea
                placeholder={__("String_Comment")}
                className="ms-TextField-field"
                style={{ marginTop: 10, width: "90%", padding: 10 }}
                ref={ele => this.commentsField = ele}
                onKeyUp={e => this.setState({ comment: e.currentTarget.value })} />
            <div style={{ margin: "20px 0 25px 0" }}>
                {this._statusOptions().map((opt, idx) => <span key={idx} title={opt.tooltip}>
                    <Button
                        disabled={opt.disabled}
                        onClick={e => {
                            nextCheckPointAction(opt.value, comment);
                            this.reset();
                        }}>{opt.value}</Button>
                </span>)}
            </div>
        </div>);
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
};
