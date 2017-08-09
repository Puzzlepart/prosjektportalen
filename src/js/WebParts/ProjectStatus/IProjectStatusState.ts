import SectionModel from "./Section/SectionModel";

interface IProjectStatusState {
    project?: any;
    sections?: SectionModel[];
    fields?: any[];
    isLoading: boolean;
}

export default IProjectStatusState;
