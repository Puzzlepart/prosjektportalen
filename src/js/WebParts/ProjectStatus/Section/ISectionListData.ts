import { IColumn } from "office-ui-fabric-react/lib/DetailsList";

export default interface ISectionListData {
    items: any[];
    columns: IColumn[];
    defaultViewUrl: string;
    defaultDisplayFormUrl: string;
    defaultEditFormUrl: string;
    defaultNewFormUrl: string;
}

