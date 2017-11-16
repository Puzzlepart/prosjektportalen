import { View } from "../Views";
import ChangePhaseDialogResult from "../ChangePhaseDialogResult";
import { PhaseModel } from "../../ProjectPhasesData";
import IChecklistItem from "../../ProjectPhasesData/IChecklistItem";

export default interface IBodyProps {
    newPhase: PhaseModel;
    activePhase: PhaseModel;
    openCheckListItems: IChecklistItem[];
    currentIdx: number;
    nextCheckPointAction;
    currentView: View;
    isLoading: boolean;
    onChangePhaseDialogReturnCallback: (result: ChangePhaseDialogResult) => Promise<void>;
    onCloseDialog: (e, reload?: boolean) => void;
}
