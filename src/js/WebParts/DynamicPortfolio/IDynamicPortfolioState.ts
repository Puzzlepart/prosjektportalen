import { MessageBarType } from "office-ui-fabric-react/lib/MessageBar";
import { IBaseWebPartState } from "../@BaseWebPart";
import { IDynamicPortfolioFilter } from "./DynamicPortfolioFilterPanel";
import {
    IDynamicPortfolioViewConfig,
    IDynamicPortfolioColumnConfig,
    IDynamicPortfolioConfiguration,
} from "./DynamicPortfolioConfiguration";
import { ExcelExportStatus } from "../../Util/ExportToExcel";

export interface IDynamicPortfolioErrorMessage {
    message: string;
    type: MessageBarType;
}

export default interface IDynamicPortfolioState extends IBaseWebPartState {
    isChangingView?: IDynamicPortfolioViewConfig;
    configuration?: IDynamicPortfolioConfiguration;
    items?: any[];
    filteredItems?: any[];
    selectedColumns?: IDynamicPortfolioColumnConfig[];
    fieldNames?: string[];
    searchTerm?: string;
    filters?: IDynamicPortfolioFilter[];
    currentView?: IDynamicPortfolioViewConfig;
    currentFilters?: { [key: string]: string[] };
    errorMessage?: IDynamicPortfolioErrorMessage;
    showFilterPanel?: boolean;
    groupBy?: IDynamicPortfolioColumnConfig;
    currentSort?: { fieldName: string, isSortedDescending: boolean };
    showProjectInfo?: any;
    excelExportStatus?: ExcelExportStatus;
    canUserManageWeb?: boolean;
}
