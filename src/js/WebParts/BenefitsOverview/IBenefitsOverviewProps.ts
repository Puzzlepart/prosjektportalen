import RESOURCE_MANAGER from "../../Resources";
import DataSource, { IDataSourceSearchCustom } from "../DataSource";
import IGroupByOption from "../IGroupByOption";
import { IBaseWebPartProps } from "../@BaseWebPart";
import IExcelExportConfig from "../IExcelExportConfig";

export default interface IBenefitsOverviewProps extends IBaseWebPartProps {
    dataSourceName?: string;
    dataSource?: DataSource;
    customSearchSettings?: IDataSourceSearchCustom;
    groupByOptions?: IGroupByOption[];
    showSearchBox?: boolean;
    showCommandBar?: boolean;
    searchProperty?: string;
    modalHeaderClassName?: string;
    projectInfoFilterField?: string;
    excelExportEnabled?: boolean;
    excelExportConfig?: IExcelExportConfig;
}

export const BenefitsOverviewDefaultProps: Partial<IBenefitsOverviewProps> = {
    dataSourceName: RESOURCE_MANAGER.getResource("DataSourceKey_Benefits"),
    dataSource: DataSource.List,
    groupByOptions: [],
    searchProperty: "Title",
    showCommandBar: false,
    showSearchBox: false,
    modalHeaderClassName: "ms-font-xxl",
    projectInfoFilterField: "GtPcPortfolioPage",
    excelExportEnabled: true,
    excelExportConfig: {
        fileName: RESOURCE_MANAGER.getResource("DynamicPortfolio_ExcelExportFileName"),
        sheetName: "Sheet A",
        buttonLabel: RESOURCE_MANAGER.getResource("DynamicPortfolio_ExcelExportButtonLabel"),
        buttonIcon: "ExcelDocument",
    },
};
