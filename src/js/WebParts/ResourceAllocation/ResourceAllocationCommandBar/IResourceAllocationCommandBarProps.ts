import { ProjectResourceAllocation, ProjectUser } from "../ResourceAllocationModels";

export default interface IResourceAllocationCommandBarProps {
    users: Array<ProjectUser>;
    allocations: Array<ProjectResourceAllocation>;
    selectedUser: ProjectUser;
    selectedProject: string;
    onUserSelected: (user: ProjectUser) => void;
    onProjectSelected: (project: string) => void;
}
