import IChecklistData from "./IChecklistData";
import { PhaseModel } from "../../../Model";

export interface IChecklistDataMap {
    [phase: string]: IChecklistData;
}

export default interface IProjectPhasesData {
    phases?: PhaseModel[];
    activePhase?: PhaseModel;
    checkListData?: IChecklistDataMap;
    checkListDefaultViewUrl?: string;
}

