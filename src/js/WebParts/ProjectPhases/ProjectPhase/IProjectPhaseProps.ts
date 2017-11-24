import { PhaseModel } from "../ProjectPhasesData";

export default interface IProjectPhaseProps {
    phase: PhaseModel;
    classList: string[];
    changePhaseEnabled: boolean;
    restartPhaseEnabled: boolean;
    onChangePhase: (phase: PhaseModel) => void;
    onRestartPhase: (phase: PhaseModel) => void;
}
