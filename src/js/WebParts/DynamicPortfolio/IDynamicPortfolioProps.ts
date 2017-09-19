import RESOURCE_MANAGER from "localization";
import {
    SelectionMode,
    ConstrainMode,
    DetailsListLayoutMode,
} from "office-ui-fabric-react/lib/DetailsList";
import { IBaseWebPartProps } from "../@BaseWebPart";

export interface IDynamicPortfolioExcelExportConfig {
    fileName: string;
    sheetName: string;
    triggerId: string;
    buttonLabel: string;
    buttonIcon: string;
}

export default interface IDynamicPortfolioProps extends IBaseWebPartProps {
    searchProperty?: string;
    showGroupBy?: boolean;
    modalHeaderClassName?: string;
    projectInfoFilterField?: string;
    constrainMode?: ConstrainMode;
    layoutMode?: DetailsListLayoutMode;
    selectionMode?: SelectionMode;
    excelExportEnabled?: boolean;
    excelExportConfig?: IDynamicPortfolioExcelExportConfig;
    defaultSortFunction?: (a, b) => 1 | -1;
}

export const DynamicPortfolioDefaultProps: Partial<IDynamicPortfolioProps> = {
    searchProperty: "Title",
    showGroupBy: true,
    modalHeaderClassName: "ms-font-xxl",
    projectInfoFilterField: "GtPcPortfolioPage",
    constrainMode: ConstrainMode.horizontalConstrained,
    layoutMode: DetailsListLayoutMode.fixedColumns,
    selectionMode: SelectionMode.none,
    excelExportEnabled: true,
    excelExportConfig: {
        fileName: RESOURCE_MANAGER.getResource("DynamicPortfolio_ExcelExportFileName"),
        sheetName: "Sheet A",
        triggerId: "export-workbook",
        buttonLabel: RESOURCE_MANAGER.getResource("DynamicPortfolio_ExcelExportButtonLabel"),
        buttonIcon: "ExcelDocument",
    },
    defaultSortFunction: (a, b) => a.Title > b.Title ? 1 : -1,
};
