import IProject from "./IProject";

interface IProjectListState {
    isLoading: boolean;
    projects?: IProject[];
    searchTerm?: string;
    showProjectInfo?: any;
}

export default IProjectListState;
