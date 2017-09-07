import { IBaseWebPartState } from "../@BaseWebPart";
import IChecklistData from "./IChecklistData";
import { PhaseModel } from "../../Model";

export default interface IProjectPhasesState extends IBaseWebPartState {
    phases?: PhaseModel[];
    activePhase?: PhaseModel;
    checkListData?: { [phase: string]: IChecklistData };
    changePhase?: PhaseModel;
}

