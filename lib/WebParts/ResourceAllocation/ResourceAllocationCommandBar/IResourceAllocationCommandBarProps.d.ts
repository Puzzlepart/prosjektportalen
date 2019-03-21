import { ProjectResourceAllocation, ProjectUser } from "../ResourceAllocationModels";
import IResourceAllocationCommandBarState from "./IResourceAllocationCommandBarState";
export default interface IResourceAllocationCommandBarProps {
    users: Array<ProjectUser>;
    allocations: Array<ProjectResourceAllocation>;
    selected: IResourceAllocationCommandBarState;
    onSelectionUpdate: (selection: IResourceAllocationCommandBarState) => void;
}
