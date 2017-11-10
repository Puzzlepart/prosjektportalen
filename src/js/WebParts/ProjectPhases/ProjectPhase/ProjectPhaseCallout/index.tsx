import * as React from "react";
import RESOURCE_MANAGER from "../../../../@localization";
import { Icon } from "office-ui-fabric-react/lib/Icon";
import IProjectPhaseCalloutProps from "./IProjectPhaseCalloutProps";

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

/**
 * Project Phase Callout
 *
 * @param {IProjectPhaseCalloutProps} param0 Props
 */
const ProjectPhaseCallout = ({ phase, selected, checkListData, checkListDefaultViewUrl, onChangePhase, className = "phaseCallout" }: IProjectPhaseCalloutProps) => {
    const PHASE_CHECKLIST_URL = `${checkListDefaultViewUrl}?FilterField1=GtProjectPhase&FilterValue1=${encodeURIComponent(phase.Name)}`;

    /**
     * Render checklist stats
     */
    const renderChecklistStats = () => {
        const validStats = (checkListData && checkListData.stats);
        return validStats
            ? (Object.keys(checkListData.stats).map((c, index) => (
                <li key={index} style={{ paddingTop: "5px" }}>
                    <Icon iconName={GetStatusIcon(index)} /> <span>{checkListData.stats[c]} {c} {RESOURCE_MANAGER.getResource("ProjectPhases_Checkpoints")}.</span>
                </li>
            )))
            : (
                <li>{RESOURCE_MANAGER.getResource("ProjectPhases_NoCheckpointsFoundForPhase")}</li>
            );
    };

    return (
        <div className={className}>
            <h3>{String.format(RESOURCE_MANAGER.getResource("ProjectPhases_PhaseCalloutHeader"), phase.Name)}</h3>
            <ul className="checkList">
                {renderChecklistStats()}
                <li className="spacer"></li>
                <li>
                    <a className="se-all" href={PHASE_CHECKLIST_URL}>{RESOURCE_MANAGER.getResource("ProjectPhases_GoToChecklist")}</a>
                </li>
                {!selected && <li>
                    <span style={{ cursor: "pointer" }} onClick={() => onChangePhase(phase)}>{RESOURCE_MANAGER.getResource("ProjectPhases_ChangePase")}</span>
                </li>}
            </ul>
        </div>
    );
};

export default ProjectPhaseCallout;
