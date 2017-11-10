import IChecklistItem from "../ProjectPhasesData/IChecklistItem";
import { PhaseModel } from "../../../Model";

export default interface IChangePhaseDialogProps {
    phase: PhaseModel;
    onConfirmPhaseChange: (phase?: PhaseModel) => Promise<void>;
    hideHandler: Function;
    checkListItems: IChecklistItem[];
}

