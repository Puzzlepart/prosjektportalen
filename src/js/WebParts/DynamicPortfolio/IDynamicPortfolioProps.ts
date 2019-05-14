import __ from "../../Resources";
import {
    SelectionMode,
    ConstrainMode,
    DetailsListLayoutMode,
} from "office-ui-fabric-react/lib/DetailsList";
import { IDynamicPortfolioViewConfig } from "./DynamicPortfolioConfiguration";
import { IBaseWebPartProps } from "../@BaseWebPart";
import IExcelExportConfig from "../IExcelExportConfig";

export default interface IDynamicPortfolioProps extends IBaseWebPartProps {
    loadingText?: string;
    searchBoxLabelText?: string;
    showCountText?: string;
    showCountTextWithFilters?: string;
    showGroupBy?: boolean;
    modalHeaderClassName?: string;
    projectInfoFilterField?: string;
    constrainMode?: ConstrainMode;
    layoutMode?: DetailsListLayoutMode;
    selectionMode?: SelectionMode;
    excelExportEnabled?: boolean;
    excelExportConfig?: IExcelExportConfig;
    defaultSortFunction?: (a, b) => 1 | -1;
    defaultView?: IDynamicPortfolioViewConfig;
    viewConfigList?: string;
    viewSelectorEnabled?: boolean;
    queryText?: string;
}

export const DynamicPortfolioDefaultProps: Partial<IDynamicPortfolioProps> = {
    loadingText: __.getResource("DynamicPortfolio_LoadingText"),
    searchBoxLabelText: __.getResource("DynamicPortfolio_SearchBox_Placeholder"),
    showCountText: __.getResource("DynamicPortfolio_ShowCounts"),
    showCountTextWithFilters: __.getResource("DynamicPortfolio_ShowCountsWithFilters"),
    showGroupBy: true,
    modalHeaderClassName: "ms-font-xxl",
    projectInfoFilterField: "GtPcPortfolioPage",
    constrainMode: ConstrainMode.horizontalConstrained,
    layoutMode: DetailsListLayoutMode.fixedColumns,
    selectionMode: SelectionMode.none,
    excelExportEnabled: true,
    excelExportConfig: {
        fileName: __.getResource("DynamicPortfolio_ExcelExportFileName"),
        sheetName: "Sheet A",
        buttonLabel: __.getResource("DynamicPortfolio_ExcelExportButtonLabel"),
        buttonIcon: "ExcelDocument",
    },
    defaultSortFunction: (a, b) => a.SiteTitle > b.SiteTitle ? 1 : -1,
    viewConfigList: __.getResource("Lists_DynamicPortfolioViews_Title"),
    viewSelectorEnabled: true,
    queryText: "*",
};
