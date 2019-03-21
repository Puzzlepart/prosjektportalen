/// <reference types="react" />
import { PhaseModel } from "../../ProjectPhasesData";
export interface IChecklistStatsProps {
    phase: PhaseModel;
}
declare const ChecklistStats: ({ phase }: IChecklistStatsProps) => JSX.Element;
export default ChecklistStats;
