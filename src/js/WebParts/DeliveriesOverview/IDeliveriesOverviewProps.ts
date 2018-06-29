import RESOURCE_MANAGER from "../../Resources";
import {
    SelectionMode,
    ConstrainMode,
    DetailsListLayoutMode,
} from "office-ui-fabric-react/lib/DetailsList";
import { IBaseWebPartProps } from "../@BaseWebPart";
import IGroupByOption from "../IGroupByOption";
import IExcelExportConfig from "../IExcelExportConfig";

export default interface IDeliveriesOverviewProps extends IBaseWebPartProps {
    constrainMode?: ConstrainMode;
    layoutMode?: DetailsListLayoutMode;
    selectionMode?: SelectionMode;
    groupByOptions?: IGroupByOption[];
    showSearchBox?: boolean;
    showCommandBar?: boolean;
    showEmptyMessage?: boolean;
    searchProperty?: string;
    modalHeaderClassName?: string;
    projectInfoFilterField?: string;
    excelExportEnabled?: boolean;
    excelExportConfig?: IExcelExportConfig;
    dataSource?: string;
    rowLimit?: number;
    columns?: any[];
}

export const DeliveriesOverviewDefaultProps: Partial<IDeliveriesOverviewProps> = {
    showSearchBox: false,
    showEmptyMessage: false,
    groupByOptions: [],
    constrainMode: ConstrainMode.horizontalConstrained,
    dataSource: RESOURCE_MANAGER.getResource("DataSourceKey_DeliveriesOverview"),
    rowLimit: 100,
    projectInfoFilterField: "GtPcPortfolioPage",
    modalHeaderClassName: "ms-font-xxl",
    layoutMode: DetailsListLayoutMode.fixedColumns,
    selectionMode: SelectionMode.none,
    columns: [{
        key: "Title",
        fieldName: "Title",
        name: RESOURCE_MANAGER.getResource("SiteFields_Title_DisplayName"),
        minWidth: 220,
    },
    {
        key: "SiteTitle",
        fieldName: "SiteTitle",
        name: RESOURCE_MANAGER.getResource("String_Project"),
    }].map(col => ({
        ...col,
        isResizable: true,
    })),
    excelExportEnabled: true,
    excelExportConfig: {
        fileName: RESOURCE_MANAGER.getResource("DynamicPortfolio_ExcelExportFileName"),
        sheetName: "Sheet A",
        buttonLabel: RESOURCE_MANAGER.getResource("DynamicPortfolio_ExcelExportButtonLabel"),
        buttonIcon: "ExcelDocument",
    },
};
