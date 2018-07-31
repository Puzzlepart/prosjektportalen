import * as React from "react";
import __ from "../../../../Resources";
import IProjectPhaseCalloutProps from "./IProjectPhaseCalloutProps";
import ChecklistStats from "./ChecklistStats";
import GoToChecklistLink from "./GoToChecklistLink";
import ChangePhaseLink from "./ChangePhaseLink";
import RestartPhaseLink from "./RestartPhaseLink";

/**
 * Project Phase Callout
 *
 * @param {IProjectPhaseCalloutProps} param0 Props
 */
const ProjectPhaseCallout = ({ phase, requestedPhase, selected, changePhaseEnabled, restartPhaseEnabled, onChangePhaseHandler, onRestartPhaseHandler }: IProjectPhaseCalloutProps) => {
    const hasActivePhaseRequest = (requestedPhase && requestedPhase !== "");
    if (hasActivePhaseRequest && requestedPhase !== phase.Name) {
        changePhaseEnabled = false;
        restartPhaseEnabled = false;
    }
    return (
        <div className="phaseCallout">
            <h3>{String.format(__.getResource("ProjectPhases_PhaseCalloutHeader"), phase.Name)}</h3>
            <ChecklistStats phase={phase} />
            <ul style={{ marginTop: 15, marginBottom: 10 }}>
                <GoToChecklistLink {...{ phase } } />
                <ChangePhaseLink {...{ phase, changePhaseEnabled, onChangePhaseHandler } } />
                <RestartPhaseLink {...{ phase, restartPhaseEnabled, onRestartPhaseHandler } } />
            </ul>
            <div style={{ paddingTop: 10 }} hidden={!selected || !hasActivePhaseRequest}>
                {String.format(__.getResource("ProjectPhases_NextPhase"), requestedPhase)}
            </div>
        </div>
    );
};

export default ProjectPhaseCallout;
export { IProjectPhaseCalloutProps };
