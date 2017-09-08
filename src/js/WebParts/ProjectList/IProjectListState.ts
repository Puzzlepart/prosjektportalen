import { IBaseWebPartState } from "../@BaseWebPart";
import Project from "./Project";

export interface IProjectListData {
    projects?: Project[];
    fields?: { [key: string]: string };
}

export default interface IProjectListState extends IBaseWebPartState {
    data?: IProjectListData;
    searchTerm?: string;
    showProjectInfo?: Project;
}

