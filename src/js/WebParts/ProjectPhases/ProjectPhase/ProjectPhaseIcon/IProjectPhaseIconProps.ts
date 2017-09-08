import { PhaseModel } from "../../../../Model";

export default interface IProjectPhaseIconProps {
    phase: PhaseModel;
    classList: string[];
    className?: string;
    phaseLetterClassName?: string;
    phaseClassName?: string;
    subTextClassName?: string;
}
