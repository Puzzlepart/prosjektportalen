import { IBaseWebPartState } from "../@BaseWebPart";
import IGroupByOption from "../IGroupByOption";
import { ExcelExportStatus } from "../../Util/ExportToExcel";
import { IBenefitsOverviewData } from "./BenefitsOverviewData";

export default interface IBenefitsOverviewState extends IBaseWebPartState {
    data?: IBenefitsOverviewData;
    searchTerm: string;
    groupBy: IGroupByOption;
    showProjectInfo?: any;
    showMeasurements?: any;
    excelExportStatus?: ExcelExportStatus;
}

