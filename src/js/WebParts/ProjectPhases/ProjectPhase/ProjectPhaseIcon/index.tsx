import * as React from "react";
import { Icon } from "office-ui-fabric-react/lib/Icon";
import IProjectPhaseIconProps from "./IProjectPhaseIconProps";

/**
 * Project Phase Icon
 *
 * @param {IProjectPhaseIconProps} param0 Props
 */
const ProjectPhaseIcon = ({ phase, classList, className = "phaseIcon", phaseLetterClassName = "phaseLetter", phaseTextClassName = "phaseText", subTextClassName = "phaseSubText" }: IProjectPhaseIconProps) => {
    return (
        <a href="#">
            <div className={[className, ...classList].join(" ")}>
                <span className={phaseLetterClassName}>{phase.PhaseLetter}</span>
                <span className={phaseTextClassName} hidden={phase.Type === "Gate"}>{phase.Name} <span hidden={!phase.IsIncremental}><Icon iconName="Refresh" /></span></span>
                <span className={subTextClassName}></span>
            </div>
        </a>
    );
};

export default ProjectPhaseIcon;
export { IProjectPhaseIconProps };

