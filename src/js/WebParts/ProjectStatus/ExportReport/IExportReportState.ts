import ExportReportStatus from "./ExportReportStatus";

interface IExportReportState {
    project: any;
    reports: any;
    selectedReport: {
        key: string,
        text: string,
    };
    exportStatus: ExportReportStatus;
    showDialog: boolean;
    isLoading: boolean;
}

export default IExportReportState;

