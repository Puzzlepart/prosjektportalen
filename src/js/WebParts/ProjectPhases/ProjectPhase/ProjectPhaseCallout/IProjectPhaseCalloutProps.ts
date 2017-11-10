import { PhaseModel } from "../../../../Model";

export default interface IProjectPhaseCalloutProps {
    phase: PhaseModel;
    checkListData: any;
    checkListDefaultViewUrl: string;
    changePhaseEnabled: boolean;
    onChangePhase: (phase: PhaseModel) => void;
    onRestartPhase: (phase: PhaseModel) => void;
    className?: string;
}
