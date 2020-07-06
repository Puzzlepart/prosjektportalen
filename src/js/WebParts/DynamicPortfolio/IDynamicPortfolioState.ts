import { TypedHash } from '@pnp/common'
import { MessageBarType } from 'office-ui-fabric-react/lib/MessageBar'
import { ExcelExportStatus } from '../../Util/ExportToExcel'
import { IBaseWebPartState } from '../@BaseWebPart'
import { IDynamicPortfolioColumnConfig, IDynamicPortfolioConfiguration, IDynamicPortfolioViewConfig } from './DynamicPortfolioConfiguration'
import { IDynamicPortfolioFilter } from './DynamicPortfolioFilterPanel'

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
    currentSort?: { fieldName: string; isSortedDescending: boolean };
    showProjectInfo?: any;
    excelExportStatus?: ExcelExportStatus;
    canUserManageWeb?: boolean;
    settings?: TypedHash<string>;
}
