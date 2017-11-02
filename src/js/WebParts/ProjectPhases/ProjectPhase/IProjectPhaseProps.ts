import { PhaseModel } from "../../../Model";
import IChecklistData from "../IChecklistData";

export default interface IProjectPhaseProps {
    phase: PhaseModel;
    classList: string[];
    checkListData: IChecklistData;
    checkListDefaultViewUrl: string;
    onChangePhase: (phase: PhaseModel) => void;
}
