import PhaseModel from "../../PhaseModel";

export default interface IProjectPhaseIconProps {
    phase: PhaseModel;
    classList: string[];
    className?: string;
    phaseLetterClassName?: string;
    phaseClassName?: string;
    subTextClassName?: string;
}
