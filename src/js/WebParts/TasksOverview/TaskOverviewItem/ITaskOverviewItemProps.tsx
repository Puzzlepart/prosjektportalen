import { TaskModel } from "../TaskModel";
import { TaskOverviewItemType } from "./TaskOverviewItemType";

export interface ITaskOverviewItemProps {
    item: TaskModel;
    itemContext: any;
    onItemClick: (item: TaskModel) => void;
    type: TaskOverviewItemType;
    itemProps: React.HTMLProps<HTMLDivElement>;
}
