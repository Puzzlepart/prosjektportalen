import __ from "../../Resources";
import IGroupByOption from "../IGroupByOption";
import { IBaseWebPartProps } from "../@BaseWebPart";
import IExcelExportConfig from "../IExcelExportConfig";

export default interface IBenefitsOverviewProps extends IBaseWebPartProps {
    dataSourceName?: string;
    queryTemplate?: string;
    groupByOptions?: IGroupByOption[];
    showSearchBox?: boolean;
    showCommandBar?: boolean;
    modalHeaderClassName?: string;
    projectInfoFilterField?: string;
    excelExportEnabled?: boolean;
    excelExportConfig?: IExcelExportConfig;
    showSiteTitleColumn?: boolean;
}

export const BenefitsOverviewDefaultProps: Partial<IBenefitsOverviewProps> = {
    queryTemplate: "(ContentTypeID:0x0100B384774BA4EBB842A5E402EBF4707367* OR ContentTypeID:0x01007A831AC68204F04AAA022CFF06C7BAA2* OR 0x0100FF4E12223AF44F519AF40C441D05DED0*) Path:{Site.URL}",
    showSiteTitleColumn: false,
    groupByOptions: [
        {
            name: __.getResource("Lists_BenefitsAnalysis_Fields_Title_DisplayName"), key: "benefit.title",
        },
        {
            name: __.getResource("SiteFields_GtGainsResponsible_DisplayName"), key: "benefit.responsible",
        },
    ],
    showCommandBar: true,
    showSearchBox: true,
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
