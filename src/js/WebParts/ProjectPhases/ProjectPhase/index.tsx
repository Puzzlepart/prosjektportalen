import * as React from "react";
import ProjectPhaseIcon, { IProjectPhaseIconProps } from "./ProjectPhaseIcon";
import ProjectPhaseCallout, { IProjectPhaseCalloutProps } from "./ProjectPhaseCallout";
import IProjectPhaseProps from "./IProjectPhaseProps";

/**
 * Project Phase
 *
 * @param {IProjectPhaseProps} param0 Props
 */
const ProjectPhase = ({ phase, classList, changePhaseEnabled, restartPhaseEnabled, onRestartPhase, onChangePhase }: IProjectPhaseProps) => {
    const projectPhaseIconProps: IProjectPhaseIconProps = { phase, classList };
    const projectPhaseCalloutProps: IProjectPhaseCalloutProps = { phase, changePhaseEnabled, restartPhaseEnabled, onRestartPhase, onChangePhase };
    return (
        <li className={classList.join(" ")}>
            <ProjectPhaseIcon { ...projectPhaseIconProps } />
            <ProjectPhaseCallout { ...projectPhaseCalloutProps } />
        </li>
    );
};

export default ProjectPhase;
export { IProjectPhaseProps };

