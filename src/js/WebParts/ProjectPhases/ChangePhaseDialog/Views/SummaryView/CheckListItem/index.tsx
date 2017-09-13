import * as React from "react";
import { Icon } from "office-ui-fabric-react/lib/Icon";
import IChecklistItemProps from "./IChecklistItemProps";
import IChecklistItemState from "./IChecklistItemState";

const GetStatusColor = (status: string): string => {
    switch (status) {
        case __("Choice_GtChecklistStatus_Open"): {
            return "inherit";
        }
        case __("Choice_GtChecklistStatus_Closed"): {
            return "#107c10";
        }
        case __("Choice_GtChecklistStatus_NotRelevant"): {
            return "#e81123";
        }
        default: {
            return "";
        }
    }
};

/**
 * CheckListItem
 */
export default class CheckListItem extends React.PureComponent<IChecklistItemProps, IChecklistItemState> {
    /**
     * Constructor
     *
     * @param {IChecklistItemProps} props Props
     */
    constructor(props: IChecklistItemProps) {
        super(props);
        this.state = { showComment: false };
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
     * @param {IChecklistItemProps} param0 Props
     * @param {IChecklistItemState} param1 State
     */
    public _render({ checkListItem }: IChecklistItemProps, { showComment }: IChecklistItemState) {
        const { ID, Title, GtChecklistStatus, GtComment } = checkListItem;
        const hasComment = GtComment !== null && /\S/.test(GtComment);
        const style = {
            color: GetStatusColor(GtChecklistStatus),
            cursor: hasComment ? "pointer" : "initial",
        };

        return (
            <li>
                <div
                    className="ms-Grid"
                    style={style}>
                    <div
                        className="ms-Grid-row"
                        onClick={e => {
                            if (hasComment) {
                                this.setState({ showComment: !showComment });
                            }
                        }}>
                        <div className="ms-Grid-col ms-sm10">
                            <b>#{ID}</b> <span>{Title}</span>
                        </div>
                        <div
                            className="ms-Grid-col ms-sm2"
                            hidden={!hasComment}>
                            <Icon iconName={showComment ? "ChevronDown" : "ChevronUp"} />
                        </div>
                    </div>
                    <div
                        className="ms-Grid-row"
                        hidden={!showComment}>
                        <div className="ms-Grid-col ms-sm12">
                            <p className="ms-metadata">
                                {GtComment}
                            </p>
                        </div>
                    </div>
                </div>
            </li>
        );
    }
}



