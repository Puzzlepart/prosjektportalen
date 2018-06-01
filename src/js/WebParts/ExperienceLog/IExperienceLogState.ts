import { IBaseWebPartState } from "../@BaseWebPart";
import LogElement from "./LogElement";
import IGroupByOption from "../IGroupByOption";
import { ExcelExportStatus } from "../../Util/ExportToExcel";

export default interface IExperienceLogState extends IBaseWebPartState {
    logItems?: LogElement[];
    showProjectInfo?: any;
    searchTerm?: string;
    groupBy?: IGroupByOption;
    excelExportStatus?: ExcelExportStatus;
}
