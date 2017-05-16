import * as React from "react";

const GetStatusColor = (status) => {
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
 * CheckPoint
 */
export const CheckPoint = ({ item }) => {
    let { ID, Title, GtChecklistStatus, GtComment } = item;
    return (<li>
        <div style={{ color: GetStatusColor(GtChecklistStatus) }}>
            <div><b>#{ID}</b> <span>{Title}</span></div>
            <p hidden={!GtComment} className="ms-metadata"><b>{__("String_Comment")}:</b> {GtComment}</p>
        </div>
    </li>);
};


/**
 * Summary view
 */
export const SummaryView = ({ checkListItems }) => {
    return (<div className="inner">
        <ul className="pp-simpleList spacing-m">
            {checkListItems.map((item, idx) => <CheckPoint key={idx} item={item} />)}
        </ul>
    </div>);
};

export default SummaryView;
