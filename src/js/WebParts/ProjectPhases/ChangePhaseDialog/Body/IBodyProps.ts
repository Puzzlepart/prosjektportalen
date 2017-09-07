import { View } from "../Views";
import PhaseModel from "../../PhaseModel";
import IChecklistItem from "../../IChecklistItem";

export default interface IBodyProps {
    phase: PhaseModel;
    checkListItems: IChecklistItem[];
    openCheckListItems: IChecklistItem[];
    currentIdx: number;
    nextCheckPointAction;
    currentView: View;
    isLoading: boolean;
}
