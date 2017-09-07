import IChecklistItem from "../IChecklistItem";
import PhaseModel from "../PhaseModel";

export default interface IChangePhaseDialogProps {
    phase: PhaseModel;
    onConfirmPhaseChange: (phase?: PhaseModel) => Promise<void>;
    hideHandler: Function;
    checkListItems: IChecklistItem[];
}

