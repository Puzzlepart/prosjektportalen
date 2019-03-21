import IGroupByOption from "../../IGroupByOption";
import { ExcelExportStatus } from "../../../Util/ExportToExcel";
export default interface IListState {
    showProjectInfo?: any;
    searchTerm?: string;
    groupBy?: IGroupByOption;
    excelExportStatus?: ExcelExportStatus;
}
