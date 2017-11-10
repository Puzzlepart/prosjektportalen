
import { PhaseModel } from "model";
import IChecklistItem from "../../../ProjectPhasesData/IChecklistItem";

export default interface ISummaryViewProps {
    phase: PhaseModel;
    checkListItems: IChecklistItem[];
    listClassName?: string;
}
