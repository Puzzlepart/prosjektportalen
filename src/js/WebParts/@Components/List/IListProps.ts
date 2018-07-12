import { IDetailsListProps } from "office-ui-fabric-react/lib/DetailsList";
import IGroupByOption from "../../IGroupByOption";
import IExcelExportConfig from "../../IExcelExportConfig";

export default interface IListProps extends IDetailsListProps {
    showSearchBox?: boolean;
    showCommandBar?: boolean;
    groupByOptions?: IGroupByOption[];
    excelExportEnabled?: boolean;
    excelExportConfig?: IExcelExportConfig;
}
