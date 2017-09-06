import { MessageBarType } from "office-ui-fabric-react/lib/MessageBar";
import { IBaseWebPartState } from "../@BaseWebPart";
import IFilter from "./FilterPanel/Filter/IFilter";
import { IViewConfig, IColumnConfig } from "./Configuration";

export interface IDynamicPortfolioErrorMessage {
    message: string;
    type: MessageBarType;
}

export default interface IDynamicPortfolioState extends IBaseWebPartState {
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

export const DynamicPortfolioInitialState: Partial<IDynamicPortfolioState> = {
    isLoading: true,
    searchTerm: "",
    currentFilters: {},
    showFilterPanel: false,
};

