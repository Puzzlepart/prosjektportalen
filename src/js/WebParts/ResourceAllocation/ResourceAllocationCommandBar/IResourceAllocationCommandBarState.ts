import { ProjectUser } from "../ResourceAllocationModels";

export default interface IResourceAllocationCommandBarState {
    user: ProjectUser;
    project: string;
    role: string;
}
