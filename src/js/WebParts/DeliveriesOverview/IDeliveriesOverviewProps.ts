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
    dataSource: "DELIVERIESOVERVIEW",
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
        isMultiline: true,
    },
    {
        key: "SiteTitle",
        fieldName: "SiteTitle",
        name: RESOURCE_MANAGER.getResource("String_Project"),
        minWidth: 220,
        isMultiline: true,
    },
    {
        key: "GtProductDescriptionOWSMTXT",
        fieldName: "ProductDescription",
        name: RESOURCE_MANAGER.getResource("SiteFields_GtProductDescription_DisplayName"),
        minWidth: 220,
        isMultiline: true,
    },
    {
        key: "GtProductStartTimeOWSDATE",
        fieldName: "ProductStartTime",
        name: RESOURCE_MANAGER.getResource("SiteFields_GtProductStartTime_DisplayName"),
        isMultiline: false,
    },
    {
        key: "GtProductEndTimeOWSDATE",
        fieldName: "ProductEndTime",
        name: RESOURCE_MANAGER.getResource("SiteFields_GtProductEndTime_DisplayName"),
        isMultiline: false,
    },
    {
        key: "GtProductStatusOWSCHCS",
        fieldName: "ProductStatus",
        name: RESOURCE_MANAGER.getResource("SiteFields_GtProductStatus_DisplayName"),
        isMultiline: false,
    },
    {
        key: "GtProductStatusCommentOWSMTXT",
        fieldName: "ProductStatusComment",
        name: RESOURCE_MANAGER.getResource("SiteFields_GtProductStatusComment_DisplayName"),
        minWidth: 220,
        isMultiline: true,
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
