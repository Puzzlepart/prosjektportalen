import { IColumn } from 'office-ui-fabric-react/lib/DetailsList'

interface IDynamicPortfolioColumnConfig extends IColumn {
    readOnly: boolean;
    render: 'Date' | 'Note' | 'Percentage' | 'Float' | 'Currency' | 'Status' | 'URL' | 'Default';
    groupBy?: boolean;
}

export default IDynamicPortfolioColumnConfig
