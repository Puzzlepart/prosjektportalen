import { TaskModel } from './TaskModel'

export default interface ITasksOverviewData {
    groups?: { id: number; title: string }[];
    tasks?: TaskModel[];
}
