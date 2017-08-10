import {  IColumn } from "office-ui-fabric-react/lib/DetailsList";

export default interface ISectionListState {
    isLoading: boolean;
    items?: any[];
    columns?: IColumn[];
}
