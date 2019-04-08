import { IModalProps } from "office-ui-fabric-react/lib/Modal";
import { TaskModel } from "../TaskModel";

export default interface ITasksOverviewDetailsModalProps extends IModalProps {
    task?: TaskModel;
}
