/// <reference types="react" />
import { PhaseModel } from "../../ProjectPhasesData";
export interface IChangePhaseLinkProps {
    phase: PhaseModel;
    changePhaseEnabled: boolean;
    onChangePhaseHandler: (phase: PhaseModel) => void;
}
declare const ChangePhaseLink: ({ phase, changePhaseEnabled, onChangePhaseHandler }: IChangePhaseLinkProps) => JSX.Element;
export default ChangePhaseLink;
