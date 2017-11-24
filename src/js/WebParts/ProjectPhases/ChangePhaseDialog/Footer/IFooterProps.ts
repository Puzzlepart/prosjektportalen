import ChangePhaseDialogResult from "../ChangePhaseDialogResult";
import { View } from "../Views";

export default interface IFooterProps {
    currentView: View;
    isLoading: boolean;
    gateApproval: boolean;
    onChangePhaseDialogReturnCallback: (result: ChangePhaseDialogResult) => Promise<void>;
    onCloseDialog: (e, reload?: boolean) => void;
    onChangeView: (view: View) => void;
}

