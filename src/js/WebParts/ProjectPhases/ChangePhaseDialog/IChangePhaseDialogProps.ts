import ChangePhaseDialogResult from "./ChangePhaseDialogResult";
import { PhaseModel } from "../ProjectPhasesData";

export default interface IChangePhaseDialogProps {
    newPhase: PhaseModel;
    activePhase: PhaseModel;
    onChangePhaseDialogReturnCallback: (result: ChangePhaseDialogResult) => Promise<void>;
    hideHandler: (e) => void;
    gateApproval?: boolean;
}

