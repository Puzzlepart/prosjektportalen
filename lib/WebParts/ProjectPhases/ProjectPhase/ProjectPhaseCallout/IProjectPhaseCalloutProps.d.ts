import { PhaseModel } from "../../ProjectPhasesData";
export default interface IProjectPhaseCalloutProps {
    phase: PhaseModel;
    requestedPhase: string;
    selected: boolean;
    changePhaseEnabled: boolean;
    restartPhaseEnabled: boolean;
    onChangePhaseHandler: (phase: PhaseModel) => void;
    onRestartPhaseHandler: (phase: PhaseModel) => void;
}
