import * as React from "react";
import { Icon } from "office-ui-fabric-react/lib/Icon";
import { PhaseModel } from "../../ProjectPhasesData";

export interface IProjectPhaseIterationsProps {
    phase: PhaseModel;
    phaseIterations: number;
}

const ProjectPhaseIterations = (props: IProjectPhaseIterationsProps) => {
    const containerStyle: React.CSSProperties = { position: "absolute", top: -12, left: 35 };
    const iconStyle: React.CSSProperties = {};
    const textStyle: React.CSSProperties = { marginLeft: 2, fontSize: 10 };
    return (
        <div hidden={!props.phase.IsIncremental} style={containerStyle}>
            <Icon iconName="Sync" style={iconStyle} />
            <span hidden={!props.phaseIterations} style={textStyle}>{props.phaseIterations}</span>
        </div>
    );
};

export default ProjectPhaseIterations;
