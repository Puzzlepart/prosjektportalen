import * as React from "react";
import __ from "../../../../Resources";
import { Icon } from "office-ui-fabric-react/lib/Icon";
import { PhaseModel } from "../../ProjectPhasesData";


export interface IRestartPhaseLinkProps {
    phase: PhaseModel;
    restartPhaseEnabled: boolean;
    onRestartPhaseHandler: (phase: PhaseModel) => void;
}

const RestartPhaseLink = ({ phase, restartPhaseEnabled, onRestartPhaseHandler }: IRestartPhaseLinkProps) => {
    return (
        <li>
            <div hidden={!restartPhaseEnabled}>
                <a href="#" onClick={() => onRestartPhaseHandler(phase)}>
                    <Icon iconName="Refresh" />
                    <span style={{ marginLeft: 5 }}>{__.getResource("ProjectPhases_RestartPhase")}</span>
                </a>
            </div>
        </li>
    );
};

export default RestartPhaseLink;
