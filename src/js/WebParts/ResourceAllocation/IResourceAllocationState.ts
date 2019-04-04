import { IBaseWebPartState } from "../@BaseWebPart";
import { ProjectResourceAllocation, ProjectUser } from "./ResourceAllocationModels";

export default interface IResourceAllocationState extends IBaseWebPartState {
    activeFilters: { [fieldName: string]: string[] };
    users?: Array<ProjectUser>;
    allocations?: Array<ProjectResourceAllocation>;
    allocationDisplay?: ProjectResourceAllocation;
}

