import { PhaseModel } from "../../ProjectPhasesData";

export default interface IProjectPhaseCalloutProps {
    phase: PhaseModel;
    changePhaseEnabled: boolean;
    restartPhaseEnabled: boolean;
    onChangePhase: (phase: PhaseModel) => void;
    onRestartPhase: (phase: PhaseModel) => void;
    className?: string;
}
