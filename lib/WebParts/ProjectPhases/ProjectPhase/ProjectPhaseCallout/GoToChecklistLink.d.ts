/// <reference types="react" />
import { PhaseModel } from "../../ProjectPhasesData";
export interface IGoToChecklistLinkProps {
    phase: PhaseModel;
}
declare const GoToChecklistLink: (props: IGoToChecklistLinkProps) => JSX.Element;
export default GoToChecklistLink;
