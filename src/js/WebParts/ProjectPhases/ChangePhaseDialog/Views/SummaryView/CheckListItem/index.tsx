import * as React from "react";
import RESOURCE_MANAGER from "../../../../../../@localization";
import { Icon } from "office-ui-fabric-react/lib/Icon";
import IChecklistItemProps from "./IChecklistItemProps";
import IChecklistItemState from "./IChecklistItemState";

const GetStatusColor = (status: string): string => {
    switch (status) {
        case RESOURCE_MANAGER.getResource("Choice_GtChecklistStatus_Open"): {
            return "inherit";
        }
        case RESOURCE_MANAGER.getResource("Choice_GtChecklistStatus_Closed"): {
            return "#107c10";
        }
        case RESOURCE_MANAGER.getResource("Choice_GtChecklistStatus_NotRelevant"): {
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

    public render(): JSX.Element {
        const { Title, GtChecklistStatus, GtComment } = this.props.checkListItem;
        const hasComment = GtComment !== null && /\S/.test(GtComment);
        const style = { color: GetStatusColor(GtChecklistStatus), cursor: hasComment ? "pointer" : "initial" };
        return (
            <li>
                <div className="ms-Grid" style={style}>
                    <div className="ms-Grid-row" onClick={e => {
                        if (hasComment) {
                            this.setState({ showComment: !this.state.showComment });
                        }
                    }}>
                        <div className="ms-Grid-col ms-sm10">
                            <span>{Title}</span>
                        </div>
                        <div className="ms-Grid-col ms-sm2" hidden={!hasComment}>
                            <Icon iconName={this.state.showComment ? "ChevronDown" : "ChevronUp"} />
                        </div>
                    </div>
                    <div className="ms-Grid-row" hidden={!this.state.showComment}>
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



