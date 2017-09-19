
import { PhaseModel } from "model";
import IChecklistItem from "../../../IChecklistItem";

export default interface ISummaryViewProps {
    phase: PhaseModel;
    checkListItems: IChecklistItem[];
    listClassName?: string;
}
