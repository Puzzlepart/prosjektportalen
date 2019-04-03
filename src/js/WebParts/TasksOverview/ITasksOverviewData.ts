import { TaskModel } from "./TaskModel";

export default interface ITasksOverviewData {
    projects?: { id: number, title: string }[];
    tasks?: TaskModel[];
}
