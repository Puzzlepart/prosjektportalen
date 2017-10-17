import IDynamicPortfolioFilterItem from "../DynamicPortfolioFilterItem/IDynamicPortfolioFilterItem";

export default  interface IDynamicPortfolioFilter {
    name: string;
    key?: string;
    emptyMessage: string;
    multi: boolean;
    items: IDynamicPortfolioFilterItem[];
    selected?: string[];
    defaultHidden?: boolean;
    iconName?: string;
}
