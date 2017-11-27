import * as React from "react";
import { Icon } from "office-ui-fabric-react/lib/Icon";
import { PhaseModel } from "../../ProjectPhasesData";

export interface IProjectPhaseIterationsProps {
    phase: PhaseModel;
    phaseIterations: number;
}

const ProjectPhaseIterations = (props: IProjectPhaseIterationsProps) => {
    const containerStyle: React.CSSProperties = { position: "absolute", top: -12, left: 35 };
    const innerStyle: React.CSSProperties = { position: "relative" };
    const iconStyle: React.CSSProperties = { fontSize: 18, color: "green" };
    const textStyle: React.CSSProperties = { position: "absolute", top: 1, left: 6, fontSize: 10 };
    return (
        <div hidden={!props.phase.IsIncremental || !props.phaseIterations} style={containerStyle}>
            <div style={innerStyle}>
                <Icon iconName="Sync" style={iconStyle} />
                <span style={textStyle}>{props.phaseIterations}</span>
            </div>
        </div>
    );
};

export default ProjectPhaseIterations;
