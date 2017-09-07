
import PhaseModel from "../../PhaseModel";

export default interface IProjectPhaseCalloutProps {
    phase: PhaseModel;
    selected: boolean;
    checkListData: any;
    onChangePhase: (phase: PhaseModel) => void;
    className?: string;
}
