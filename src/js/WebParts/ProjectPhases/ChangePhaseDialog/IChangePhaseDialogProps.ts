import { IChecklistItem } from "../Data";

interface IChangePhaseDialogProps {
    phase: any;
    onConfirmPhaseChange: Function;
    hideHandler: Function;
    checkListItems: IChecklistItem[];
}

export default IChangePhaseDialogProps;
