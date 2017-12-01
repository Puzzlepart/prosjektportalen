import { IBaseWebPartState } from "../@BaseWebPart";
import { PhaseModel, IProjectPhasesData } from "./ProjectPhasesData";
import IChecklistItem from "./ProjectPhasesData/IChecklistItem";

export default interface IProjectPhasesState extends IBaseWebPartState {
    data?: IProjectPhasesData;
    newPhase?: PhaseModel;
    forcedOrder?: boolean;
    checklistItemsToArchive?: IChecklistItem[];
}

