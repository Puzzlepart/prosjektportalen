import PhaseModel from "../PhaseModel";
import IChecklistData from "../IChecklistData";

export default interface IProjectPhaseProps {
    phase: PhaseModel;
    classList: string[];
    checkListData: IChecklistData;
    onChangePhase: (phase: PhaseModel) => void;
}
