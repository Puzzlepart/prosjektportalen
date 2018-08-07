import { IBaseWebPartState } from "../@BaseWebPart";
import { ProjectResourceAllocation, ProjectUser } from "./ProjectResourcesModels";

export default interface IProjectResourcesState extends IBaseWebPartState {
    users?: Array<ProjectUser>;
    allocations?: Array<ProjectResourceAllocation>;
    selectedAllocation?: ProjectResourceAllocation;
}
