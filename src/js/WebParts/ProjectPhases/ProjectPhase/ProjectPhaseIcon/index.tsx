import * as React from "react";
import IProjectPhaseIconProps from "./IProjectPhaseIconProps";
import ProjectPhaseIterations from "./ProjectPhaseIterations";

/**
 * Project Phase Icon
 *
 * @param {IProjectPhaseIconProps} param0 Props
 */
const ProjectPhaseIcon = (props: IProjectPhaseIconProps) => {
    const isGate = props.phase.Type === "Gate";
    return (
        <a href="#" style={{ position: "relative" }}>
            <div className={["phaseIcon", ...props.classList].join(" ")}>
                <span className={"phaseLetter"}>{props.phase.PhaseLetter}</span>
                <span className={"phaseText"} hidden={isGate || !props.phase.ShowPhaseText}>{props.phase.Name}</span>
                <span className={"phaseSubText"}></span>
            </div>
            <ProjectPhaseIterations phase={props.phase} phaseIterations={props.phaseIterations} />
        </a>
    );
};

export default ProjectPhaseIcon;
export { IProjectPhaseIconProps };

