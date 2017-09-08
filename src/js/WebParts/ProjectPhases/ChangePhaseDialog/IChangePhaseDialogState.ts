import IChecklistItem from "../IChecklistItem";
import { View } from "./Views";

export default interface IChangePhaseDialogState {
    currentIdx?: number;
    isLoading?: boolean;
    currentView?: View;
    checkListItems?: IChecklistItem[];
}

