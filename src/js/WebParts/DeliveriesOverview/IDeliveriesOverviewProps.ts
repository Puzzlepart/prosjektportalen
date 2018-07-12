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
    groupByOptions: [
        { name: RESOURCE_MANAGER.getResource("String_Project"), key: "SiteTitle" },
        { name: RESOURCE_MANAGER.getResource("SiteFields_GtProductStatus_DisplayName"), key: "ProductStatus" },
    ],
    dataSource: "DELIVERIESOVERVIEW",
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
        isResizable: true,
    },
    {
        key: "GtProductDescriptionOWSMTXT",
        fieldName: "ProductDescription",
        name: RESOURCE_MANAGER.getResource("SiteFields_GtProductDescription_DisplayName"),
        minWidth: 220,
        isMultiline: true,
        isResizable: true,
    },
    {
        key: "GtProductStartTimeOWSDATE",
        fieldName: "ProductStartTime",
        name: RESOURCE_MANAGER.getResource("SiteFields_GtProductStartTime_DisplayName"),
        minWidth: 100,
        isMultiline: false,
        isResizable: true,
    },
    {
        key: "GtProductEndTimeOWSDATE",
        fieldName: "ProductEndTime",
        name: RESOURCE_MANAGER.getResource("SiteFields_GtProductEndTime_DisplayName"),
        minWidth: 100,
        isMultiline: false,
        isResizable: true,
    },
    {
        key: "GtProductStatusOWSCHCS",
        fieldName: "ProductStatus",
        name: RESOURCE_MANAGER.getResource("SiteFields_GtProductStatus_DisplayName"),
        minWidth: 100,
        isMultiline: false,
        isResizable: true,
    },
    {
        key: "GtProductStatusCommentOWSMTXT",
        fieldName: "ProductStatusComment",
        name: RESOURCE_MANAGER.getResource("SiteFields_GtProductStatusComment_DisplayName"),
        minWidth: 220,
        isMultiline: true,
        isResizable: true,
    }],
    excelExportEnabled: true,
    excelExportConfig: {
        fileNamePrefix: RESOURCE_MANAGER.getResource("DeliveriesOverview_ExcelExportFileNamePrefix"),
        sheetName: "Sheet A",
        buttonLabel: RESOURCE_MANAGER.getResource("DynamicPortfolio_ExcelExportButtonLabel"),
        buttonIcon: "ExcelDocument",
    },
};
