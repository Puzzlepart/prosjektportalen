import IGroupByOption from "../IGroupByOption";
import { IBaseWebPartProps } from "../@BaseWebPart";
import IExcelExportConfig from "../IExcelExportConfig";
export default interface IBenefitsOverviewProps extends IBaseWebPartProps {
    dataSourceName?: string;
    queryTemplate?: string;
    groupByOptions?: IGroupByOption[];
    showSearchBox?: boolean;
    showCommandBar?: boolean;
    searchProperty?: string;
    modalHeaderClassName?: string;
    projectInfoFilterField?: string;
    excelExportEnabled?: boolean;
    excelExportConfig?: IExcelExportConfig;
    showSiteTitleColumn?: boolean;
}
export declare const BenefitsOverviewDefaultProps: Partial<IBenefitsOverviewProps>;
