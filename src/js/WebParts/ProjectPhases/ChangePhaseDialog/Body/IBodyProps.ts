import { View } from "../Views";
import { PhaseModel } from "../../../../Model";
import ChangePhaseDialogResult from "../ChangePhaseDialogResult";
import IChecklistItem from "../../ProjectPhasesData/IChecklistItem";

export default interface IBodyProps {
    phase: PhaseModel;
    checkListItems: IChecklistItem[];
    openCheckListItems: IChecklistItem[];
    currentIdx: number;
    nextCheckPointAction;
    currentView: View;
    isLoading: boolean;
    onChangePhaseDialogReturnCallback: (result: ChangePhaseDialogResult) => Promise<void>;
    onCloseDialog: (e, reload?: boolean) => void;
}
