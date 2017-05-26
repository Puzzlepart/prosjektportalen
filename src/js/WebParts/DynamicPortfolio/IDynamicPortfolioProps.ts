import {
    SelectionMode,
    ConstrainMode,
    DetailsListLayoutMode,
} from "office-ui-fabric-react/lib/DetailsList";

export interface IDynamicPortfolioExcelExportConfig {
    fileName: string;
    sheetName: string;
    triggerId: string;
    buttonLabel: string;
    buttonIcon: string;
}

interface IDynamicPortfolioProps {
    searchProperty?: string;
    showGroupBy?: boolean;
    modalHeaderClassName?: string;
    projectInfoFilterField?: string;
    constrainMode?: ConstrainMode;
    layoutMode?: DetailsListLayoutMode;
    selectionMode?: SelectionMode;
    excelExportEnabled?: boolean;
    excelExportConfig?: IDynamicPortfolioExcelExportConfig;
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
        fileName: __("DynamicPortfolio_ExcelExportFileName"),
        sheetName: "Sheet A",
        triggerId: "export-workbook",
        buttonLabel: "Eksporter til Excel",
        buttonIcon: "ExcelDocument",
    },
};

export default IDynamicPortfolioProps;
