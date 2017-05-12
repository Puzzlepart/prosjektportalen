import { IProjectProp } from "./ProjectProp";

interface IProjectInfoState {
    properties?: IProjectProp[];
    error: boolean;
    isLoading: boolean;
}

export default IProjectInfoState;
