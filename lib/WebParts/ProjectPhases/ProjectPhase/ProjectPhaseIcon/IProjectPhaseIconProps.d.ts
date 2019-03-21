import { PhaseModel } from "../../ProjectPhasesData";
export default interface IProjectPhaseIconProps {
    phase: PhaseModel;
    phaseIterations: number;
    classList: string[];
}
