import { MessageBarType } from "office-ui-fabric-react/lib/MessageBar";
import { IFilter } from "./Filter";
import { IViewConfig, IColumnConfig } from "./Configuration";

export interface IDynamicPortfolioErrorMessage {
    message: string;
    type: MessageBarType;
}

interface IDynamicPortfolioState {
    isLoading?: boolean;
    items?: any[];
    filteredItems?: any[];
    selectedColumns?: any[];
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
}

export default IDynamicPortfolioState;
