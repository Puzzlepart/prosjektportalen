import { ProjectPropertyModel } from "./ProjectProperty";

interface IProjectInfoState {
    properties?: ProjectPropertyModel[];
    error?: boolean;
    isLoading: boolean;
}

export default IProjectInfoState;
