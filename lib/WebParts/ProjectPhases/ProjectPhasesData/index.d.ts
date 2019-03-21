import { List } from "@pnp/sp";
import PhaseModel from "./PhaseModel";
import IChecklistItem from "./IChecklistItem";
import IProjectPhasesData from "./IProjectPhasesData";
/**
 * Fetch data using @pnp/sp and sp.taxonomy.js
 *
 * @param {List} phaseChecklist Phase checklist
 * @param {boolean} gatesEnabled Gates enabled
 */
export declare function fetchData(phaseChecklist: List, gatesEnabled: boolean): Promise<IProjectPhasesData>;
export { PhaseModel, IChecklistItem, IProjectPhasesData };
