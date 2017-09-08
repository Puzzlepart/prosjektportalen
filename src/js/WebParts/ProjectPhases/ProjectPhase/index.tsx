import * as React from "react";
import ProjectPhaseIcon from "./ProjectPhaseIcon";
import ProjectPhaseCallout from "./ProjectPhaseCallout";
import IProjectPhaseProps from "./IProjectPhaseProps";

const ProjectPhase = ({ phase, classList, checkListData, onChangePhase }: IProjectPhaseProps) => {
    const isSelected = Array.contains(classList, "selected");

    return (
        <li className={classList.join(" ")}>
            <ProjectPhaseIcon
                phase={phase}
                classList={classList} />
            <ProjectPhaseCallout
                phase={phase}
                selected={isSelected}
                checkListData={checkListData}
                onChangePhase={onChangePhase} />
        </li>
    );
};

export default ProjectPhase;

