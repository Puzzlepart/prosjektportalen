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

const ChecklistStats = ({ data }) => {
    const validStats = (data && data.stats);
    return validStats
        ? (
            <ul>
                {Object.keys(data.stats).map((c, index) => (
                    <li key={index} style={{ paddingTop: "5px" }}>
                        <Icon iconName={GetStatusIcon(index)} /> <span>{data.stats[c]} {c} {RESOURCE_MANAGER.getResource("ProjectPhases_Checkpoints")}.</span>
                    </li>
                ))}
            </ul>
        )
        : (
            <ul>
                <li>{RESOURCE_MANAGER.getResource("ProjectPhases_NoCheckpointsFoundForPhase")}</li>
            </ul>
        );
};

const ChangePhaseLink = ({ phase, changePhaseEnabled, onChangePhase }) => {
    return (
        <li>
            <div hidden={!changePhaseEnabled}>
                <a href="#" onClick={() => onChangePhase(phase)}>
                    <Icon iconName="DoubleChevronRight12" />
                    <span style={{ marginLeft: 5 }}>{RESOURCE_MANAGER.getResource("ProjectPhases_ChangePhase")}</span>
                </a>
            </div>
        </li>
    );
};

const GoToChecklistLink = ({ checkListDefaultViewUrl, phase }) => {
    return (
        <li>
            <a href={`${checkListDefaultViewUrl}?FilterField1=GtProjectPhase&FilterValue1=${encodeURIComponent(phase.Name)}`}>
                <Icon iconName="BulletedList" />
                <span style={{ marginLeft: 5 }}>{RESOURCE_MANAGER.getResource("ProjectPhases_GoToChecklist")}</span>
            </a>
        </li>
    );
};

const RestartPhaseLink = ({ phase, onChangePhase }) => {
    return (
        <li>
            <div hidden={!phase.IsIncremental}>
                <a href="#" onClick={() => onChangePhase(phase)}>
                    <Icon iconName="Refresh" />
                    <span style={{ marginLeft: 5 }}>Start fase på nytt</span>
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
const ProjectPhaseCallout = ({ phase, checkListData, checkListDefaultViewUrl, changePhaseEnabled, onChangePhase, className = "phaseCallout" }: IProjectPhaseCalloutProps) => {
    return (
        <div className={className}>
            <h3>{String.format(RESOURCE_MANAGER.getResource("ProjectPhases_PhaseCalloutHeader"), phase.Name)}</h3>
            <ChecklistStats data={checkListData} />
            <ul style={{ marginTop: 15, marginBottom: 10 }}>
                <GoToChecklistLink
                    phase={phase}
                    checkListDefaultViewUrl={checkListDefaultViewUrl} />
                <ChangePhaseLink
                    phase={phase}
                    changePhaseEnabled={changePhaseEnabled}
                    onChangePhase={onChangePhase} />
                <RestartPhaseLink
                    phase={phase}
                    onChangePhase={onChangePhase} />
            </ul>
        </div>
    );
};

export default ProjectPhaseCallout;
export { IProjectPhaseCalloutProps };
