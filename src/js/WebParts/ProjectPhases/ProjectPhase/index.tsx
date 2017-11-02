import * as React from "react";
import ProjectPhaseIcon from "./ProjectPhaseIcon";
import ProjectPhaseCallout from "./ProjectPhaseCallout";
import IProjectPhaseProps from "./IProjectPhaseProps";

/**
 * Project Phase
 *
 * @param {IProjectPhaseProps} param0 Props
 */
const ProjectPhase = ({ phase, classList, checkListData, checkListDefaultViewUrl, onChangePhase }: IProjectPhaseProps) => {
    const selected = Array.contains(classList, "selected");
    const projectPhaseIconProps = { phase, classList };
    const projectPhaseCalloutProps = { phase, selected, checkListData, checkListDefaultViewUrl, onChangePhase };
    return (
        <li className={classList.join(" ")}>
            <ProjectPhaseIcon { ...projectPhaseIconProps } />
            <ProjectPhaseCallout { ...projectPhaseCalloutProps } />
        </li>
    );
};

export default ProjectPhase;

