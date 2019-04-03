import { IBaseWebPartState } from "../@BaseWebPart";
import { TaskModel } from "./TaskModel";
import ITasksOverviewData from "./ITasksOverviewData";

export default interface ITasksOverviewState extends IBaseWebPartState {
    activeFilters: { [key: string]: string[] };
    data?: ITasksOverviewData;
    selectedTask?: TaskModel;
}
