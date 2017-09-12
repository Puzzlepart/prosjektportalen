import IChecklistData from "./IChecklistData";
import { PhaseModel } from "../../Model";

export default interface IProjectPhasesData {
    phases?: PhaseModel[];
    activePhase?: PhaseModel;
    checkListData?: { [phase: string]: IChecklistData };
}

