/// <reference types="react" />
import IProjectPhaseCalloutProps from "./IProjectPhaseCalloutProps";
/**
 * Project Phase Callout
 *
 * @param {IProjectPhaseCalloutProps} param0 Props
 */
declare const ProjectPhaseCallout: ({ phase, requestedPhase, selected, changePhaseEnabled, restartPhaseEnabled, onChangePhaseHandler, onRestartPhaseHandler }: IProjectPhaseCalloutProps) => JSX.Element;
export default ProjectPhaseCallout;
export { IProjectPhaseCalloutProps };
