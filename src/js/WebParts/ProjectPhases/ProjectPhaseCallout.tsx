import * as React from "react";

const GetStatusIcon = (index: number) => {
    switch (index) {
        case 0:
            return "CheckMark";
        case 1:
            return "ErrorBadge";
        case 2:
            return "CircleRing";
    }
};

export const ProjectPhaseCallout = ({ phase, selected, checkListData, onChangePhase }) => {
    const PHASE_CHECKLIST_URL = `../${__("DefaultView_PhaseChecklist_Url")}?FilterField1=GtProjectPhase&FilterValue1=${encodeURIComponent(phase.Name)}`;
    const __RenderChecklistStats = () => {
        return checkListData && checkListData.stats ? (Object.keys(checkListData.stats).map((c, index) => (
            <li key={index} style={{ paddingTop: "5px" }}>
                <i className={`ms-Icon ms-Icon--${GetStatusIcon(index)}`} aria-hidden="true"></i>&nbsp;
                        <span>{checkListData.stats[c]} {c} {__("ProjectPhases_Checkpoints")}.</span>
            </li>
        ))) : (<li>{__("ProjectPhases_NoCheckpointsFoundForPhase")}</li>);
    };

    return (<div className="phaseCallout">
        <h3>{String.format(__("ProjectPhases_PhaseCalloutHeader"), phase.Name)}</h3>
        <ul className="checkList">
            {__RenderChecklistStats()}
            <li className="spacer"></li>
            <li><a className="se-all" href={PHASE_CHECKLIST_URL}>{__("ProjectPhases_GoToChecklist")}</a></li>
            {!selected && <li><span style={{ cursor: "pointer" }} onClick={() => onChangePhase(phase)}>{__("ProjectPhases_ChangePase")}</span></li>}
        </ul>
    </div>);
};
