import * as React from "react";
import IProjectPhaseIconProps from "./IProjectPhaseIconProps";

/**
 * Project Phase Icon
 *
 * @param {IProjectPhaseIconProps} param0 Props
 */
const ProjectPhaseIcon = ({ phase, classList, className = "phaseIcon", phaseLetterClassName = "phaseLetter", phaseClassName = "projectPhase", subTextClassName = "phaseSubText" }: IProjectPhaseIconProps) => {
    return (
        <a href="#">
            <div className={[className, ...classList].join(" ")}>
                <span className={phaseLetterClassName}>{phase.getPhaseLetter()}</span>
                <span className={phaseClassName}>{phase.Name}</span>
                <span className={subTextClassName}></span>
            </div>
        </a>
    );
};

export default ProjectPhaseIcon;
