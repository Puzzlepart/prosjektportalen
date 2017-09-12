import { IBaseWebPartState } from "../@BaseWebPart";
import IProjectPhasesData from "./IProjectPhasesData";
import { PhaseModel } from "../../Model";

export default interface IProjectPhasesState extends IBaseWebPartState {
    data?: IProjectPhasesData;
    changePhase?: PhaseModel;
}

