import { PhaseModel } from "../../ProjectPhasesData";

export default interface IProjectPhaseIconProps {
    phase: PhaseModel;
    classList: string[];
    className?: string;
    phaseLetterClassName?: string;
    phaseTextClassName?: string;
    subTextClassName?: string;
}
