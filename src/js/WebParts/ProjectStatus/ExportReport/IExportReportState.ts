import {FileType} from "./FileType";
import ExportReportStatus from "./ExportReportStatus";

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
    fileType: FileType;
}

