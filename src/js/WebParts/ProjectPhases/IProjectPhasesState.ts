import { IBaseWebPartState } from "../@BaseWebPart";
import IChecklistData from "./IChecklistData";
import PhaseModel from "./PhaseModel";

export default interface IProjectPhasesState extends IBaseWebPartState {
    phases?: PhaseModel[];
    activePhase?: PhaseModel;
    checkListData?: { [phase: string]: IChecklistData };
    changePhase?: PhaseModel;
}

