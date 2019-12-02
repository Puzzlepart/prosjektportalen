import * as moment from "moment";
import { IBaseWebPartState } from "../@BaseWebPart";
import { TaskModel } from "./TaskModel";
import { ITaskSearchResult } from "./ITaskSearchResult";
import { TaskOverviewItemType } from "./TaskOverviewItem/TaskOverviewItemType";

export default interface ITasksOverviewState extends IBaseWebPartState {
    activeFilters: { [fieldName: string]: string[] };
    itemType: TaskOverviewItemType;
    searchTerm: string;
    groupBy: { fieldName: string, name: string };
    items?: ITaskSearchResult[];
    selectedTask?: TaskModel;
    visibleTimeStart?: moment.Moment;
    visibleTimeEnd?: moment.Moment;
}
