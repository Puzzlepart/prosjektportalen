import { SelectionMode, ConstrainMode, DetailsListLayoutMode } from "office-ui-fabric-react/lib/DetailsList";
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
    defaultSortFunction?: (a: any, b: any) => 1 | -1;
    defaultView?: IDynamicPortfolioViewConfig;
    viewSelectorEnabled?: boolean;
}
export declare const DynamicPortfolioDefaultProps: Partial<IDynamicPortfolioProps>;
