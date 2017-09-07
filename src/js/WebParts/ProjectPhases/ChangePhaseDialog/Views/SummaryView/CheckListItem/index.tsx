import * as React from "react";
import IChecklistItemProps from "./IChecklistItemProps";

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
export const CheckListItem = ({ checkListItem }: IChecklistItemProps) => {
    return (
        <li>
            <div style={{ color: GetStatusColor(checkListItem.GtChecklistStatus) }}>
                <div><b>#{checkListItem.ID}</b> <span>{checkListItem.Title}</span></div>
                <p
                    hidden={!checkListItem.GtComment}
                    className="ms-metadata">
                    <b>{__("String_Comment")}:</b> {checkListItem.GtComment}
                </p>
            </div>
        </li>
    );
};

export default CheckListItem;

