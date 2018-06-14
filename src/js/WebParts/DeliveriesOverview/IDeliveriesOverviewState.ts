import { IBaseWebPartState } from "../@BaseWebPart";
import DeliveryElement from "./DeliveryElement";
import IGroupByOption from "../IGroupByOption";
import { ExcelExportStatus } from "../../Util/ExportToExcel";

export default interface IDeliveriesOverviewState extends IBaseWebPartState {
    items?: DeliveryElement[];
    showProjectInfo?: any;
    searchTerm?: string;
    groupBy?: IGroupByOption;
    excelExportStatus?: ExcelExportStatus;
}
