import { ProjectPropertyModel } from "./ProjectProperty";

interface IProjectInfoState {
    properties?: ProjectPropertyModel[];
    isLoading: boolean;
}

export default IProjectInfoState;
