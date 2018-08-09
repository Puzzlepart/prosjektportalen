import { IBaseWebPartState } from "../@BaseWebPart";
import { ProjectResourceAllocation, ProjectResourceAvailability, ProjectUser } from "./ResourceAllocationModels";
import  IResourceAllocationCommandBarState from "./ResourceAllocationCommandBar/IResourceAllocationCommandBarState";

export default interface IResourceAllocationState extends IBaseWebPartState {
    users?: Array<ProjectUser>;
    allocations?: Array<ProjectResourceAllocation>;
    availability?: Array<ProjectResourceAvailability>;
    allocationDisplay?: ProjectResourceAllocation;
    selected?: IResourceAllocationCommandBarState;
}
