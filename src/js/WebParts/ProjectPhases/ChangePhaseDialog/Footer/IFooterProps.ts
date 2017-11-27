import ChangePhaseDialogResult from "../ChangePhaseDialogResult";
import { View } from "../Views";
import { PhaseModel } from "../../ProjectPhasesData";

export default interface IFooterProps {
    newPhase: PhaseModel;
    activePhase: PhaseModel;
    nextPhase: PhaseModel;
    currentView: View;
    isLoading: boolean;
    gateApproval: boolean;
    onChangePhaseDialogReturnCallback: (result: ChangePhaseDialogResult, requestedPhase?: string) => Promise<void>;
    onCloseDialog: (e, reload?: boolean) => void;
    onChangeView: (view: View) => void;
}

