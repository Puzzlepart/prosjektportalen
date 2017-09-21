import ExportReportStatus from "./ExportReportStatus";
import {FileType} from "./FileType";

export default interface IExportReportState {
    project?: any;
    reports?: any;
    selectedReport?: {
        key: string,
        text: string,
    };
    exportStatus: ExportReportStatus;
    showDialog?: boolean;
    isLoading: boolean;
    saveType: FileType;
}

