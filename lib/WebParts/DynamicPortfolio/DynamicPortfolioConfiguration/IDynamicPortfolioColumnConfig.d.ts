import { IColumn } from "office-ui-fabric-react/lib/DetailsList";
interface IDynamicPortfolioColumnConfig extends IColumn {
    readOnly: boolean;
    render: "Date" | "Note" | "Currency" | "Status" | "URL" | "Default";
    groupBy?: boolean;
}
export default IDynamicPortfolioColumnConfig;
