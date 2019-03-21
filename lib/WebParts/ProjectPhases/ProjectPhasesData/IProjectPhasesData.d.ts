import PhaseModel from "./PhaseModel";
export default interface IProjectPhasesData {
    phases?: PhaseModel[];
    activePhase?: PhaseModel;
    requestedPhase?: string;
    phaseIterations?: number;
}
