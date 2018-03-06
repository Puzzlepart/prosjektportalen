export interface IListView {
    Id: string;
    Title: string;
    ViewQuery: string;
    DefaultView: boolean;
}

export default interface IRiskMatrixData {
    items: any[];
    views?: IListView[];
}
