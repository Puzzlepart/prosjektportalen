import { IFilter } from "./Filter";
import {
    IViewConfig,
    IRefinerConfig,
    IColumnConfig,
} from "./Configuration";

interface IDynamicPortfolioState {
    isLoading?: boolean;
    items?: any[];
    filteredItems?: any[];
    columns?: any[];
    selectedColumns?: any[];
    fieldNames?: string[];
    searchTerm?: string;
    filters?: IFilter[];
    currentView?: IViewConfig;
    viewConfig?: IViewConfig[];
    refinerConfig?: IRefinerConfig[];
    currentFilters?: { [key: string]: string[] };
    error?: string;
    showFilterPanel?: boolean;
    groupBy?: IColumnConfig;
    currentSort?: { fieldName: string, isSortedDescending: boolean };
    showProjectInfo?: any;
}

export default IDynamicPortfolioState;
