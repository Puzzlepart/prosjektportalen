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

const ChecklistStats = ({ phase }) => {
    const { stats } = phase.Checklist;
    return (
        <ul>
            {Object.keys(stats).map((c, index) => (
                <li key={index} style={{ paddingTop: "5px" }}>
                    <Icon iconName={GetStatusIcon(index)} /> <span>{stats[c]} {c} {RESOURCE_MANAGER.getResource("ProjectPhases_Checkpoints")}.</span>
                </li>
            ))}
        </ul>
    );
};

const ChangePhaseLink = ({ phase, changePhaseEnabled, onChangePhase }) => {
    let linkTextResourceKey;
    switch (phase.Type) {
        case "Gate": linkTextResourceKey = "ProjectPhases_ChangeGate";
            break;
        case "Default": linkTextResourceKey = "ProjectPhases_ChangePhase";
            break;
    }
    return (
        <li>
            <div hidden={!changePhaseEnabled}>
                <a href="#" onClick={() => onChangePhase(phase)}>
                    <Icon iconName="DoubleChevronRight12" />
                    <span style={{ marginLeft: 5 }}>{RESOURCE_MANAGER.getResource(linkTextResourceKey)}</span>
                </a>
            </div>
        </li>
    );
};

const GoToChecklistLink = ({ phase }) => {
    return (
        <li>
            <a href={`${phase.Checklist.defaultViewUrl}?FilterField1=GtProjectPhase&FilterValue1=${encodeURIComponent(phase.Name)}`}>
                <Icon iconName="BulletedList" />
                <span style={{ marginLeft: 5 }}>{RESOURCE_MANAGER.getResource("ProjectPhases_GoToChecklist")}</span>
            </a>
        </li>
    );
};

const RestartPhaseLink = ({ phase, restartPhaseEnabled, onRestartPhase }) => {
    return (
        <li>
            <div hidden={!restartPhaseEnabled}>
                <a href="#" onClick={() => onRestartPhase(phase)}>
                    <Icon iconName="Refresh" />
                    <span style={{ marginLeft: 5 }}>{RESOURCE_MANAGER.getResource("ProjectPhases_RestartPhase")}</span>
                </a>
            </div>
        </li>
    );
};

/**
 * Project Phase Callout
 *
 * @param {IProjectPhaseCalloutProps} param0 Props
 */
const ProjectPhaseCallout = ({ phase, changePhaseEnabled, restartPhaseEnabled, onChangePhase, onRestartPhase, className = "phaseCallout" }: IProjectPhaseCalloutProps) => {
    return (
        <div className={className}>
            <h3>{String.format(RESOURCE_MANAGER.getResource("ProjectPhases_PhaseCalloutHeader"), phase.Name)}</h3>
            <ChecklistStats phase={phase} />
            <ul style={{ marginTop: 15, marginBottom: 10 }}>
                <GoToChecklistLink phase={phase} />
                <ChangePhaseLink
                    phase={phase}
                    changePhaseEnabled={changePhaseEnabled}
                    onChangePhase={onChangePhase} />
                <RestartPhaseLink
                    phase={phase}
                    restartPhaseEnabled={restartPhaseEnabled}
                    onRestartPhase={onRestartPhase} />
            </ul>
        </div>
    );
};

export default ProjectPhaseCallout;
export { IProjectPhaseCalloutProps };
