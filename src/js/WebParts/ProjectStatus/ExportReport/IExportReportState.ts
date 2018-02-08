import {  IDropdownOption } from "office-ui-fabric-react/lib/Dropdown";
import ExportReportStatus from "./ExportReportStatus";
import IReport from "./IReport";

export default interface IExportReportState {
    isLoading: boolean;
    project?: any;
    reports?: IReport[];
    selectedReport?: IDropdownOption;
    exportStatus: ExportReportStatus;
}

