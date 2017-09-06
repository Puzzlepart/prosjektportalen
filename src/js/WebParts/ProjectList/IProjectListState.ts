import { IBaseWebPartState } from "../@BaseWebPart";
import Project from "./Project";

export default interface IProjectListState extends IBaseWebPartState {
    projects?: Project[];
    searchTerm?: string;
    showProjectInfo?: Project;
}

