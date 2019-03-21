/// <reference types="react" />
import IProjectPhaseProps from "./IProjectPhaseProps";
/**
 * Project Phase
 *
 * @param {IProjectPhaseProps} param0 Props
 */
declare const ProjectPhase: ({ phase, phaseIterations, requestedPhase, classList, changePhaseEnabled, restartPhaseEnabled, onRestartPhaseHandler, onChangePhaseHandler }: IProjectPhaseProps) => JSX.Element;
export default ProjectPhase;
export { IProjectPhaseProps };
