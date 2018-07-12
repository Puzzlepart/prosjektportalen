import { IColumn } from "office-ui-fabric-react/lib/DetailsList";
import IGroupByOption from "../../IGroupByOption";
import IExcelExportConfig from "../../IExcelExportConfig";

export default interface IListProps {
    items: Array<any>;
    columns: Array<IColumn>;
    showSearchBox?: boolean;
    showCommandBar?: boolean;
    groupByOptions?: IGroupByOption[];
    excelExportEnabled?: boolean;
    excelExportConfig?: IExcelExportConfig;
}
