/// <reference types="react" />
import { PhaseModel } from "../../ProjectPhasesData";
export interface IProjectPhaseIterationsProps {
    phase: PhaseModel;
    phaseIterations: number;
}
declare const ProjectPhaseIterations: (props: IProjectPhaseIterationsProps) => JSX.Element;
export default ProjectPhaseIterations;
