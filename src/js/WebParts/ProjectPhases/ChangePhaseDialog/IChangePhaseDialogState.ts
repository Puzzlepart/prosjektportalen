import { IChecklistItem } from "../Data";
import { View } from "./Views";

interface IChangePhaseDialogState {
    currentIdx?: number;
    isLoading?: boolean;
    currentView?: View;
    checkListItems?: IChecklistItem[];
}

export default IChangePhaseDialogState;
