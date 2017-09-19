import * as React from "react";
import Localization from "localization";
import { MessageBar } from "office-ui-fabric-react/lib/MessageBar";
import CheckListItem from "./CheckListItem";
import ISummaryViewProps from "./ISummaryViewProps";

/**
 * Summary view
 */
export const SummaryView = ({ phase, checkListItems, listClassName = "pp-simpleList spacing-m" }: ISummaryViewProps) => {
    let listViewUrl = `${_spPageContextInfo.webAbsoluteUrl}/${Localization.getResource("DefaultView_PhaseChecklist_Url")}?FilterField1=GtProjectPhase&FilterValue1=${phase.Name}`;
    return (
        <div className="inner">
            <ul
                style={{ marginBottom: 20 }}
                className={listClassName}>
                {checkListItems.map((item, idx) => (
                    <CheckListItem
                        key={idx}
                        checkListItem={item} />
                ))}
            </ul>
            <MessageBar >
                <div dangerouslySetInnerHTML={{ __html: String.format(Localization.getResource("ProjectPhases_GoToChecklist2"), listViewUrl) }}></div>
            </MessageBar>
        </div >
    );
};

export default SummaryView;
