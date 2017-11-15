import { IBaseWebPartState } from "../@BaseWebPart";
import { IProjectPhasesData } from "./ProjectPhasesData";
import { PhaseModel } from "../../Model";

export default interface IProjectPhasesState extends IBaseWebPartState {
    data?: IProjectPhasesData;
    newPhase?: PhaseModel;
    forcedOrder?: boolean;
}

