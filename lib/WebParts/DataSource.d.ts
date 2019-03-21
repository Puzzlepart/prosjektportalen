declare enum DataSource {
    Search = 0,
    List = 1,
    SearchCustom = 2
}
export interface IDataSourceSearchCustom {
    RowLimit: number;
    QueryTemplate: string;
}
export default DataSource;
