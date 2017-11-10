import { PhaseModel } from "../../../Model";
import IChecklistData from "../ProjectPhasesData/IChecklistData";

export default interface IProjectPhaseProps {
    phase: PhaseModel;
    classList: string[];
    checkListData: IChecklistData;
    checkListDefaultViewUrl: string;
    changePhaseEnabled: boolean;
    onChangePhase: (phase: PhaseModel) => void;
}
