import * as React from "react";
import __ from "../../../../Resources";
import { Icon } from "office-ui-fabric-react/lib/Icon";
import { PhaseModel } from "../../ProjectPhasesData";

export interface IChangePhaseLinkProps {
    phase: PhaseModel;
    changePhaseEnabled: boolean;
    onChangePhaseHandler: (phase: PhaseModel) => void;
}

const ChangePhaseLink = ({ phase, changePhaseEnabled, onChangePhaseHandler }: IChangePhaseLinkProps) => {
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
                <a href="#" onClick={() => onChangePhaseHandler(phase)}>
                    <Icon iconName="DoubleChevronRight12" />
                    <span style={{ marginLeft: 5 }}>{__.getResource(linkTextResourceKey)}</span>
                </a>
            </div>
        </li>
    );
};

export default ChangePhaseLink;
