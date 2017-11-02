import { PhaseModel } from "../../../../Model";

export default interface IProjectPhaseCalloutProps {
    phase: PhaseModel;
    selected: boolean;
    checkListData: any;
    checkListDefaultViewUrl: string;
    onChangePhase: (phase: PhaseModel) => void;
    className?: string;
}
