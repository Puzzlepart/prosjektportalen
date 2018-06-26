import { IBaseWebPartState } from "../@BaseWebPart";
import DeliveryElement from "./DeliveryElement";
import IGroupByOption from "../IGroupByOption";
import { ExcelExportStatus } from "../../Util/ExportToExcel";

export default interface IDeliveriesOverviewState extends IBaseWebPartState {
    deliveryElements?: DeliveryElement[];
    showProjectInfo?: any;
    searchTerm?: string;
    groupBy?: IGroupByOption;
    excelExportStatus?: ExcelExportStatus;
}
