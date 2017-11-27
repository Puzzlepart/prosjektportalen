import ChangePhaseDialogResult from "./ChangePhaseDialogResult";
import { PhaseModel } from "../ProjectPhasesData";

export default interface IChangePhaseDialogProps {
    newPhase: PhaseModel;
    activePhase: PhaseModel;
    nextPhase: PhaseModel;
    onChangePhaseDialogReturnCallback: (result: ChangePhaseDialogResult, requestedPhase?: string) => Promise<void>;
    hideHandler: (e) => void;
    gateApproval?: boolean;
}

