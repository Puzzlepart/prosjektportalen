import Project from "./Project";

interface IProjectListState {
    isLoading: boolean;
    projects?: Project[];
    searchTerm?: string;
    showProjectInfo?: Project;
}

export default IProjectListState;
