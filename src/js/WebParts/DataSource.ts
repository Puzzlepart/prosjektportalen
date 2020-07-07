enum DataSource {
    Search,
    List,
    SearchCustom,
}

export interface IDataSourceSearchCustom {
    RowLimit: number;
    QueryTemplate: string;
}

export default DataSource
