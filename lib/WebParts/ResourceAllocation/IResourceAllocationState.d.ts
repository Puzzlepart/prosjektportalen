import { IBaseWebPartState } from "../@BaseWebPart";
import { ProjectResourceAllocation, ProjectUser } from "./ResourceAllocationModels";
import IResourceAllocationCommandBarState from "./ResourceAllocationCommandBar/IResourceAllocationCommandBarState";
export default interface IResourceAllocationState extends IBaseWebPartState {
    users?: Array<ProjectUser>;
    allocations?: Array<ProjectResourceAllocation>;
    allocationDisplay?: ProjectResourceAllocation;
    selected?: IResourceAllocationCommandBarState;
}
