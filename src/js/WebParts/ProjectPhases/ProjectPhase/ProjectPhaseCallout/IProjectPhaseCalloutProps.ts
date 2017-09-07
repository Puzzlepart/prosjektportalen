import { PhaseModel } from "../../../../Model";

export default interface IProjectPhaseCalloutProps {
    phase: PhaseModel;
    selected: boolean;
    checkListData: any;
    onChangePhase: (phase: PhaseModel) => void;
    className?: string;
}
