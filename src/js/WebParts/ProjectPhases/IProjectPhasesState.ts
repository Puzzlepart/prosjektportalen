import { IBaseWebPartState } from "../@BaseWebPart";
import * as Data from "./Data";

export default interface IProjectPhasesState extends IBaseWebPartState {
    phases?: any[];
    currentPhase?: any;
    checkListData?: { [phase: string]: Data.IChecklistData };
    changePhase?: { Id: string, Name: string };
}

