import { PhaseModel } from "../WebParts/ProjectPhases/ProjectPhasesData";
/**
 * Updates welcome page with a new phase
 *
 * @param {string} phaseName Phase term name
 * @param {string} phaseGuid Phase term GUID
 * @param {string} phaseFieldName Phase field name
 */
export declare const UpdateProjectPhase: (phaseName: string, phaseGuid: string, phaseFieldName: string) => Promise<void>;
/**
 * Get welcome page field values
 */
export declare const GetProjectPropertiesPageFieldValues: () => Promise<any>;
/**
 * Get current project phase
 */
export declare const GetCurrentProjectPhase: () => Promise<PhaseModel>;
/**
 * Get requested project phase
 */
export declare function GetRequestedProjectPhase(): Promise<string>;
/**
 * Get phase iterations
 */
export declare function GetPhaseIterations(): Promise<number>;
