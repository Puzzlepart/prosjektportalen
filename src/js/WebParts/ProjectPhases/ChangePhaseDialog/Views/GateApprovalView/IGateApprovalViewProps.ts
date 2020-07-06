import ChangePhaseDialogResult from '../../ChangePhaseDialogResult'

export default interface IGateApprovalViewProps {
    onCloseDialog: (e, reload?: boolean) => void;
    onChangePhaseDialogReturnCallback: (result: ChangePhaseDialogResult) => Promise<void>;
}

export const GateApprovalViewDefaultProps: Partial<IGateApprovalViewProps> = {}


