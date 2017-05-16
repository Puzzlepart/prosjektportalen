import * as React from "react";
import ProjectPhaseIcon from "./ProjectPhaseIcon";
import ProjectPhaseCallout from "./ProjectPhaseCallout";

const ProjectPhase = ({ phase, classList, checkListData, onChangePhase }) => {
    return (<li className={classList.join(" ")}>
        <a href="#">
            <ProjectPhaseIcon phase={phase.Name} classList={classList} />
        </a>
        <ProjectPhaseCallout phase={phase} selected={Array.contains(classList, "selected")} checkListData={checkListData} onChangePhase={onChangePhase} />
    </li>);
};

export default ProjectPhase;

