import { IBaseWebPartState } from "../@BaseWebPart";
import ProjectStatusData from "./ProjectStatusData";

export default interface IProjectStatusState extends IBaseWebPartState {
    data?: ProjectStatusData;
    isLoading: boolean;
}

