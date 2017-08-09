import SectionModel from "./Section/SectionModel";

interface IProjectStatusState {
    project: any;
    sections: SectionModel[];
    isLoading: boolean;
}

export default IProjectStatusState;
