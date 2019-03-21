/// <reference types="react" />
import { PhaseModel } from "../../ProjectPhasesData";
export interface IRestartPhaseLinkProps {
    phase: PhaseModel;
    restartPhaseEnabled: boolean;
    onRestartPhaseHandler: (phase: PhaseModel) => void;
}
declare const RestartPhaseLink: ({ phase, restartPhaseEnabled, onRestartPhaseHandler }: IRestartPhaseLinkProps) => JSX.Element;
export default RestartPhaseLink;
