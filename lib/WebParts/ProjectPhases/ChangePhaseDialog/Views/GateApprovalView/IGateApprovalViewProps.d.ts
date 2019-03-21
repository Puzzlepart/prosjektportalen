import ChangePhaseDialogResult from "../../ChangePhaseDialogResult";
export default interface IGateApprovalViewProps {
    onCloseDialog: (e: any, reload?: boolean) => void;
    onChangePhaseDialogReturnCallback: (result: ChangePhaseDialogResult) => Promise<void>;
}
export declare const GateApprovalViewDefaultProps: Partial<IGateApprovalViewProps>;
