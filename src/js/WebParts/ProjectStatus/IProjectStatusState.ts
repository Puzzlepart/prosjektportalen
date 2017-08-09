import { ISection } from "./Section";

interface IProjectStatusState {
    project: any;
    sections: ISection[];
    isLoading: boolean;
}

export default IProjectStatusState;
