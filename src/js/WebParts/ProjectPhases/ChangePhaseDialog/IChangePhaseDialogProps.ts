import ChangePhaseDialogResult from "./ChangePhaseDialogResult";
import IChecklistItem from "../ProjectPhasesData/IChecklistItem";
import { PhaseModel } from "../../../Model";

export default interface IChangePhaseDialogProps {
    newPhase: PhaseModel;
    activePhase: PhaseModel;
    onChangePhaseDialogReturnCallback: (result: ChangePhaseDialogResult) => Promise<void>;
    hideHandler: (e) => void;
    checkListItems: IChecklistItem[];
    gateApproval?: boolean;
}

