import * as React from "react";
import { MessageBar } from "office-ui-fabric-react/lib/MessageBar";
import { IChecklistItem } from "../../Data";

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

export interface IChecklistItemProps {
    item: IChecklistItem;
}

/**
 * CheckPoint
 */
export const CheckListItem = ({ item }: IChecklistItemProps) => {
    return (
        <li>
            <div style={{ color: GetStatusColor(item.GtChecklistStatus) }}>
                <div><b>#{item.ID}</b> <span>{item.Title}</span></div>
                <p
                    hidden={!item.GtComment}
                    className="ms-metadata">
                    <b>{__("String_Comment")}:</b> {item.GtComment}
                </p>
            </div>
        </li>
    );
};


/**
 * Summary view
 */
export const SummaryView = ({ checkListItems, listClassName = "pp-simpleList spacing-m" }) => {
    return (
        <div className="inner">
            <MessageBar>Gå tl fasesjekklisten</MessageBar>
            <ul className={listClassName}>
                {checkListItems.map((item, idx) => (
                    <CheckListItem
                        key={idx}
                        item={item} />
                ))}
            </ul>
        </div>
    );
};

export default SummaryView;
