import Localization from "localization";
import { PhaseModel } from "../../../../../Model";

export default interface IChangingPhaseViewProps {
    phase: PhaseModel;
    progressLabel?: string;
    progressDescription?: string;
}


let [label, description] = Localization.getResource("ProjectPhases_ChangingPhase").split(",");

export const ChangingPhaseViewDefaultProps: Partial<IChangingPhaseViewProps> = {
    progressLabel: label,
    progressDescription: description,
};
