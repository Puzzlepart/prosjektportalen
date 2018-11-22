import { IColumn } from "office-ui-fabric-react/lib/DetailsList";
import IGroupByOption from "../../IGroupByOption";
import IExcelExportConfig from "../../IExcelExportConfig";

export default interface IListProps {
    items?: Array<any>;
    columns?: Array<IColumn>;
    pathKey?: string;
    webUrlKey?: string;
    showSearchBox?: boolean;
    showCommandBar?: boolean;
    defaultGroupBy?: IGroupByOption;
    groupByOptions?: IGroupByOption[];
    excelExportEnabled?: boolean;
    excelExportConfig?: IExcelExportConfig;
}
