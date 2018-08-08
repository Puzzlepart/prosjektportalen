import { IBaseWebPartState } from "../@BaseWebPart";
import { ProjectResourceAllocation, ProjectUser } from "./ResourceAllocationModels";

export default interface IResourceAllocationState extends IBaseWebPartState {
    users?: Array<ProjectUser>;
    allocations?: Array<ProjectResourceAllocation>;
    selectedAllocation?: ProjectResourceAllocation;
    selectedUser?: ProjectUser;
    selectedProject?: string;
}
