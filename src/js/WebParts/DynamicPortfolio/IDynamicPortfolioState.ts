import { IFilter } from "./Filter";
import { IViewConfig, IColumnConfig } from "./Configuration";

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
    error?: string;
    showFilterPanel?: boolean;
    groupBy?: IColumnConfig;
    currentSort?: { fieldName: string, isSortedDescending: boolean };
    showProjectInfo?: any;
}

export default IDynamicPortfolioState;
