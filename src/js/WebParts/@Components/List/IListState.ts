import IGroupByOption from "../../IGroupByOption";
import { ExcelExportStatus } from "../../../Util/ExportToExcel";

export default interface IListState {
    selectedProject?: { title: string, url: string };
    searchTerm?: string;
    groupBy?: IGroupByOption;
    excelExportStatus?: ExcelExportStatus;
}
