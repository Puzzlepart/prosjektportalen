import * as Data from "./Data";

interface IProjectPhasesState {
    isLoading: boolean;
    phases?: any[];
    currentPhase?: any;
    checkListData?: { [phase: string]: Data.IChecklistData };
    changePhase?: { Id: string, Name: string };
}

export default IProjectPhasesState;
