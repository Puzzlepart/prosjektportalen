import __ from "../../Resources";
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
    dataSourceName: "BENEFITSOVERVIEW",
    dataSource: DataSource.List,
    groupByOptions: [],
    searchProperty: "title",
    showCommandBar: false,
    showSearchBox: false,
    modalHeaderClassName: "ms-font-xxl",
    projectInfoFilterField: "GtPcPortfolioPage",
    excelExportEnabled: true,
    excelExportConfig: {
        fileName: __.getResource("DynamicPortfolio_ExcelExportFileName"),
        sheetName: "Sheet A",
        buttonLabel: __.getResource("DynamicPortfolio_ExcelExportButtonLabel"),
        buttonIcon: "ExcelDocument",
    },
};
