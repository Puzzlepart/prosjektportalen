export interface IListView {
    Id: string;
    Title: string;
    ViewQuery: string;
    DefaultView: boolean;
}

export default interface IOpportunityMatrixData {
    items: any[];
    views?: IListView[];
}
