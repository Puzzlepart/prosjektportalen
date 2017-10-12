import { MessageBarType } from "office-ui-fabric-react/lib/MessageBar";
import { IBaseWebPartState } from "../@BaseWebPart";
import IFilter from "./FilterPanel/Filter/IFilter";
import {
    IViewConfig,
    IColumnConfig,
    IConfiguration,
} from "./Configuration";
import { ExcelExportStatus } from "../../Util/ExportToExcel";

export interface IDynamicPortfolioErrorMessage {
    message: string;
    type: MessageBarType;
}

export default interface IDynamicPortfolioState extends IBaseWebPartState {
    configuration?: IConfiguration;
    items?: any[];
    filteredItems?: any[];
    selectedColumns?: IColumnConfig[];
    fieldNames?: string[];
    searchTerm?: string;
    filters?: IFilter[];
    currentView?: IViewConfig;
    currentFilters?: { [key: string]: string[] };
    errorMessage?: IDynamicPortfolioErrorMessage;
    showFilterPanel?: boolean;
    groupBy?: IColumnConfig;
    currentSort?: { fieldName: string, isSortedDescending: boolean };
    showProjectInfo?: any;
    excelExportStatus?: ExcelExportStatus;
}
