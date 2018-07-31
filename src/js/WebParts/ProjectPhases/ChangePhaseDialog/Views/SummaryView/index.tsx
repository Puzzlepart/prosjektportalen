import * as React from "react";
import __ from "../../../../../Resources";
import { MessageBar } from "office-ui-fabric-react/lib/MessageBar";
import CheckListItem from "./CheckListItem";
import ISummaryViewProps from "./ISummaryViewProps";

/**
 * Summary view
 */
export const SummaryView = ({ activePhase }: ISummaryViewProps) => {
    let listViewUrl = `${_spPageContextInfo.webAbsoluteUrl}/${__.getResource("DefaultView_PhaseChecklist_Url")}?FilterField1=GtProjectPhase&FilterValue1=${activePhase.Name}`;
    return (
        <div className="inner">
            <ul
                style={{ marginBottom: 20 }}
                className={"pp-simpleList spacing-m"}>
                {activePhase.Checklist.items.map((item, idx) => (
                    <CheckListItem
                        key={`SummaryView_CheckListItem_${idx}`}
                        checkListItem={item} />
                ))}
            </ul>
            <MessageBar >
                <div dangerouslySetInnerHTML={{ __html: String.format(__.getResource("ProjectPhases_GoToChecklist2"), listViewUrl) }}></div>
            </MessageBar>
        </div >
    );
};

export default SummaryView;
