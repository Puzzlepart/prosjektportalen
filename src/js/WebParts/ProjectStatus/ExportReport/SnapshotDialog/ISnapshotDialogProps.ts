import IReport from "../IReport";

export default interface ISnapshotDialogProps {
    report: IReport;
    onDismiss: (e) => void;
}

