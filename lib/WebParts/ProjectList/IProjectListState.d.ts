import { IBaseWebPartState } from "../@BaseWebPart";
import ProjectListModel from "./ProjectListModel";
export interface IProjectListData {
    projects?: ProjectListModel[];
    fields?: {
        [key: string]: string;
    };
}
export default interface IProjectListState extends IBaseWebPartState {
    data?: IProjectListData;
    searchTerm?: string;
    showProjectInfo?: ProjectListModel;
}
