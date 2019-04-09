import * as moment from "moment";
import { IBaseWebPartState } from "../@BaseWebPart";
import { TaskModel } from "./TaskModel";
import { ITaskSearchResult } from "./ITaskSearchResult";

export default interface ITasksOverviewState extends IBaseWebPartState {
    activeFilters: { [fieldName: string]: string[] };
    searchTerm?: string;
    groupBy: { fieldName: string, name: string };
    items?: ITaskSearchResult[];
    selectedTask?: TaskModel;
    visibleTimeStart?: moment.Moment;
    visibleTimeEnd?: moment.Moment;
}
