import RiskElementModel from "./RiskElementModel";

export interface IListView {
    Id: string;
    Title: string;
    ViewQuery: string;
    DefaultView: boolean;
}

export default interface IRiskMatrixData {
    items: RiskElementModel[];
    views?: IListView[];
}
