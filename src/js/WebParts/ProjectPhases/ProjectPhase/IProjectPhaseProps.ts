import { PhaseModel } from '../ProjectPhasesData'

export default interface IProjectPhaseProps {
    phase: PhaseModel;
    phaseIterations: number;
    requestedPhase: string;
    classList: string[];
    changePhaseEnabled: boolean;
    restartPhaseEnabled: boolean;
    onChangePhaseHandler: (phase: PhaseModel) => void;
    onRestartPhaseHandler: (phase: PhaseModel) => void;
}
