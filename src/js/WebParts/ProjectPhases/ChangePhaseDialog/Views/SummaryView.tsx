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
export const SummaryView = ({ currentPhase, checkListItems, listClassName = "pp-simpleList spacing-m" }) => {
    let listViewUrl = `${_spPageContextInfo.webAbsoluteUrl}/${__("DefaultView_PhaseChecklist_Url")}?FilterField1=GtProjectPhase&FilterValue1=${currentPhase}`;
    return (
        <div className="inner">
            <ul
                style={{ marginBottom: 20 }}
                className={listClassName}>
                {checkListItems.map((item, idx) => (
                    <CheckListItem
                        key={idx}
                        item={item} />
                ))}
            </ul>
            <MessageBar >
                <div dangerouslySetInnerHTML={{ __html: String.format(__("ProjectPhases_GoToChecklist2"), listViewUrl) }}></div>
            </MessageBar>
        </div >
    );
};

export default SummaryView;
